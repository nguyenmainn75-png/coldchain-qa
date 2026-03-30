// ============================================================
// COLD CHAIN QA AGENT v2.0 — KWSR Architecture
// Hệ thống Giám sát Dây truyền Lạnh
// ============================================================
'use strict';

// ⚙️ CẤU HÌNH
const CONFIG = {
    // URL Google Form mặc định — điều dưỡng điền form trực tiếp
    DEFAULT_FORM_URL: 'https://docs.google.com/forms/d/e/1FAIpQLSd5Z12RNKBlEoZqQouhHN9G5Jy-giY7tOTqJdPnb5Fi7RYmWw/viewform?embedded=true',
    STORAGE_KEY: 'coldchain_form_url',
};

// ============================================================
// 📚 KNOWLEDGE BASE (K)
// ============================================================
const KnowledgeBase = {
    // SOP dải nhiệt độ an toàn
    // Căn cứ: TT 34/2018/TT-BYT (Phụ lục VIII) — Bảo quản vaccine trong dây chuyền lạnh
    // NĐ 104/2016/NĐ-CP (Điều 8) — Nhiệt độ bảo quản 2-8°C
    // ⚠️ BẤT KỲ nhiệt độ nào vượt ngưỡng 2-8°C = BÁO ĐỘNG ĐỎ
    sop: {
        tempMin: 2, tempMax: 8,
        legalRef: 'TT 34/2018/TT-BYT (Phụ lục VIII), NĐ 104/2016/NĐ-CP (Điều 8)',
        rule: 'BẤT KỲ nhiệt độ ngoài dải 2-8°C = BÁO ĐỘNG ĐỎ. Xử trí NGAY LẬP TỨC.',
        source: 'https://thuvienphapluat.vn/van-ban/The-thao-Y-te/Thong-tu-34-2018-TT-BYT-huong-dan-Nghi-dinh-104-2016-ND-CP-ve-hoat-dong-tiem-chung-400318.aspx',
    },

    // Thông tin liên hệ QA
    qaContact: { name: 'QA AnhNTM67', phone: '0987 654 321' },

    // =====================================================
    // 💬 KỊCH BẢN CHATBOT — THÊM KỊCH BẢN TẠI ĐÂY
    // Mỗi kịch bản gồm:
    //   id: mã định danh duy nhất
    //   title: tiêu đề hiển thị nút
    //   icon: emoji icon
    //   keywords: từ khóa tìm kiếm (viết thường)
    //   steps: mảng các bước hướng dẫn (string)
    //   note: ghi chú thêm (tùy chọn)
    // =====================================================
    chatbotScenarios: [
        {
            id: 'logtag_no_pin',
            title: 'LogTag không hiện pin / màn hình tắt',
            icon: '🔋',
            keywords: ['logtag', 'pin', 'màn hình', 'không hiện', 'tắt', 'trống', 'đen'],
            steps: [
                'Lật mặt sau LogTag, tìm nắp khe pin (hình chữ nhật nhỏ)',
                'Mở nắp → kiểm tra pin CR2032 có bị lỏng / xê dịch không',
                'Nếu pin lỏng: kéo miếng kim loại tiếp xúc pin lên lại để pin khớp chặt hơn',
                'Đóng nắp pin, đợi 5 giây → kiểm tra màn hình LogTag',
                'Nếu vẫn không hiện → thay pin CR2032 mới, mua tại cửa hàng điện tử',
            ],
            note: 'Nếu đã thay pin mới mà vẫn không hoạt động → có thể LogTag hỏng, liên hệ QA để đổi thiết bị.',
        },
        {
            id: 'fridge_too_hot',
            title: 'Tủ lạnh không đạt nhiệt độ (quá nóng)',
            icon: '🌡️',
            keywords: ['tủ', 'nóng', 'không lạnh', 'nhiệt độ cao', 'quá nhiệt', 'không đạt'],
            steps: [
                'Kiểm tra cửa tủ có đóng kín không → đóng lại nếu hở',
                'Kiểm tra gioăng cửa tủ có bị hở/cong không (dùng giấy A4 kẹp cửa, nếu rút dễ → gioăng hỏng)',
                'Kiểm tra quạt gió bên trong tủ có hoạt động không',
                'Kiểm tra không xếp quá nhiều hàng che quạt gió / lỗ thông gió',
                'Kiểm tra nguồn điện ổ cắm có ổn định không',
                'Nếu vẫn không cải thiện sau 30 phút → Báo cáo sự cố + liên hệ kỹ thuật',
            ],
        },
        {
            id: 'power_outage',
            title: 'Mất điện — Xử lý vaccine NGAY LẬP TỨC',
            icon: '⚡',
            keywords: ['mất điện', 'cúp điện', 'điện', 'power', 'tối'],
            steps: [
                '🚨 HÀNH ĐỘNG NGAY LẬP TỨC: Vận chuyển TOÀN BỘ vaccine từ TỦ ĐỨNG sang TỦ NGANG — KHÔNG chần chừ!',
                '🔒 HẠN CHẾ MỞ TỦ NGANG nhất có thể — mỗi lần mở cửa = nhiệt độ tăng, vaccine bị ảnh hưởng',
                '❌ KHÔNG mở tủ đứng kiểm tra khi mất điện — giữ nguyên trạng thái đóng để giữ lạnh',
                'Ghi nhận CHÍNH XÁC thời gian bắt đầu mất điện (giờ:phút) vào sổ theo dõi',
                'Sử dụng thùng lạnh (cold box) + ice pack nếu cần di chuyển vaccine xa',
                'Theo dõi LogTag LIÊN TỤC để ghi nhận nhiệt độ tại tủ ngang',
                'Nếu KHÔNG có tủ ngang dự phòng → chuyển vaccine sang kho Hub gần nhất NGAY',
                '📋 BÁO CÁO SỰ CỐ NGAY trên hệ thống (Tab Báo cáo sự cố) — ghi rõ giờ bắt đầu và kết thúc mất điện',
            ],
            note: 'Căn cứ: TT 34/2018/TT-BYT (Phụ lục VIII) & NĐ 104/2016/NĐ-CP (Điều 8): Vaccine PHẢI được bảo quản 2-8°C. Bất kỳ gián đoạn dây chuyền lạnh → xử trí NGAY LẬP TỨC để bảo toàn chất lượng vaccine.',
        },
        {
            id: 'logtag_overheat',
            title: 'LogTag báo quá nhiệt nhưng tủ bình thường',
            icon: '📊',
            keywords: ['logtag', 'quá nhiệt', 'báo', 'sai', 'chênh lệch', 'tủ bình thường'],
            steps: [
                'Kiểm tra vị trí đặt LogTag: có gần cửa tủ / cửa gió nóng không?',
                'LogTag nên đặt ở giữa tủ, cách thành tủ ít nhất 5cm',
                'So sánh với nhiệt kế thủy ngân đặt cạnh LogTag (đợi 15 phút)',
                'Nếu chênh lệch > 2°C → LogTag có thể bị lỗi sensor',
                'Chụp ảnh màn hình LogTag + nhiệt kế → gửi QA đánh giá',
            ],
        },
        {
            id: 'fridge_noise',
            title: 'Tủ lạnh kêu/rung bất thường',
            icon: '🔊',
            keywords: ['kêu', 'rung', 'tiếng', 'ồn', 'bất thường', 'lạ'],
            steps: [
                'Kiểm tra tủ đặt trên mặt phẳng, không bị nghiêng',
                'Kiểm tra chân tủ có bị lỏng / không đều không',
                'Kiểm tra dàn ngưng (phía sau tủ) có bám bụi nhiều không → vệ sinh',
                'Tắt tủ 15 phút → bật lại, theo dõi tiếng kêu',
                'Nếu vẫn kêu → ghi nhận và liên hệ kỹ thuật bảo trì',
            ],
        },
        {
            id: 'gasket_broken',
            title: 'Gioăng tủ hở / hỏng',
            icon: '🚪',
            keywords: ['gioăng', 'hở', 'hỏng', 'cửa', 'không kín', 'khe hở'],
            steps: [
                'Test bằng giấy A4: kẹp giữa cửa tủ và gioăng rồi đóng cửa',
                'Kéo giấy ra: nếu rút dễ dàng → gioăng hỏng',
                'Kiểm tra toàn bộ 4 cạnh gioăng (trên, dưới, trái, phải)',
                'Nếu hỏng 1 cạnh → có thể tạm xử lý bằng cách đóng cửa chắc hơn',
                'Báo cáo sự cố để QA sắp xếp thay gioăng mới',
            ],
        },
    ],
};

// ============================================================
// 🔧 SKILLS (S) — Chatbot
// ============================================================
const Skills = {
    // Chatbot: find matching scenario
    findScenario(query) {
        query = query.toLowerCase().trim();
        const scenarios = KnowledgeBase.chatbotScenarios;
        let best = null, bestScore = 0;
        for (const s of scenarios) {
            let score = 0;
            for (const kw of s.keywords) {
                if (query.includes(kw)) score += kw.length;
            }
            if (score > bestScore) { bestScore = score; best = s; }
        }
        return bestScore > 0 ? best : null;
    },

    // Convert Google Form URL to embeddable URL
    toEmbedUrl(url) {
        url = url.trim();
        // Already embed format
        if (url.includes('embedded=true')) return url;
        // Short link → we stored the resolved URL
        if (url.includes('/viewform')) return url + (url.includes('?') ? '&' : '?') + 'embedded=true';
        // forms.gle short link → convert
        if (url.includes('forms.gle/')) {
            // We can't resolve short links client-side, use as-is in iframe
            return url;
        }
        // Google Form edit URL → convert to viewform
        const match = url.match(/\/forms\/d\/([^/]+)/);
        if (match) {
            return `https://docs.google.com/forms/d/${match[1]}/viewform?embedded=true`;
        }
        return url;
    },
};

// ============================================================
// 🖥️ UI CONTROLLER
// ============================================================
const UI = {
    init() {
        this.bindTabs();
        this.bindChatbot();
        this.bindGoogleFormEmbed();
    },

    // --- Tabs ---
    bindTabs() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
                if (btn.dataset.tab === 'support') this.initChatbot();
            });
        });
    },

    // ============================================================
    // 📋 GOOGLE FORM EMBED
    // ============================================================
    bindGoogleFormEmbed() {
        const setupCard = document.getElementById('formSetup');
        const container = document.getElementById('formContainer');
        const urlInput = document.getElementById('googleFormUrl');
        const iframe = document.getElementById('googleFormIframe');
        const btnEmbed = document.getElementById('btnEmbed');
        const btnChange = document.getElementById('btnChangeForm');
        const btnOpenNew = document.getElementById('btnOpenNew');

        // Load saved URL or use default
        const savedUrl = localStorage.getItem(CONFIG.STORAGE_KEY);
        const formUrl = savedUrl || CONFIG.DEFAULT_FORM_URL;

        if (formUrl) {
            this.loadForm(formUrl);
        }

        // Embed button
        btnEmbed.addEventListener('click', () => {
            const url = urlInput.value.trim();
            if (!url) {
                this.showToast('⚠️ Vui lòng paste link Google Form', 'warning');
                return;
            }
            const embedUrl = Skills.toEmbedUrl(url);
            localStorage.setItem(CONFIG.STORAGE_KEY, embedUrl);
            this.loadForm(embedUrl);
            this.showToast('✅ Đã nhúng Google Form thành công!', 'success');
        });

        // Change form button
        btnChange.addEventListener('click', () => {
            setupCard.style.display = 'block';
            urlInput.value = localStorage.getItem(CONFIG.STORAGE_KEY) || '';
            urlInput.focus();
        });

        // Open in new tab
        btnOpenNew.addEventListener('click', () => {
            const url = localStorage.getItem(CONFIG.STORAGE_KEY) || CONFIG.DEFAULT_FORM_URL;
            const viewUrl = url.replace('?embedded=true', '').replace('&embedded=true', '');
            window.open(viewUrl, '_blank');
        });
    },

    loadForm(url) {
        const setupCard = document.getElementById('formSetup');
        const container = document.getElementById('formContainer');
        const iframe = document.getElementById('googleFormIframe');

        iframe.src = url;
        setupCard.style.display = 'none';
        container.style.display = 'block';
    },

    // --- Toast ---
    showToast(msg, type = 'info') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = msg;
        container.appendChild(toast);
        setTimeout(() => { toast.classList.add('toast-out'); setTimeout(() => toast.remove(), 300); }, 4000);
    },

    // ============================================================
    // 💬 CHATBOT
    // ============================================================
    chatInitialized: false,

    bindChatbot() {
        document.getElementById('btnSend').addEventListener('click', () => this.handleChatInput());
        document.getElementById('chatInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.handleChatInput();
        });
    },

    initChatbot() {
        if (this.chatInitialized) return;
        this.chatInitialized = true;
        const container = document.getElementById('chatContainer');
        container.innerHTML = '';

        this.addBotMessage('Xin chào! 👋 Tôi là trợ lý hỗ trợ xử trí sự cố dây truyền lạnh. Bạn đang gặp vấn đề gì?');

        // Show scenario buttons
        const btnsHtml = KnowledgeBase.chatbotScenarios.map(s =>
            `<button class="chat-quick-btn" data-scenario="${s.id}">${s.icon} ${s.title}</button>`
        ).join('');
        const contactBtn = `<button class="chat-quick-btn contact-qa" data-action="contact">📞 Liên hệ QA trực tiếp</button>`;
        this.addBotMessage('Chọn một vấn đề hoặc nhập mô tả sự cố:', btnsHtml + contactBtn);

        // Bind buttons via event delegation
        container.addEventListener('click', (e) => {
            const btn = e.target.closest('.chat-quick-btn');
            if (!btn) return;
            const scenarioId = btn.dataset.scenario;
            const action = btn.dataset.action;

            if (action === 'contact') {
                this.showQAContact();
            } else if (action === 'resolved') {
                this.addUserMessage('✅ Đã giải quyết được!');
                this.addBotMessage('Tuyệt vời! 🎉 Rất vui đã giúp được bạn. Nếu cần hỗ trợ thêm, hãy chọn vấn đề khác hoặc liên hệ QA.');
                this.showMainMenu();
            } else if (action === 'not-resolved') {
                this.addUserMessage('❌ Chưa giải quyết được');
                this.addBotMessage('Tôi hiểu. Hãy liên hệ QA để được hỗ trợ trực tiếp:');
                this.showQAContact();
                this.showMainMenu();
            } else if (action === 'back') {
                this.addUserMessage('↩️ Quay lại menu');
                this.showMainMenuMessage();
            } else if (scenarioId) {
                this.handleScenarioClick(scenarioId);
            }
        });
    },

    handleScenarioClick(scenarioId) {
        const scenario = KnowledgeBase.chatbotScenarios.find(s => s.id === scenarioId);
        if (!scenario) return;

        this.addUserMessage(scenario.title);

        // Build steps HTML
        let stepsHtml = '<div class="chat-steps">';
        scenario.steps.forEach((step, i) => {
            stepsHtml += `<div class="chat-step"><span class="chat-step-num">${i + 1}</span><span class="chat-step-text">${step}</span></div>`;
        });
        stepsHtml += '</div>';

        if (scenario.note) {
            stepsHtml += `<div style="margin-top:.5rem;padding:.5rem;background:rgba(255,170,0,0.08);border-radius:6px;font-size:.8rem;color:var(--risk-warning)">💡 ${scenario.note}</div>`;
        }

        stepsHtml += `<div class="chat-quick-replies" style="margin-top:.75rem">
            <button class="chat-quick-btn" data-action="resolved">✅ Đã giải quyết</button>
            <button class="chat-quick-btn" data-action="not-resolved">❌ Chưa giải quyết</button>
            <button class="chat-quick-btn" data-action="back">↩️ Quay lại</button>
        </div>`;

        this.addBotMessage(`Hướng dẫn xử trí: <strong>${scenario.title}</strong>`, stepsHtml);
    },

    handleChatInput() {
        const input = document.getElementById('chatInput');
        const query = input.value.trim();
        if (!query) return;
        input.value = '';

        this.addUserMessage(query);

        // Search for matching scenario
        const match = Skills.findScenario(query);
        if (match) {
            this.handleScenarioClick(match.id);
        } else {
            this.addBotMessage('Tôi chưa tìm thấy kịch bản phù hợp. Hãy thử chọn từ danh sách hoặc liên hệ QA:');
            this.showQAContact();
            this.showMainMenu();
        }
    },

    showQAContact() {
        const qa = KnowledgeBase.qaContact;
        const html = `<div class="qa-contact-card">
            <div class="qa-contact-name">👤 ${qa.name}</div>
            <div class="qa-contact-phone">${qa.phone}
                <button class="btn-copy" onclick="navigator.clipboard.writeText('${qa.phone.replace(/\s/g, '')}');this.textContent='✅ Đã copy'">📋 Copy</button>
            </div>
            <div class="qa-contact-hint">💡 Copy số điện thoại → Tìm kiếm trên Zalo để liên hệ QA</div>
        </div>`;
        this.addBotMessage('Thông tin liên hệ QA:', html);
    },

    showMainMenu() {
        const btns = KnowledgeBase.chatbotScenarios.map(s =>
            `<button class="chat-quick-btn" data-scenario="${s.id}">${s.icon} ${s.title}</button>`
        ).join('');
        const contact = `<button class="chat-quick-btn contact-qa" data-action="contact">📞 Liên hệ QA</button>`;
        this.addBotMessage('Bạn cần hỗ trợ thêm?', btns + contact);
    },

    showMainMenuMessage() {
        this.showMainMenu();
    },

    addBotMessage(text, extraHtml = '') {
        const container = document.getElementById('chatContainer');
        const div = document.createElement('div');
        div.className = 'chat-msg bot';
        div.innerHTML = `<div class="chat-avatar">🤖</div><div class="chat-bubble">${text}${extraHtml}</div>`;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    },

    addUserMessage(text) {
        const container = document.getElementById('chatContainer');
        const div = document.createElement('div');
        div.className = 'chat-msg user';
        div.innerHTML = `<div class="chat-avatar">👩‍⚕️</div><div class="chat-bubble">${text}</div>`;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    },
};

// ============================================================
// 🚀 INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', () => UI.init());
