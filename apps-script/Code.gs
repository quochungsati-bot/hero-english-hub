/**
 * Bidding_English_DB · Apps Script API cho app hero-english-hub (GitHub Pages)
 * Dán vào: Google Sheet Bidding_English_DB → Extensions → Apps Script.
 *
 * Script Properties (Project Settings → Script properties):
 *   SECRET_TOKEN = chuỗi ngẫu nhiên dài, KHÔNG dùng lại "FDI_BIDDING_2026_SECRET"
 *   (khi chưa đặt, script tạm chấp nhận token cũ để app không mất đồng bộ)
 *
 * Giao thức (khớp với index.html):
 *   POST {action:"read", token}                         → {status:"success", data:{tab:[rows]}}
 *   POST {action:"update_status", sheet, id, status, token}
 *   POST {action:"add_row", sheet, row:{...}, token}
 *   GET  ?token=...  (giữ để tương thích bản cũ; app mới dùng POST)
 * Ngày được trả về dạng chữ yyyy-MM-dd theo giờ của Sheet, không còn bị lệch UTC.
 */
var TABS = ['01_Preply_Log', '02_Mistake_Bank', '03_Work_Agenda', '04_Knowledge_Base', '05_Daily_Briefing'];

function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
// Token cũ chỉ được chấp nhận khi CHƯA đặt SECRET_TOKEN trong Script Properties.
// Đặt SECRET_TOKEN mới xong thì token cũ tự hết hiệu lực.
var LEGACY_TOKEN = 'FDI_BIDDING_2026_SECRET';
function auth_(t) {
  var s = PropertiesService.getScriptProperties().getProperty('SECRET_TOKEN') || LEGACY_TOKEN;
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
function readAll_() { var d = {}; TABS.forEach(function (t) { d[t] = readTab_(t); }); return d; }

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
      if (!row.id) row.id = 'ID_' + Date.now();
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
