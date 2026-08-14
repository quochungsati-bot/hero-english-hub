const fetch = require('node-fetch');
const DOC_TXT_URL = "https://docs.google.com/document/d/1vAs8b0xp_Yo60C0NsbN-nLU42uUsj6PqOzm2wktTOs0/export?format=txt";

const fallbackLessons = [
  {
    "id": 1,
    "title": "Lesson 01: Introduction to Bidding & Executive Pitch",
    "topic": "Executive Self-Introduction, Bidding Process & Technical vs Financial Bids",
    "scheduleDate": "Monday, Aug 10, 2026 (22:00 - 22:50)",
    "status": "Completed (Đã hoàn thành)",
    "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965",
    "timePlan": "Step 1 (5m): Self-Introduction Pitch | Step 2 (10m): Key Terms | Step 3 (10m): Grammar & Sentence Structures | Step 4 (10m): Bidding Process | Step 5 (10m): Role Play Pitch | Step 6 (5m): Expanded 4-Skills Review Exercises",
    "selfIntroPitch": {
      "title": "🎙️ Executive Self-Introduction Pitch to Teacher Lorraine Johns",
      "english": "Hello Teacher Lorraine! I am Hero Kun, currently serving as Deputy Head of Tendering at Central Cons, a leading construction contractor in Vietnam. In my role, I spearhead commercial and technical bids for major high-rise residential and commercial development projects. My primary responsibilities include managing Bill of Quantities (BOQ) takeoffs, leading tender negotiations with Clients, supervising cost control, and coordinating Value Engineering proposals. I am taking this 1:1 Preply course to elevate my international bidding presentation skills, master FIDIC contract terminology, and communicate with executive confidence as I prepare for the Head of Tendering role.",
      "vietnamese": "Xin chào cô Lorraine! Tôi là Hero Kun, hiện đang đảm nhiệm vị trí Phó phòng Đấu thầu tại Central Cons - nhà thầu xây dựng hàng đầu tại Việt Nam. Trong vai trò của mình, tôi chủ trì các gói thầu thương mại và kỹ thuật cho các dự án phát triển tòa nhà thương mại và nhà ở cao tầng lớn. Nhiệm vụ chính của tôi bao gồm quản lý bóc tách tiên lượng BOQ, dẫn dắt đàm phán thầu với Chủ đầu tư, giám sát kiểm soát chi phí và phối hợp các đề xuất Kỹ thuật giá trị. Tôi tham gia khóa học 1-kèm-1 trên Preply này nhằm nâng tầm kỹ năng thuyết trình đấu thầu quốc tế, làm chủ thuật ngữ hợp đồng FIDIC và giao tiếp với phong thái lãnh đạo tự tin khi chuẩn bị bước lên vị trí Trưởng phòng Đấu thầu."
    },
    "powerWords": [
      {
        "word": "Bid",
        "phonetic": "[bɪd]",
        "meaning": "Đề xuất / Hồ sơ chào giá dự thầu",
        "example": "Our company will submit a formal bid tomorrow for the main tower package."
      },
      {
        "word": "Tender",
        "phonetic": "[ˈten.dər]",
        "meaning": "Thông báo mời thầu chính thức từ CĐT",
        "example": "The government opened a public tender for the new highway construction."
      },
      {
        "word": "Proposal",
        "phonetic": "[prəˈpəʊ.zəl]",
        "meaning": "Hồ sơ đề xuất phương án & kỹ thuật",
        "example": "We prepared a comprehensive proposal outlining all technical details."
      },
      {
        "word": "Client",
        "phonetic": "[ˈklaɪ.ənt]",
        "meaning": "Chủ đầu tư / Khách hàng",
        "example": "The client asked for a competitive price and strict milestone schedule."
      },
      {
        "word": "Deadline",
        "phonetic": "[ˈded.laɪn]",
        "meaning": "Thời hạn chót nộp hồ sơ / hoàn thành",
        "example": "The submission deadline for the commercial bid is Friday at 5 PM."
      },
      {
        "word": "Contract",
        "phonetic": "[ˈkɒn.trækt]",
        "meaning": "Hợp đồng pháp lý giữa hai bên",
        "example": "Central Cons signed the contract after winning the high-rise tender."
      },
      {
        "word": "Technical Bid",
        "phonetic": "[ˈtek.nɪ.kəl bɪd]",
        "meaning": "Hồ sơ dự thầu Kỹ thuật (Biện pháp, Vật liệu, Safety)",
        "example": "Our technical bid explains our construction methods, safety plan, and experience."
      },
      {
        "word": "Financial Bid",
        "phonetic": "[faɪˈnæn.ʃəl bɪd]",
        "meaning": "Hồ sơ dự thầu Tài chính ($500,000 Total Cost & Payment Terms)",
        "example": "Our financial bid outlines the total project cost of $500,000 and payment terms."
      }
    ],
    "grammarFocus": [
      {
        "title": "1. Present Simple for Job Responsibilities",
        "rule": "Sử dụng động từ thì Hiện tại đơn để mô tả chức năng, vai trò hàng ngày tại Central Cons.",
        "formula": "Subject (I / Central Cons) + V(s/es) + Direct Object...",
        "example": "I spearhead commercial bids and supervise BOQ cost control at Central Cons."
      },
      {
        "title": "2. Polite Business Modals ('would like to' + V-bare)",
        "rule": "Sử dụng khi mở đầu đề xuất chính thức hoặc phát biểu trang trọng với CĐT.",
        "formula": "We would like to + V (submit / propose / present / outline)...",
        "example": "We would like to submit our formal bid for this high-rise project."
      },
      {
        "title": "3. Adjective + that-clause (Preply Lesson 01 Integration)",
        "rule": "Sử dụng sau các tính từ tự tin, hài lòng kèm mệnh đề hoàn chỉnh.",
        "formula": "Subject + Be + Adjective (confident/certain/pleased) + that + Clause",
        "example": "I am confident that Central Cons can meet the Friday deadline."
      }
    ],
    "bulletPoints": [
      {
        "en": "On behalf of Central Cons, I am honored to present our technical and financial proposal for this commercial landmark project.",
        "vi": "Đại diện Central Cons, tôi vinh hạnh trình bày hồ sơ đề xuất kỹ thuật và tài chính cho dự án biểu tượng thương mại này."
      },
      {
        "en": "Our company has over 15 years of proven high-rise construction experience and a 100% safety record.",
        "vi": "Công ty chúng tôi có hơn 15 năm kinh nghiệm thi công nhà cao tầng đã được chứng minh cùng thành tích an toàn 100%."
      },
      {
        "en": "We offer competitive pricing along with Value Engineering solutions that reduce structural costs without sacrificing quality.",
        "vi": "Chúng tôi đưa ra mức giá cạnh tranh cùng giải pháp Kỹ thuật giá trị giúp giảm chi phí phần thô mà không giảm chất lượng."
      },
      {
        "en": "We believe our proposal is strong, comprehensive, and fully aligned with the Client's vision and budget.",
        "vi": "Chúng tôi tin rằng hồ sơ của mình rất mạnh mẽ, toàn diện và hoàn toàn phù hợp với tầm nhìn và ngân sách CĐT."
      }
    ],
    "biddingProcessSteps": [
      {
        "step": "Step 1",
        "title": "Project Announcement & Tender Release",
        "desc": "Client issues RFP / Tender Dossier and invitation to prequalified bidders."
      },
      {
        "step": "Step 2",
        "title": "BOQ Takeoffs & Method Statement Preparation",
        "desc": "Pricing team estimates bill of quantities while engineering prepares method statements."
      },
      {
        "step": "Step 3",
        "title": "Technical & Commercial Bid Submission",
        "desc": "Submission of two-envelope proposal before official deadline."
      },
      {
        "step": "Step 4",
        "title": "Bid Evaluation, Defense Pitch & Award",
        "desc": "Technical defense, price leveling, final negotiations and contract award signing."
      }
    ],
    "anticipatedQA": [
      {
        "qEn": "What is the difference between a Technical Bid and a Financial Bid in construction?",
        "qVi": "Sự khác biệt giữa Hồ sơ Kỹ thuật và Hồ sơ Tài chính là gì?",
        "hint": "Technical Bid details methods and safety; Financial Bid details BOQ prices and payment schedules."
      },
      {
        "qEn": "Can you explain the 4 steps of the Construction Bidding Process?",
        "qVi": "Bạn có thể giải thích 4 bước của Quy trình Đấu thầu?",
        "hint": "1. Tender Release -> 2. BOQ & Methods Prep -> 3. Bid Submission -> 4. Defense Pitch & Award."
      }
    ],
    "challengeScenario": {
      "title": "Step 5 Role Play — Presenting Construction Bid to Client",
      "contextEn": "Lorraine acts as the Client Representative in a 1:1 meeting. You (Hero) must present Central Cons' technical and commercial bid using executive tone.",
      "contextVi": "Cô Lorraine đóng vai Đại diện CĐT trong buổi họp 1-kèm-1. Bạn (Hero) cần trình bày hồ sơ kỹ thuật và tài chính sử dụng phong thái lãnh đạo tự tin.",
      "task": "Use sentence frames: 'We would like to submit...', 'Our engineering team is confident that...', 'We guarantee zero budget overruns.'"
    },
    "reviewExercises": {
      "listeningEx": {
        "title": "🎧 Exercise 1: Listening & Key Term Selection",
        "audioPrompt": "Central Cons will submit our formal bid and technical proposal before the Friday deadline.",
        "options": [
          "bid",
          "proposal",
          "deadline"
        ]
      },
      "speakingEx": {
        "title": "🗣️ Exercise 2: Executive Pitch Reflex",
        "prompt": "I am Hero Kun, Deputy Head of Tendering at Central Cons. I spearhead commercial bids and lead tender negotiations."
      },
      "readingEx": {
        "title": "📖 Exercise 3: Reading Comprehension",
        "passage": "A construction proposal consists of two essential parts: the technical bid and the financial bid. The technical bid details execution methods, safety protocols, and company experience.",
        "question": "Which bid details safety protocols and execution methods?",
        "answer": "The Technical Bid"
      },
      "writingEx": {
        "title": "✍️ Exercise 4: Transmittal Email Sandbox",
        "template": "Dear Client Representative,\n\nI am Hero Kun, Deputy Head of Tendering at Central Cons. We are pleased to submit our formal tender proposal for your commercial tower project. Our engineering team is confident that we can satisfy all technical and milestone requirements.\n\nSincerely,\nHero Kun — Central Cons"
      }
    }
  },
  {
    "id": 2,
    "title": "Lesson 02: Technical Method Statements & Engineering Solutions",
    "topic": "Complex Underground, Top-Down Construction & Diaphragm Wall Engineering Pitch",
    "scheduleDate": "Friday, Aug 14, 2026 (22:00 - 22:50)",
    "status": "Tonight's Session (22:00 - 22:50)",
    "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965",
    "timePlan": "Step 1 (5m): Deep Basement Technical Pitch | Step 2 (10m): Engineering Power Words | Step 3 (10m): Passive Voice & Adjective+that Focus | Step 4 (10m): Top-Down Execution Sequence | Step 5 (10m): Geotechnical Defense Role Play | Step 6 (5m): 4-Skills Review Exercises",
    "selfIntroPitch": {
      "title": "🎙️ Technical Method Statement Pitch — Deep Basement Top-Down Execution",
      "english": "Good evening Teacher Lorraine! Tonight, I am pitching our comprehensive Technical Method Statement for a 4-level deep basement excavation in complex urban terrain, similar to our flagship project The Hallmark at Thu Thiem. We propose an 800mm reinforced diaphragm wall constructed with synthetic polymer slurry to eliminate soil displacement and protect adjacent structures. By deploying top-down construction with laser-aligned plunge king posts, Central Cons compresses the critical path schedule by 20 calendar days while maintaining 100% structural integrity and zero groundwater drawdown.",
      "vietnamese": "Chào cô Lorraine! Tối nay, tôi xin thuyết trình Thuyết minh Biện pháp Kỹ thuật thi công cho hố đào hầm sâu 4 tầng trong khu vực đô thị phức tạp, tương tự như dự án biểu tượng The Hallmark tại Thủ Thiêm của chúng tôi. Chúng tôi đề xuất tường vằn bê tông cốt thép dày 800mm thi công bằng dung dịch polymer để loại bỏ độ dịch chuyển nền đất và bảo vệ các công trình lân cận. Bằng cách áp dụng biện pháp thi công top-down kết hợp cột king post định vị laser, Central Cons rút ngắn tiến độ đường găng 20 ngày mà vẫn đảm bảo 100% an toàn kết cấu và không hạ mực nước ngầm."
    },
    "powerWords": [
      {
        "word": "Diaphragm wall",
        "phonetic": "[ˈdaɪ.ə.fræm wɔːl]",
        "meaning": "Tường vằn (tường chắn đất vĩnh cửu trong hố đào sâu)",
        "example": "Central Cons executes 800mm-thick diaphragm walls with polymer slurry to prevent ground settlement."
      },
      {
        "word": "Top-down construction",
        "phonetic": "[tɒp daʊn kənˈstrʌk.ʃən]",
        "meaning": "Biện pháp thi công hầm từ trên xuống kết hợp phần thân",
        "example": "We deploy top-down construction to compress the critical path schedule by 20 calendar days."
      },
      {
        "word": "Ground settlement",
        "phonetic": "[ɡraʊnd ˈset.əl.mənt]",
        "meaning": "Độ lún sụt nền đất xung quanh công trình",
        "example": "Real-time geotechnical sensors monitor ground settlement to protect adjacent historical buildings."
      },
      {
        "word": "King post",
        "phonetic": "[kɪŋ pəʊst]",
        "meaning": "Cột thép hình chữ H cắm vào cọc khoan nhồi đỡ sàn tạm",
        "example": "Plunge steel king posts are vertically aligned with laser precision into bored piles."
      },
      {
        "word": "Dewatering system",
        "phonetic": "[diːˈwɔː.tər.ɪŋ ˈsɪs.təm]",
        "meaning": "Hệ thống bơm hạ mực nước ngầm trong hố đào",
        "example": "A deep-well dewatering system maintains a dry and stable basement excavation pit."
      },
      {
        "word": "Structural integrity",
        "phonetic": "[ˈstrʌk.tʃər.əl ɪnˈteɡ.rə.ti]",
        "meaning": "Độ an toàn chịu lực và tính toàn vẹn của kết cấu",
        "example": "Our technical method statement strictly guarantees the structural integrity of the basement perimeter."
      },
      {
        "word": "Method statement",
        "phonetic": "[ˈmeθ.əd ˌsteɪt.mənt]",
        "meaning": "Thuyết minh biện pháp kỹ thuật thi công",
        "example": "The engineer approved our technical method statement for deep basement excavation without reservations."
      },
      {
        "word": "Deflection limit",
        "phonetic": "[dɪˈflek.ʃən ˈlɪm.ɪt]",
        "meaning": "Giới hạn độ võng và chuyển vị ngang cho phép",
        "example": "Lateral wall deflection is strictly kept within the 15mm design limit throughout all excavation stages."
      }
    ],
    "grammarFocus": [
      {
        "title": "1. Passive Voice in Technical Engineering Descriptions",
        "rule": "Dùng thể bị động để mô tả quy trình kỹ thuật khách quan, trang trọng và chuẩn mực quốc tế.",
        "formula": "Subject + Be + Past Participle (V3/ed) + by/with...",
        "example": "Diaphragm wall trenching is stabilized with synthetic polymer fluid rather than heavy bentonite."
      },
      {
        "title": "2. Adjective + that-clause (Preply Lesson 01 Feedback Reinforcement)",
        "rule": "Dùng sau các tính từ khẳng định (confident, certain, pleased) + mệnh đề hoàn chỉnh.",
        "formula": "Subject + Be + Adjective + that + Clause (Subject + Verb...)",
        "example": "Our engineering team is confident that top-down excavation will eliminate all perimeter soil movement."
      },
      {
        "title": "3. Conditional Type 1 for Geotechnical Risk Management",
        "rule": "Dùng câu điều kiện loại 1 để cam kết biện pháp xử lý sự cố kỹ thuật và phòng ngừa rủi ro.",
        "formula": "If + Present Simple, Future Simple (will / can + Verb)",
        "example": "If groundwater pressure rises beyond 5mm threshold, recharge wells will balance it immediately."
      }
    ],
    "bulletPoints": [
      {
        "en": "Our 4-level basement excavation adopts top-down methodology to shorten critical path by 20 days.",
        "vi": "Hố đào hầm 4 tầng của chúng tôi áp dụng phương pháp top-down để rút ngắn tiến độ đường găng 20 ngày."
      },
      {
        "en": "Continuous 800mm diaphragm walls eliminate soil displacement risks for surrounding urban roads.",
        "vi": "Tường vằn liên tục dày 800mm triệt tiêu rủi ro dịch chuyển nền đất cho các tuyến đường đô thị lân cận."
      },
      {
        "en": "Laser-aligned plunge king posts guarantee zero vertical eccentricity into bored piles.",
        "vi": "Cột king post định vị laser đảm bảo độ lệch tâm thẳng đứng bằng không khi cắm vào cọc khoan nhồi."
      },
      {
        "en": "Real-time piezometers and recharge wells maintain stable groundwater levels at all times.",
        "vi": "Cảm biến áp lực nước lỗ rỗng và giếng bổ cập duy trì mực nước ngầm luôn ổn định ở mọi thời điểm."
      }
    ],
    "biddingProcessSteps": [
      {
        "step": "Phase 1",
        "title": "Geotechnical Survey & Guide Wall Construction",
        "desc": "Soil investigation boreholes and reinforced concrete guide walls along basement perimeter."
      },
      {
        "step": "Phase 2",
        "title": "Diaphragm Wall Trenching & Polymer Slurry Support",
        "desc": "Hydraulic grab excavation supported with synthetic polymer to prevent trench collapse."
      },
      {
        "step": "Phase 3",
        "title": "Bored Pile & Laser-Guided King Post Installation",
        "desc": "Deep foundation drilling and precision vertical alignment of structural plunge columns."
      },
      {
        "step": "Phase 4",
        "title": "Ground Floor Slab Casting & Top-Down Excavation",
        "desc": "Casting L0 floor slab opening access hatches, proceeding downwards to B1-B4 while building tower."
      }
    ],
    "anticipatedQA": [
      {
        "qEn": "How does Central Cons guarantee that deep excavation will not cause cracking to adjacent historical buildings?",
        "qVi": "Central Cons làm thế nào để đảm bảo việc đào hầm sâu không gây nứt nẻ cho các công trình cổ kính xung quanh?",
        "hint": "Mention 800mm diaphragm wall stiffness, real-time inclinometers, and automated groundwater recharge wells."
      },
      {
        "qEn": "Why should the Client approve your top-down proposal instead of standard bottom-up with open strutting?",
        "qVi": "Tại sao Chủ đầu tư nên duyệt biện pháp top-down thay vì phương pháp bottom-up truyền thống dùng hệ giằng chống?",
        "hint": "Highlight concurrent superstructure & basement progress, 20 days schedule compression, and zero temporary steel strut costs."
      },
      {
        "qEn": "What contingency measures are in place if a diaphragm wall joint experiences water leakage during excavation?",
        "qVi": "Biện pháp dự phòng là gì nếu mối nối tường vằn bị rò rỉ nước trong lúc đào?",
        "hint": "Explain pre-installed CPT waterstop tubes and stand-by polyurethane chemical pressure grouting rigs on site."
      }
    ],
    "challengeScenario": {
      "title": "Geotechnical Defense Pitch vs Client Consultant",
      "contextEn": "The Client's Lead Geotechnical Consultant questions Central Cons' proposal to use polymer slurry instead of bentonite, fearing trench collapse in soft Thu Thiem clay.",
      "contextVi": "Tư vấn Trưởng Địa kỹ thuật của CĐT nghi ngờ đề xuất của Central Cons về việc dùng dung dịch polymer thay vì bentonite, lo ngại sập vách hố đào trong lớp đất sét yếu Thủ Thiêm.",
      "task": "Defend our polymer slurry proposal by demonstrating higher sand-settling efficiency, cleaner basement concrete interfaces, and zero trench collapse record at The Hallmark."
    },
    "reviewExercises": {
      "listeningEx": {
        "title": "🎧 Technical Dictation: Top-Down Method & Diaphragm Wall",
        "audioPrompt": "Central Cons executes continuous 800mm diaphragm walls using synthetic polymer slurry to eliminate ground settlement and preserve structural integrity.",
        "options": [
          "diaphragm walls",
          "ground settlement",
          "structural integrity"
        ]
      },
      "speakingEx": {
        "title": "🗣️ Geotechnical Defense Pitch",
        "prompt": "Explain in 45 seconds how Central Cons' top-down method compresses schedule by 20 days while protecting adjacent structures."
      },
      "readingEx": {
        "title": "📖 Technical Specification Analysis",
        "passage": "Clause 4.2: The Main Contractor shall install continuous diaphragm wall panels of minimum 800mm thickness. Slurry level shall be maintained at least 1.5m above maximum groundwater table at all times. Vertical deviation shall not exceed 1:200.",
        "question": "What is the maximum allowable vertical deviation for diaphragm wall panels under Clause 4.2?",
        "answer": "1:200 (0.5% vertical tolerance)"
      },
      "writingEx": {
        "title": "✍️ Technical Transmittal Letter to Client Consultant",
        "template": "Subject: Transmittal of Technical Method Statement for Deep Basement Excavation\n\nDear Lead Geotechnical Engineer,\n\nWe are pleased to submit Central Cons' comprehensive Technical Method Statement for the 4-level basement excavation at LOTTE Eco-Smart City. Our proposed 800mm diaphragm wall and top-down sequence strictly adhere to BS 8081 and guarantee zero ground settlement to adjacent structures.\n\nWe remain confident that this engineering approach offers the optimal balance of safety, cost efficiency, and schedule acceleration.\n\nSincerely,\nHero Kun — Head of Estimating & Pricing Division, Central Cons"
      }
    }
  },
  {
    "id": 3,
    "title": "Lesson 03: Commercial Strategy & BOQ Unit Rate Breakdown",
    "topic": "Defending Unit Rates, Overhead Margins & Provisional Sums",
    "scheduleDate": "Monday, Aug 17, 2026 (22:00 - 22:50)",
    "status": "Scheduled",
    "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965"
  },
  {
    "id": 4,
    "title": "Lesson 04: FIDIC Contract Clauses & Risk Allocation",
    "topic": "FIDIC Price Adjustments (Clause 13.8) & EOT Claims (Clause 8.4)",
    "scheduleDate": "Friday, Aug 21, 2026 (22:00 - 22:50)",
    "status": "Scheduled",
    "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965"
  },
  {
    "id": 5,
    "title": "Lesson 05: Subcontractor Procurement & Supply Chain Strategy",
    "topic": "Tier-1 Subcontractor Prequalification & Long-Lead Items",
    "scheduleDate": "Monday, Aug 24, 2026 (22:00 - 22:50)",
    "status": "Scheduled",
    "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965"
  },
  {
    "id": 6,
    "title": "Lesson 06: Value Engineering (VE) & Cost Optimization Proposals",
    "topic": "Pitching CAPEX & OPEX Savings to Client Board",
    "scheduleDate": "Friday, Aug 28, 2026 (22:00 - 22:50)",
    "status": "Scheduled",
    "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965"
  },
  {
    "id": 7,
    "title": "Lesson 07: Project Fast-Tracking & CPM Schedule Presentation",
    "topic": "Critical Path Method (CPM) & Milestone Commitments",
    "scheduleDate": "Monday, Aug 31, 2026 (22:00 - 22:50)",
    "status": "Scheduled",
    "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965"
  },
  {
    "id": 8,
    "title": "Lesson 08: High-Pressure Post-Tender Q&A & Winning Pitch Closing",
    "topic": "Objection Handling, Final Alignment & Contract Award Closing",
    "scheduleDate": "Friday, Sep 04, 2026 (22:00 - 22:50)",
    "status": "Scheduled",
    "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965"
  }
];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

  try {
    const liveUrl = DOC_TXT_URL + "&t=" + Date.now();
    const docRes = await fetch(liveUrl);
    if (docRes.ok) {
      const rawText = await docRes.text();
      const parsed = JSON.parse(rawText);
      let lessons = [];
      if (Array.isArray(parsed)) lessons = parsed;
      else if (parsed && parsed.lessons) lessons = parsed.lessons;
      if (lessons.length > 0) return res.status(200).json(lessons);
    }
  } catch (e) {
    console.error("Live fetch failed, serving fallback:", e.message);
  }
  return res.status(200).json(fallbackLessons);
};
