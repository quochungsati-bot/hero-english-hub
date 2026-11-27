/**
 * Bidding_English_DB · Apps Script API cho app hero-english-hub (GitHub Pages)
 * Dán vào: Google Sheet Bidding_English_DB → Extensions → Apps Script.
 *
 * Script Properties (Project Settings → Script properties):
 *   SECRET_TOKEN = chuỗi ngẫu nhiên dài, KHÔNG dùng lại "FDI_BIDDING_2026_SECRET"
 *
 * Giao thức (khớp với index.html):
 *   POST {action:"read", token}                         → {status:"success", data:{tab:[rows]}}
 *   POST {action:"update_status", sheet, id, status, token}
 *   POST {action:"add_row", sheet, row:{...}, token}
 *   POST {action:"audio", name, offset, length, token}   → {status, size, mime, data(base64)}
 *        Đọc từng đoạn file audio buổi học trong Google Drive của anh (tìm theo tên file,
 *        ví dụ HeroHub_L11.m4a). File vẫn để chế độ riêng tư; chỉ ai có token mới nghe được.
 *   GET  ?token=...  (giữ để tương thích bản cũ; app mới dùng POST)
 * Ngày được trả về dạng chữ yyyy-MM-dd theo giờ của Sheet, không còn bị lệch UTC.
 */
var TABS = ['01_Preply_Log', '02_Mistake_Bank', '03_Work_Agenda', '04_Knowledge_Base', '05_Daily_Briefing', '06_Lesson_Library'];
// 06_Lesson_Library: id | lesson_id | date | part | time | topic | transcript | hero_lines | corrections | b2_fixes | line_times
// (toàn văn từng phân đoạn buổi học; tab chưa có thì bỏ qua, app vẫn chạy)
var OPTIONAL_TABS = ['06_Lesson_Library'];

function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function auth_(t) {
  var s = PropertiesService.getScriptProperties().getProperty('SECRET_TOKEN');
  if (!s) throw new Error('Chưa đặt SECRET_TOKEN trong Script Properties');
  if (String(t || '') !== s) throw new Error('Unauthorized: sai token');
}
function sheet_(name) {
  if (TABS.indexOf(name) < 0) throw new Error('Tab không hợp lệ: ' + name);
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sh) throw new Error('Không tìm thấy tab ' + name);
  return sh;
}
function readTab_(name) {
  var v = sheet_(name).getDataRange().getDisplayValues();
  var head = v.shift() || [];
  return v.filter(function (r) { return r[0] !== ''; }).map(function (r) {
    var o = {}; head.forEach(function (h, i) { if (h) o[h] = r[i]; }); return o;
  });
}
function readAll_() {
  var d = {}, ss = SpreadsheetApp.getActiveSpreadsheet();
  TABS.forEach(function (t) {
    if (OPTIONAL_TABS.indexOf(t) >= 0 && !ss.getSheetByName(t)) return;
    d[t] = readTab_(t);
  });
  return d;
}

function doGet(e) {
  try { auth_(e.parameter.token); return out_({ status: 'success', data: readAll_() }); }
  catch (err) { return out_({ status: 'error', message: String(err.message || err) }); }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var b = JSON.parse((e.postData && e.postData.contents) || '{}');
    auth_(b.token);
    if (b.action === 'read') return out_({ status: 'success', data: readAll_() });
    if (b.action === 'audio') return out_(audioChunk_(b));

    lock.waitLock(10000);
    var sh = sheet_(b.sheet);
    var head = sh.getRange(1, 1, 1, sh.getLastColumn()).getDisplayValues()[0];

    if (b.action === 'update_status') {
      var col = head.indexOf('status');
      if (col < 0) throw new Error('Tab không có cột status');
      var ids = sh.getRange(1, 1, sh.getLastRow(), 1).getDisplayValues();
      for (var i = 1; i < ids.length; i++) {
        if (ids[i][0] === String(b.id)) { sh.getRange(i + 1, col + 1).setValue(b.status); return out_({ status: 'success' }); }
      }
      throw new Error('Không tìm thấy id ' + b.id);
    }
    if (b.action === 'add_row') {
      var row = b.row || {};
      sh.appendRow(head.map(function (h) { return row[h] == null ? '' : row[h]; }));
      return out_({ status: 'success', id: row.id });
    }
    throw new Error('Unknown action: ' + b.action);
  } catch (err) {
    return out_({ status: 'error', message: String(err.message || err) });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

/** Audio buổi học: đọc một đoạn (mặc định 4 MB) của file trong Drive, trả về base64.
 *  File có thể là 1 file (HeroHub_L11.m4a) hoặc nhiều phần nối tiếp
 *  (HeroHub_L11.m4a.001, .002, …) khi file quá lớn để tải lên một lần. */
function audioFiles_(name) {
  var it = DriveApp.getFilesByName(name);
  if (it.hasNext()) return [it.next()];
  var parts = [];
  for (var i = 1; i < 100; i++) {
    var p = DriveApp.getFilesByName(name + '.' + ('00' + i).slice(-3));
    if (!p.hasNext()) break;
    parts.push(p.next());
  }
  return parts;
}
function audioChunk_(b) {
  var name = String(b.name || '');
  if (!/^HeroHub_[A-Za-z0-9_-]+\.(m4a|mp3|webm|ogg)$/.test(name)) throw new Error('Tên file audio không hợp lệ');
  var files = audioFiles_(name);
  if (!files.length) throw new Error('Không tìm thấy ' + name + ' trong Google Drive');
  var mime = /\.m4a$/.test(name) ? 'audio/mp4' : files[0].getMimeType();
  var sizes = files.map(function (f) { return f.getSize(); });
  var size = sizes.reduce(function (a, x) { return a + x; }, 0);
  var off = Math.max(0, Number(b.offset) || 0), len = Math.min(Number(b.length) || 4194304, 6291456);
  if (off >= size) return { status: 'success', size: size, mime: mime, data: '' };
  // tìm phần chứa offset; mỗi lần chỉ trả trong phạm vi 1 phần (app tự gọi tiếp)
  var k = 0, base = 0;
  while (off >= base + sizes[k]) { base += sizes[k]; k++; }
  var from = off - base, to = Math.min(sizes[k], from + len) - 1;
  var r = UrlFetchApp.fetch('https://www.googleapis.com/drive/v3/files/' + files[k].getId() + '?alt=media', {
    headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken(), Range: 'bytes=' + from + '-' + to },
    muteHttpExceptions: true
  });
  if (r.getResponseCode() >= 300) throw new Error('Drive trả lỗi ' + r.getResponseCode());
  return { status: 'success', size: size, mime: mime, data: Utilities.base64Encode(r.getContent()) };
}
