// ============================================================
// COLD CHAIN QA AGENT v2.0 — KWSR Architecture
// Hệ thống Giám sát Dây truyền Lạnh — FPT Long Châu
// ============================================================
'use strict';

// ⚙️ CẤU HÌNH
const CONFIG = {
    DEFAULT_FORM_URL: 'https://docs.google.com/forms/d/e/1FAIpQLSd5Z12RNKBlEoZqQouhHN9G5Jy-giY7tOTqJdPnb5Fi7RYmWw/viewform?embedded=true',
    STORAGE_KEY: 'coldchain_form_url',
    QA_FALLBACK_NAME: 'QA AnhNTM67',
    QA_FALLBACK_PHONE: '0888663877',
};

// ============================================================
// 📚 KNOWLEDGE BASE (K) — 21 Kịch Bản
// ============================================================
const KnowledgeBase = {
    sop: {
        tempMin: 2, tempMax: 8,
        legalRef: 'TT 34/2018/TT-BYT (Phụ lục VIII), NĐ 104/2016/NĐ-CP (Điều 8)',
        rule: 'BẤT KỲ nhiệt độ ngoài dải 2-8°C = BÁO ĐỘNG ĐỎ. Xử trí NGAY LẬP TỨC.',
    },

    chatbotScenarios: [
        {
            id: 'stt1', stt: '1',
            title: 'Logtag đã thay pin nhưng không hiển thị',
            icon: '🔋',
            keywords: ['logtag', 'pin', 'thay pin', 'pin logtag', 'lỏng pin', 'vạch pin', 'battery', 'không hiển thị sau khi thay', 'không lên sau khi thay pin'],
            steps: [
                'Có thể là do lỏng pin → tháo pin ra.',
                'Kiểm tra 2 miếng kim loại ở 2 đầu: Kéo sát miếng kim loại đó về phía pin (kéo ra ngoài).',
                'Lắc lắc thử đến khi lên vạch pin.',
                'Lắp pin lại logtag.',
            ],
            contact: 'QA QuyenDN4: 0765647301 / QA AnhNTM67: 0888663877 / QA TinhHD4: 0909338535',
            images: ['stt1.jpg'],
        },
        {
            id: 'stt2', stt: '2',
            title: 'Màn hình logtag hiển thị tình trạng bất thường',
            icon: '🖥️',
            keywords: ['logtag', 'màn hình', 'bất thường', 'ký hiệu lạ', 'cài lại logtag', 'record readings', 'configure', 'màn hình lạ', 'biểu tượng lạ', 'màn hình logtag bất thường', 'logtag hiển thị lạ'],
            steps: [
                'Xuất hết dữ liệu rồi cài lại logtag theo hướng dẫn sau:',
                'Trong ứng dụng Logtag → chọn mục Logtag Online.',
                'Chọn "Record readings continuously..." → Bấm Configure.',
            ],
            contact: 'QA QuyenDN4: 0765647301 / QA AnhNTM67: 0888663877 / QA TinhHD4: 0909338535',
            images: ['stt2.jpg', '3.png', '4.png'],
        },
        {
            id: 'stt3', stt: '3',
            title: 'USB tủ đông không xuất được dữ liệu',
            icon: '💾',
            keywords: ['usb', 'xuất dữ liệu', 'tủ đứng', 'không xuất', 'xuất dữ liệu usb', 'usb tủ đông', 'usb không nhận'],
            steps: [
                'Báo vào group QA - Điều dưỡng về tình trạng USB tủ đứng.',
                'Liên hệ NCC Thanh Liêm: 0932235326 hoặc NCC Nqn: 0352931653 để được hỗ trợ.',
            ],
            contact: 'NCC Thanh Liêm: 0932235326 / NCC Nqn: 0352931653',
            images: ['stt3.jpg'],
        },
        {
            id: 'stt4', stt: '4',
            title: 'Màn hình logtag không hiển thị (tắt hoàn toàn)',
            icon: '🌑',
            keywords: ['logtag', 'màn hình', 'không hiển thị', 'màn hình tắt', 'tối màn hình', 'không lên màn hình', 'reset logtag', 'màn hình logtag không', 'logtag không hiển thị'],
            steps: [
                'Kiểm tra kết nối nguồn điện có ổn định không.',
                'Kiểm tra pin logtag còn không.',
                'Nếu nguồn ổn định và pin còn → rút logtag → cắm vào máy tính xuất dữ liệu → Reset lại logtag.',
            ],
            contact: 'QA QuyenDN4: 0765647301 / QA AnhNTM67: 0888663877 / QA TinhHD4: 0909338535',
            images: ['stt4.jpg'],
        },
        {
            id: 'stt5', stt: '5',
            title: 'Logtag đột nhiên xuống nhiệt độ bất ngờ rồi trở lại bình thường',
            icon: '📉',
            keywords: ['logtag', 'đầu dò', 'xuống đột ngột', 'âm 55', '-55', 'probe', 'lỏng đầu dò', 'cảm biến lỏng', 'bất ngờ giảm', 'nhiệt độ xuống'],
            steps: [
                'Trường hợp này thường do bị lỏng đầu dò.',
                'Anh/chị hãy găm kỹ lại đầu dò vào thiết bị.',
            ],
            contact: 'QA QuyenDN4: 0765647301 / QA AnhNTM67: 0888663877 / QA TinhHD4: 0909338535',
            images: ['stt5.jpg'],
        },
        {
            id: 'stt6', stt: '6',
            title: 'Logtag mất kết nối wifi / đám mây',
            icon: '🌐',
            keywords: ['logtag', 'wifi', 'mạng', 'mất kết nối', 'đám mây', 'cloud', 'offline', 'internet', 'logtag không lên mạng', 's/n', 'kết nối wifi', 'mạng yếu'],
            steps: [
                'TH mất kết nối Wifi: Kiểm tra lại modem/internet của shop.',
                'TH mất kết nối Cloud: Kiểm tra S/N trên logtag có khớp trên Logtag Online không.',
                'Nếu khớp: Do đường truyền yếu → Kiểm tra lại mạng.',
                'Nếu không khớp: Liên hệ QA để được hỗ trợ.',
            ],
            contact: 'QA QuyenDN4: 0765647301',
            images: ['stt6a.jpg', 'stt6b.jpg'],
        },
        {
            id: 'stt7', stt: '7',
            title: 'Không đẩy được báo cáo chứng từ nhiệt độ LCNB trên RSA',
            icon: '📤',
            keywords: ['rsa', 'lcnb', 'không đẩy', '5mb', 'quá dung lượng', 'chứng từ', 'báo cáo rsa', 'upload rsa', 'file lớn', 'đẩy rsa', 'không lên rsa', 'báo cáo chứng từ', 'đẩy được', 'đẩy lên rsa'],
            steps: [
                'RSA không nhận file > 5MB.',
                'Cần nén hoặc tách nhỏ file: tách hình logtag và hình thùng riêng.',
                'Nếu nhận nhiều lệnh → tách ra đẩy từng lệnh riêng.',
            ],
            contact: 'QA QuyenDN4: 0765647301 / QA AnhNTM67: 0888663877 / QA TinhHD4: 0909338535',
            images: ['stt7.jpg'],
        },
        {
            id: 'stt8', stt: '8',
            title: 'Logtag không hiển thị nhiệt độ sau khi mất điện đột ngột',
            icon: '⚡',
            keywords: ['logtag', 'màn hình', 'mất điện', 'cúp điện', 'ngắt điện', 'không hiển thị số', 'sau mất điện', 'logtag mất điện', 'bị mất điện'],
            steps: [
                'Khi có điện: cắm logtag vào máy tính xuất dữ liệu, reset log sẽ hiện lại.',
                'Lưu ý: Trong lúc mất điện logtag vẫn ghi nhận nhiệt độ bình thường.',
            ],
            contact: 'QA QuyenDN4: 0765647301 / QA AnhNTM67: 0888663877 / QA TinhHD4: 0909338535',
            images: ['stt8.jpg'],
        },
        {
            id: 'stt9', stt: '9',
            title: 'Hiển thị hết pin cúc áo',
            icon: '🪫',
            keywords: ['logtag', 'pin', 'pin cúc áo', 'pin cúc', 'pin nhỏ', 'hết pin nhỏ', 'pin đồng xu', 'bảo hành pin', 'hết pin', 'pin logtag'],
            steps: [
                'Anh/Chị KHÔNG tự ý thay pin.',
                'Báo Hành chính để gửi thiết bị đi bảo hành và nhận máy mới.',
            ],
            contact: 'Báo hành chính',
            images: ['stt9.png'],
        },
        {
            id: 'stt10', stt: '10',
            title: 'Nhờ phân quyền link báo cáo nhiệt độ trên SharePoint',
            icon: '🔗',
            keywords: ['sharepoint', 'phân quyền', 'link báo cáo', 'phân quyền sharepoint', 'link sharepoint', 'quyền báo cáo nhiệt độ', 'báo cáo sharepoint'],
            steps: [
                'Gửi tên shop + Mail FPT đến QA AnhNTM67: 0888663877 để được hỗ trợ.',
            ],
            contact: 'QA AnhNTM67: 0888663877',
            images: ['stt10.jpg'],
        },
        {
            id: 'stt11', stt: '11',
            title: 'Nhờ phân quyền theo dõi Logtag Online',
            icon: '🖥️',
            keywords: ['logtag', 'logtag online', 'phân quyền logtag', 'theo dõi logtag online', 'logtag online quyền', 'quyền logtag online', 'theo dõi logtag'],
            steps: [
                'Gửi tên shop + Mail FPT đến QA QuyenDN4: 0765647301 để được hỗ trợ.',
            ],
            contact: 'QA QuyenDN4: 0765647301',
            images: ['stt11.jpg'],
        },
        {
            id: 'stt12', stt: '12',
            title: 'Nhận Logtag mới từ Hành Chính thay thế Logtag cũ',
            icon: '🆕',
            keywords: ['logtag', 'logtag mới', 'thay logtag', 'nhận logtag', 'cài đặt logtag mới', 'logtag hành chính', 'đổi logtag'],
            steps: [
                'Liên hệ QA QuyenDN4: 0765647301 để được hỗ trợ cấu hình máy mới.',
            ],
            contact: 'QA QuyenDN4: 0765647301',
            images: ['stt12.jpg'],
        },
        {
            id: 'stt13', stt: '13',
            title: 'Hỗ trợ cấp túi đá gel',
            icon: '🧊',
            keywords: ['đá gel', 'túi đá', 'gel', 'cấp đá', 'xin đá gel', 'thêm đá'],
            steps: [
                'Vui lòng nhắn tin trong Group Shop - Kho để được hỗ trợ.',
            ],
            contact: 'Group Shop - Kho',
            images: ['stt13.jpg'],
        },
        {
            id: 'stt14', stt: '14',
            title: 'Hàng vắc xin hết hạn sử dụng chuyển kho gì?',
            icon: '📅',
            keywords: ['vắc xin', 'hsd', 'vắc xin hết hạn', 'hết hạn sử dụng', 'chuyển kho', 'thanh lý', 'chuyển kho thanh lý', 'vaccine hết hạn'],
            steps: [
                'Thực hiện trên mRSA.',
                'Vắc xin cúm: chuyển đúng ngày hết hạn.',
                'Vắc xin khác: chuyển trước ngày hết HSD 1 tháng.',
            ],
            contact: 'QA TrangHTN2: 0961563595',
            images: ['stt14.jpg'],
        },
        {
            id: 'stt15', stt: '15',
            title: 'Hàng vắc xin không đạt chất lượng (lỗi NSX, hư hỏng, bể vỡ)',
            icon: '⚠️',
            keywords: ['vắc xin', 'lỗi nsx', 'không đạt chất lượng', 'hư hỏng', 'bể vỡ', 'vắc xin hỏng', 'vắc xin lỗi', 'chờ xử lý', 'vaccine hỏng'],
            steps: [
                'Báo lên group QA - Điều dưỡng ngay lập tức.',
                'Chuyển kho "Chờ xử lý" trên mRSA.',
                'Biệt trữ tại trung tâm theo đúng dải nhiệt độ 2-8°C.',
            ],
            contact: 'Group QA - Điều dưỡng',
            images: ['stt15.jpg'],
        },
        {
            id: 'stt16', stt: '16',
            title: 'Lọ bột đông khô BCG hết HSD — dung môi kèm chưa hết, có chuyển thanh lý chung không?',
            icon: '🧪',
            keywords: ['vắc xin', 'bcg', 'đông khô', 'dung môi', 'lao', 'bột đông khô', 'thanh lý chung', 'bột và dung môi', 'vaccine bcg'],
            steps: [
                'Chuyển thanh lý cả cặp (Bột + Dung môi) mặc dù dung môi còn hạn.',
                'Do tính chất vaccine này đi kèm theo bộ tương ứng.',
            ],
            contact: 'QA TrangHTN2: 0961563595',
            images: ['stt16.jpg'],
        },
        {
            id: 'stt17', stt: '17',
            title: 'Đơn cọc vệ tinh ghi nhận sai thông tin dược sĩ',
            icon: '📝',
            keywords: ['dược sĩ', 'asm', 'vệ tinh', 'cọc vệ tinh', 'sai thông tin dược sĩ', 'dược sĩ sai', 'đơn vệ tinh'],
            steps: [
                'ASM thực hiện điền template hàng tháng gửi Group BU - Vùng.',
                'BU tiếp nhận điều chỉnh trong 3 ngày đầu tháng.',
                'Nếu trễ → để tháng sau.',
            ],
            contact: 'Báo ASM Vùng',
            images: ['stt17.jpg'],
        },
        {
            id: 'stt18', stt: '18',
            title: 'Phát hiện gian lận tài chính hoặc tranh chấp đơn hàng sai quy định',
            icon: '⚖️',
            keywords: ['gian lận', 'tài chính', 'tranh chấp', 'ksnb', 'đơn hàng sai', 'gian lận tài chính'],
            steps: [
                'Trình bày sự việc kèm hình ảnh bằng chứng.',
                'Gửi mail đến: FLC.KSNB@fpt.com',
                'Vui lòng CC các quản lý trực tiếp liên quan.',
            ],
            contact: 'FLC.KSNB@fpt.com',
            images: ['stt18.jpg'],
        },
        {
            id: 'stt19', stt: '19',
            title: 'Thời gian mở tủ đông / tủ ngang tối đa bao lâu?',
            icon: '⏲️',
            keywords: ['tủ đông', 'tủ ngang', 'mở tủ', 'thời gian mở', 'bao lâu mở', '30 giây', 'tủ đứng thời gian', 'tủ ngang thời gian', '5 phút', 'thời gian tủ'],
            steps: [
                'Tủ đứng: Tối đa 30 giây mỗi lần mở.',
                'Tủ ngang: Tối đa 2 phút mỗi lần mở.',
                'Quan trọng: Chỉ mở lại sau lần mở trước ít nhất 5 phút.',
            ],
            contact: null,
            images: ['stt19.jpg'],
        },
        {
            id: 'stt21', stt: '21',
            title: 'Cánh quạt tủ đông không quay khi đóng tủ trong một khoảng thời gian',
            icon: '🌬️',
            keywords: ['tủ đông', 'quạt', 'cánh quạt', 'quạt không quay', 'xả đá', 'quạt tủ không quay', 'quạt tắt', 'xả đá cưỡng bức'],
            steps: [
                'Tủ đang ở trạng thái xả đá cưỡng bức → Mở cửa tủ 1 phút rồi đóng lại.',
                'Lưu ý: KHÔNG có vaccine trong tủ khi thực hiện.',
                'Nếu vẫn không quay → Liên hệ NCC kỹ thuật.',
            ],
            contact: 'NCC Thanh Liêm: 0932235326 / NCC Nqn: 0352931653',
            images: ['stt21.jpg'],
        },
        {
            id: 'stt23', stt: '23',
            title: 'Tủ ngang kêu / phát tiếng động lạ',
            icon: '🔊',
            keywords: ['tủ ngang', 'tủ ngang kêu', 'tủ kêu', 'kêu to', 'ồn', 'tiếng kêu lạ', 'phát tiếng', 'tủ ồn'],
            steps: [
                'Kiểm tra lại kết nối điện (đèn và quạt) và cắm lại phích cắm điện.',
                '⚠️ Nếu nhiệt độ đang tăng → Gọi ngay cho QA TinhHD4: 0909338535.',
            ],
            contact: 'QA TinhHD4: 0909338535',
            images: ['stt23.jpg'],
        },
    ],
};

// ============================================================
// 🗺️ SYNONYM MAP — Ánh xạ từ đồng nghĩa (Anh → Việt)
// ============================================================
const SYNONYM_MAP = {
    'battery': 'pin',
    'probe': 'đầu dò',
    'sensor': 'cảm biến',
    'cloud': 'đám mây',
    'offline': 'mất kết nối',
    'temperature': 'nhiệt độ',
    'vaccine': 'vắc xin',
    'freezer': 'tủ đông',
    'fridge': 'tủ đông',
    'display': 'màn hình',
    'screen': 'màn hình',
};

// ============================================================
// 🔧 SKILLS (S) — Logic tìm kiếm kịch bản
// ============================================================
const Skills = {
    _pendingCandidates: [],

    setPending(list) { this._pendingCandidates = list; },
    clearPending() { this._pendingCandidates = []; },
    getPending() { return this._pendingCandidates; },

    expandSynonyms(query) {
        let q = query;
        for (const [en, vi] of Object.entries(SYNONYM_MAP)) {
            q = q.replace(new RegExp('\\b' + en + '\\b', 'gi'), vi);
        }
        return q;
    },

    // 🎯 2-Pass Scoring với deduplication
    // Pass 1: Từ đơn exact match → điểm = length × 2 (ưu tiên cao nhất)
    // Pass 2: Cụm từ exact → length × 2 | Từng chữ riêng lẻ → word length
    // Mỗi từ/cụm CHỈ được tính điểm MỘT LẦN (usedParts)
    scoreScenario(scenario, query) {
        const q = query.toLowerCase();
        const usedParts = new Set();
        let score = 0;

        // === Pass 1: Từ đơn (single-word) — không chứa dấu cách ===
        for (const kw of scenario.keywords) {
            const kwLower = kw.toLowerCase();
            if (kwLower.includes(' ')) continue;
            if (q.includes(kwLower) && !usedParts.has(kwLower)) {
                score += kwLower.length * 2;
                usedParts.add(kwLower);
            }
        }

        // === Pass 2: Cụm từ nhiều chữ ===
        for (const kw of scenario.keywords) {
            const kwLower = kw.toLowerCase();
            if (!kwLower.includes(' ')) continue;

            if (q.includes(kwLower) && !usedParts.has(kwLower)) {
                // Khớp cả cụm từ → điểm cao
                score += kwLower.length * 2;
                usedParts.add(kwLower);
                // Đánh dấu từng chữ con để tránh tính trùng
                kwLower.split(/\s+/).filter(p => p.length >= 3).forEach(p => usedParts.add(p));
            } else {
                // Khớp từng chữ riêng lẻ trong cụm
                const parts = kwLower.split(/\s+/).filter(p => p.length >= 3);
                for (const part of parts) {
                    if (q.includes(part) && !usedParts.has(part)) {
                        score += part.length;
                        usedParts.add(part);
                    }
                }
            }
        }

        return score;
    },

    findScenario(rawQuery) {
        const trimmed = rawQuery.trim();

        // 🔢 Ưu tiên 0: Người dùng chọn số từ danh sách ("1", "2", "3"...)
        const numMatch = trimmed.match(/^(\d+)$/);
        if (numMatch && this._pendingCandidates.length > 0) {
            const idx = parseInt(numMatch[1], 10) - 1;
            if (idx >= 0 && idx < this._pendingCandidates.length) {
                const chosen = this._pendingCandidates[idx];
                this.clearPending();
                return { result: 'exact', match: chosen };
            }
        }

        // Mở rộng từ đồng nghĩa trước khi tìm kiếm
        const query = this.expandSynonyms(rawQuery.toLowerCase());

        // Tính điểm cho tất cả kịch bản, lọc điểm >= 6 (ngưỡng tối thiểu)
        const MIN_SCORE = 6;
        const scored = KnowledgeBase.chatbotScenarios
            .map(s => ({ scenario: s, score: this.scoreScenario(s, query) }))
            .filter(x => x.score >= MIN_SCORE)
            .sort((a, b) => b.score - a.score);

        if (scored.length === 0) {
            this.clearPending();
            return { result: 'none', match: null, candidates: [] };
        }

        // Nếu điểm cao nhất vượt trội (top score > 65% so với điểm 2) → trả kết quả chính xác
        const topScore = scored[0].score;
        const closeMatches = scored.filter(x => x.score >= topScore * 0.65);

        if (closeMatches.length === 1) {
            this.clearPending();
            return { result: 'exact', match: closeMatches[0].scenario, candidates: [] };
        }

        // Nhiều kịch bản tương nhau → hiển thị danh sách để chọn
        const candidates = closeMatches.slice(0, 5).map(x => x.scenario);
        this.setPending(candidates);
        return { result: 'suggestions', match: null, candidates };
    },

    // Parse contact string "QA A: 0123 / QA B: 0456" → array of {name, phone, display}
    parseContacts(contactStr) {
        if (!contactStr) return [];
        return contactStr.split(/\s*\/\s*|\n/).map(part => {
            const trimmed = part.trim();
            // Match phone number pattern (Vietnamese: 10-11 digits)
            const phoneMatch = trimmed.match(/(\d{9,11})/);
            if (phoneMatch) {
                const phone = phoneMatch[1];
                const name = trimmed.replace(phoneMatch[0], '').replace(/:\s*$/, '').trim();
                return { name, phone, display: trimmed };
            }
            return { name: trimmed, phone: null, display: trimmed };
        }).filter(c => c.display);
    },
};

// ============================================================
// 🎮 UI CONTROLLER — Quản lý giao diện
// ============================================================
const UI = {
    elements: {
        tabs: document.querySelectorAll('.tab-btn'),
        tabContents: document.querySelectorAll('.tab-content'),
        formSetup: document.getElementById('formSetup'),
        formContainer: document.getElementById('formContainer'),
        googleFormUrl: document.getElementById('googleFormUrl'),
        btnEmbed: document.getElementById('btnEmbed'),
        iframe: document.getElementById('googleFormIframe'),
        btnChangeForm: document.getElementById('btnChangeForm'),
        btnOpenNew: document.getElementById('btnOpenNew'),
        chatContainer: document.getElementById('chatContainer'),
        chatInput: document.getElementById('chatInput'),
        btnSend: document.getElementById('btnSend'),
    },

    _typingEl: null,

    init() {
        this.loadFormUrl();
        this.addEventListeners();
        this.showWelcomeMessage();
    },

    addEventListeners() {
        this.elements.tabs.forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
        });
        this.elements.btnEmbed.addEventListener('click', () => this.saveFormUrl());
        this.elements.btnChangeForm.addEventListener('click', () => this.resetForm());
        this.elements.btnOpenNew.addEventListener('click', () => {
            const url = localStorage.getItem(CONFIG.STORAGE_KEY) || CONFIG.DEFAULT_FORM_URL;
            window.open(url, '_blank');
        });
        this.elements.btnSend.addEventListener('click', () => this.handleChatSubmit());
        this.elements.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleChatSubmit();
        });
    },

    switchTab(tabId) {
        this.elements.tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
        this.elements.tabContents.forEach(c => c.classList.toggle('active', c.id === `tab-${tabId}`));
    },

    // ── Google Form ──────────────────────────────────────────
    loadFormUrl() {
        const savedUrl = localStorage.getItem(CONFIG.STORAGE_KEY) || CONFIG.DEFAULT_FORM_URL;
        if (savedUrl) {
            this.renderForm(savedUrl);
        } else {
            this.elements.formSetup.style.display = 'block';
            this.elements.formContainer.style.display = 'none';
        }
    },

    saveFormUrl() {
        const url = this.elements.googleFormUrl.value.trim();
        if (!url) return this.showToast('Vui lòng nhập URL Google Form', 'error');
        localStorage.setItem(CONFIG.STORAGE_KEY, url);
        this.renderForm(url);
    },

    renderForm(url) {
        this.elements.formSetup.style.display = 'none';
        this.elements.formContainer.style.display = 'block';
        let embedUrl = url;
        if (url.includes('/viewform') && !url.includes('embedded=true')) {
            embedUrl += (url.includes('?') ? '&' : '?') + 'embedded=true';
        }
        this.elements.iframe.src = embedUrl;
    },

    resetForm() {
        if (confirm('Bạn có muốn đổi Google Form khác?')) {
            localStorage.removeItem(CONFIG.STORAGE_KEY);
            location.reload();
        }
    },

    // ── Chatbot ──────────────────────────────────────────────
    showWelcomeMessage() {
        this._botBubble(
            'Xin chào Anh/Chị! 👋 Mình là Trợ lý Cold Chain của FPT Long Châu.\n' +
            'Hãy mô tả sự cố hoặc từ khóa để mình tìm hướng xử lý nhé!'
        );
        this._quickReplies([
            { text: '🔋 Pin / Logtag', query: 'pin logtag' },
            { text: '📟 Màn hình Logtag', query: 'màn hình không hiển thị' },
            { text: '🌐 WiFi / Mạng', query: 'mất kết nối wifi' },
            { text: '📤 RSA / Upload', query: 'rsa lcnb không đẩy' },
            { text: '💉 Vắc xin', query: 'vắc xin hết hạn' },
            { text: '🧊 Tủ / Đá gel', query: 'tủ ngang đá gel' },
        ]);
    },

    handleChatSubmit() {
        const text = this.elements.chatInput.value.trim();
        if (!text) return;
        this._userBubble(text);
        this.elements.chatInput.value = '';
        this._showTyping();
        setTimeout(() => {
            this._removeTyping();
            const result = Skills.findScenario(text);
            this.processBotResponse(result, text);
        }, 550);
    },

    processBotResponse(obj, originalQuery) {
        if (obj.result === 'exact') {
            this.renderScenarioDetail(obj.match);
        } else if (obj.result === 'suggestions') {
            this.renderCandidateList(obj.candidates);
        } else {
            this.renderNoMatch(originalQuery || '');
        }
    },

    // ✅ Render chi tiết một kịch bản
    renderScenarioDetail(s) {
        const contacts = Skills.parseContacts(s.contact);
        const imagesArr = s.images || [];

        const stepsHtml = s.steps.map((st, i) =>
            `<div class="step-item">
                <span class="step-num">${i + 1}</span>
                <span class="step-text">${st}</span>
            </div>`
        ).join('');

        const contactHtml = contacts.length > 0 ? `
            <div class="contact-section">
                <div class="contact-label">📞 Liên hệ nếu chưa giải quyết được:</div>
                ${contacts.map(c => `
                    <div class="contact-line">
                        <span class="contact-name">${c.display}</span>
                        ${c.phone
                            ? `<button class="btn-copy-phone" onclick="copyPhone('${c.phone}')" title="Copy số điện thoại">📋 Copy</button>`
                            : ''}
                    </div>
                `).join('')}
            </div>` : '';

        const imagesHtml = imagesArr.length > 0 ? `
            <div class="scenario-images">
                ${imagesArr.map(img =>
                    `<img src="${img}" class="scenario-img" alt="${s.title}" onerror="this.style.display='none'">`
                ).join('')}
            </div>` : '';

        const html = `
            <div class="scenario-card">
                <div class="scenario-header">
                    <span class="badge-ok">✅ #${s.stt}</span>
                    <span class="scenario-icon">${s.icon || '🛠️'}</span>
                    <strong>${s.title}</strong>
                </div>
                <div class="scenario-body">
                    <div class="steps-list">${stepsHtml}</div>
                    ${imagesHtml}
                    ${contactHtml}
                </div>
            </div>`;
        this._botBubble(html, true);
    },

    // 📋 Render danh sách kịch bản khi nhiều kết quả
    renderCandidateList(candidates) {
        const NUMS = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];
        const html = `
            <div class="candidate-list">
                <p>Mình tìm thấy <strong>${candidates.length}</strong> kịch bản có thể liên quan.<br>Anh/Chị đang gặp vấn đề nào?</p>
                <div class="candidate-items">
                    ${candidates.map((s, i) => `
                        <button class="candidate-btn" onclick="UI._pickCandidate(${i})">
                            <span class="candidate-num">${NUMS[i] || (i + 1) + '.'}</span>
                            <span>${s.icon || ''} ${s.title}</span>
                        </button>
                    `).join('')}
                </div>
                <p class="candidate-hint">→ Nhấn vào kịch bản hoặc nhập số (1, 2, 3...)</p>
            </div>`;
        this._botBubble(html, true);
    },

    _pickCandidate(idx) {
        const candidates = Skills.getPending();
        if (idx >= 0 && idx < candidates.length) {
            const chosen = candidates[idx];
            Skills.clearPending();
            this._userBubble(chosen.title);
            this._showTyping();
            setTimeout(() => {
                this._removeTyping();
                this.renderScenarioDetail(chosen);
            }, 400);
        }
    },

    // ❌ Render khi không tìm thấy kịch bản
    renderNoMatch(query) {
        const html = `
            <div class="no-match-card">
                <div class="no-match-header">❌ Mình chưa tìm được kịch bản phù hợp với "<strong>${query}</strong>".</div>
                <p class="no-match-hint">Bạn có thể thử lại với từ khóa như:<br>
                    <em>pin, logtag, wifi, tủ đông, RSA, vắc xin, BCG, đầu dò...</em>
                </p>
                <div class="contact-section">
                    <div class="contact-label">Hoặc liên hệ trực tiếp QA để được hỗ trợ:</div>
                    <div class="contact-line">
                        <span class="contact-name">QA AnhNTM67: ${CONFIG.QA_FALLBACK_PHONE}</span>
                        <button class="btn-copy-phone" onclick="copyPhone('${CONFIG.QA_FALLBACK_PHONE}')" title="Copy số">📋 Copy</button>
                    </div>
                </div>
            </div>`;
        this._botBubble(html, true);
    },

    // ── Internal bubble helpers ──────────────────────────────
    _botBubble(content, isHTML = false) {
        const wrap = document.createElement('div');
        wrap.className = 'chat-msg bot';

        const bub = document.createElement('div');
        bub.className = 'chat-bubble';
        if (isHTML) bub.innerHTML = content;
        else { bub.style.whiteSpace = 'pre-line'; bub.innerText = content; }

        wrap.appendChild(bub);
        this.elements.chatContainer.appendChild(wrap);
        this.elements.chatContainer.scrollTop = this.elements.chatContainer.scrollHeight;
    },

    _userBubble(content) {
        const wrap = document.createElement('div');
        wrap.className = 'chat-msg user';

        const bub = document.createElement('div');
        bub.className = 'chat-bubble';
        bub.innerText = content;

        wrap.appendChild(bub);
        this.elements.chatContainer.appendChild(wrap);
        this.elements.chatContainer.scrollTop = this.elements.chatContainer.scrollHeight;
    },

    _quickReplies(items) {
        const wrap = document.createElement('div');
        wrap.className = 'chat-msg bot';

        const box = document.createElement('div');
        box.className = 'chat-quick-replies';

        items.forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'chat-quick-btn';
            btn.innerText = item.text;
            btn.onclick = () => {
                this._userBubble(item.text);
                this._showTyping();
                setTimeout(() => {
                    this._removeTyping();
                    const result = Skills.findScenario(item.query || item.text);
                    this.processBotResponse(result, item.query || item.text);
                }, 500);
            };
            box.appendChild(btn);
        });

        wrap.appendChild(box);
        this.elements.chatContainer.appendChild(wrap);
        this.elements.chatContainer.scrollTop = this.elements.chatContainer.scrollHeight;
    },

    _showTyping() {
        if (this._typingEl) return;
        const wrap = document.createElement('div');
        wrap.className = 'chat-msg bot';
        wrap.id = 'typing-indicator';

        const bub = document.createElement('div');
        bub.className = 'chat-bubble typing-bubble';
        bub.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';

        wrap.appendChild(bub);
        this.elements.chatContainer.appendChild(wrap);
        this._typingEl = wrap;
        this.elements.chatContainer.scrollTop = this.elements.chatContainer.scrollHeight;
    },

    _removeTyping() {
        if (this._typingEl) {
            this._typingEl.remove();
            this._typingEl = null;
        }
    },

    showToast(msg, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = msg;
        document.getElementById('toast-container').appendChild(toast);
        setTimeout(() => {
            toast.classList.add('toast-out');
            setTimeout(() => toast.remove(), 350);
        }, 2500);
    },
};

// ============================================================
// 🌐 GLOBAL HELPERS
// ============================================================
function copyPhone(phone) {
    navigator.clipboard.writeText(phone)
        .then(() => UI.showToast(`✅ Đã copy: ${phone}`, 'success'))
        .catch(() => {
            // Fallback for non-HTTPS
            const el = document.createElement('input');
            el.value = phone;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            UI.showToast(`✅ Đã copy: ${phone}`, 'success');
        });
}

function copyQA(btn, phone) {
    const raw = phone.replace(/\s/g, '');
    const doCopy = () => {
        btn.textContent = 'Copied ✓';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
        }, 2000);
        UI.showToast(`✅ Đã copy: ${phone}`, 'success');
    };
    navigator.clipboard.writeText(raw)
        .then(doCopy)
        .catch(() => {
            const el = document.createElement('input');
            el.value = raw;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            doCopy();
        });
}


document.addEventListener('DOMContentLoaded', () => UI.init());
