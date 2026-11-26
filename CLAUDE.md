# Hero English Hub · hướng dẫn cho Claude

Web app học tiếng Anh điều hành cá nhân (B1 → B2 → C1/C2) cho Trưởng phòng Đấu thầu một Tổng thầu xây dựng Việt Nam. Học gắn với việc thật: Pre-Tender, Tender Interview, Contract Negotiation với Chủ đầu tư FDI.

## Kiến trúc
- `index.html`: toàn bộ app (HTML/CSS/JS thuần, không build). GitHub Pages phục vụ từ nhánh `main`, thư mục gốc.
- `legacy.html`: giao diện cũ, giữ để quay lại khi cần.
- `data/preply-lessons.json`: khoá Preply 8 bài (bài 1–2 đầy đủ, 3–8 mới có đề cương).
- `manifest.json`, `sw.js`, `icon.svg`: PWA (service worker network-first).
- `apps-script/Code.gs`: API gắn với Google Sheet `Bidding_English_DB`. Sửa xong phải Deploy → Manage deployments → Edit → New version.
- `public/`: bản cũ không còn dùng.

## Dữ liệu: Google Sheet `Bidding_English_DB` (5 tab, giữ đúng tiêu đề cột)
| Tab | Cột | status |
| --- | --- | --- |
| 01_Preply_Log | id, date, topic, category, teacher_note, rating | — |
| 02_Mistake_Bank | id, date, wrong_sentence, correct_b2, error_type, context, status | Learning / Mastered |
| 03_Work_Agenda | id, target_date, scenario, stage, key_goal, status | Pending / Done |
| 04_Knowledge_Base | id, term_or_phrase, category, b2_explanation, sample_sentence, status | Learning / Mastered |
| 05_Daily_Briefing | id, date, category, vi_summary, en_quick_talk, status | Pending / Done |

`stage` ∈ Pre-Tender, Interview, Negotiation, Daily Life, Current Affairs.

## Giao thức API (POST, `Content-Type: text/plain;charset=utf-8`)
- `{action:"read", token}` → `{status:"success", data:{<tab>:[rows]}}`
- `{action:"update_status", sheet, id, status, token}`
- `{action:"add_row", sheet, row:{...}, token}`
- Lỗi: `{status:"error", message}`. Ngày trả về `yyyy-MM-dd` (getDisplayValues).

## Quy tắc bắt buộc
- Repo công khai: không bao giờ commit token, URL `/exec`, PIN, API key hay dữ liệu dự án thật. Token chỉ nằm trong Script Properties (`SECRET_TOKEN`) và localStorage của app.
- App lưu cấu hình ở localStorage `be_cfg` (đọc kế thừa `exec_bid_cfg_v1` của bản cũ). PIN băm SHA-256 với tiền tố `exec-bid-pin:`.
- Escape mọi dữ liệu từ Sheet trước khi đưa vào HTML.
- Font phải hỗ trợ tiếng Việt (Inter cho chữ thường, Lora cho tiêu đề).
- Giáo án gửi giáo viên Preply: 100% tiếng Anh; tình huống tiếng Việt dùng mẫu tiếng Anh theo `stage`, giữ lại cụm tiếng Anh trong ngoặc kép.
- Quy trình sửa: branch riêng → kiểm tra máy tính + điện thoại (không tràn ngang, không lỗi console) → Pull Request → chủ repo bấm Merge.
