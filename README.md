# ❄️ Cold Chain QA — Hệ thống Giám sát Dây truyền Lạnh

Web App giám sát chất lượng dây truyền lạnh cho trung tâm tiêm chủng FPT Long Châu.

## 🚀 Cách sử dụng

Mở **`index.html`** bằng trình duyệt (Chrome/Edge). Không cần server.

## 📂 Cấu trúc project

```
ColdChain/
├── index.html              # Giao diện chính
├── style.css               # FPT Branding dark-mode
├── app.js                  # KWSR Agent logic
├── google-apps-script.js   # Template code cho Google Sheets
├── README.md
├── .agent/
│   ├── workflows/incident-workflow.md
│   └── skills/cold-chain-analysis/SKILL.md
└── knowledge/knowledge-base.json
```

## ⚙️ Kết nối Google Sheets

1. Tạo Google Sheets mới → Extensions → Apps Script
2. Xóa code mặc định → Paste toàn bộ nội dung `google-apps-script.js`
3. Deploy → New deployment → Web app → Anyone → Deploy
4. Copy URL → Paste vào `app.js` dòng:
   ```javascript
   const CONFIG = { GOOGLE_SHEETS_URL: 'PASTE_URL_TẠI_ĐÂY' };
   ```

> **Fix lỗi data không hiển thị:** Xem phần comment chi tiết trong `google-apps-script.js`

---

## 💬 Hướng dẫn thêm kịch bản Chatbot mới

Mở file `app.js`, tìm `KnowledgeBase.chatbotScenarios` (mảng JSON), thêm object mới:

```javascript
{
    id: 'ten_kich_ban',           // ID duy nhất, viết thường, không dấu
    title: 'Tiêu đề hiển thị',   // Text hiển thị trên nút
    icon: '🔧',                   // Emoji icon
    keywords: ['từ khóa 1', 'từ khóa 2'],  // Để chatbot tìm kiếm
    steps: [
        'Bước 1: Hướng dẫn cụ thể',
        'Bước 2: Hướng dẫn tiếp theo',
        'Bước 3: ...',
    ],
    note: 'Ghi chú thêm (tùy chọn, bỏ trống được)',
},
```

**Ví dụ thêm kịch bản "Tủ chạy liên tục không ngắt":**
```javascript
{
    id: 'tu_chay_lien_tuc',
    title: 'Tủ chạy liên tục không ngắt',
    icon: '🔄',
    keywords: ['chạy liên tục', 'không ngắt', 'không dừng', 'quá tải'],
    steps: [
        'Kiểm tra thermostat tủ có đặt đúng mức không (2-8°C)',
        'Kiểm tra cảm biến nhiệt độ có bị hỏng / lệch không',
        'Kiểm tra cửa tủ đóng kín, gioăng tủ nguyên vẹn',
        'Kiểm tra dàn ngưng (phía sau tủ) có bị bụi che không',
        'Nếu vẫn chạy liên tục > 4 giờ → tắt tủ, liên hệ kỹ thuật',
    ],
    note: 'Tủ chạy liên tục có thể gây quá lạnh (<0°C), ảnh hưởng vaccine.',
},
```

Save file → Reload trình duyệt → Kịch bản mới tự động xuất hiện.
