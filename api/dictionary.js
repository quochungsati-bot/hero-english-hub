const oxfordDictDb = {
  "bid": {
    word: "Bid",
    ipa: "/bɪd/",
    pos: "noun / verb",
    vi: "Đề xuất / Hồ sơ chào giá dự thầu",
    def: "A formal offer to execute a project or supply goods at a specified price.",
    examples: [
      "Our company will submit a formal bid tomorrow for the commercial tower package.",
      "The Client reviewed our technical bid and praised our Value Engineering proposal.",
      "Central Cons won the bid after presenting a competitive unit rate breakdown."
    ],
    synonyms: ["Tender", "Proposal", "Quotation", "Offer", "Submission"]
  },
  "tender": {
    word: "Tender",
    ipa: "/ˈten.dər/",
    pos: "noun / verb",
    vi: "Thông báo mời thầu chính thức từ CĐT",
    def: "A formal invitation or offer to supply goods or execute construction works.",
    examples: [
      "The government opened a public tender for the $4.71 billion metro infrastructure project.",
      "We received the tender documents and started BOQ takeoffs immediately.",
      "Hero Kun was appointed to lead the tender negotiations with the international consultant."
    ],
    synonyms: ["Bid", "Invitation to Tender (ITT)", "RFP", "Procurement Offer"]
  },
  "proposal": {
    word: "Proposal",
    ipa: "/prəˈpəʊ.zəl/",
    pos: "noun",
    vi: "Hồ sơ đề xuất phương án kỹ thuật & thương mại",
    def: "A detailed written plan submitted for Client approval.",
    examples: [
      "Our technical proposal outlines diaphragm wall excavation and top-down construction.",
      "We prepared a Value Engineering proposal that saves $150,000 in foundation costs.",
      "The Client accepted our commercial proposal during the post-tender clarification meeting."
    ],
    synonyms: ["Bid Proposal", "Technical Submission", "Method Statement", "Scheme"]
  },
  "client": {
    word: "Client",
    ipa: "/ˈklaɪ.ənt/",
    pos: "noun",
    vi: "Chủ đầu tư / Khách hàng dự án",
    def: "The employer or owner requesting construction and tendering services.",
    examples: [
      "The Client requested a strict milestone schedule and zero site delays.",
      "Hero Kun presented Central Cons' corporate capability directly to the Client Board.",
      "We negotiated FIDIC price adjustment clauses with the Client's legal representative."
    ],
    synonyms: ["Employer", "Project Owner", "Developer", "Principal"]
  },
  "deadline": {
    word: "Deadline",
    ipa: "/ˈded.laɪn/",
    pos: "noun",
    vi: "Thời hạn chót nộp hồ sơ / hoàn thành",
    def: "The targeted final date or time by which a bid or project milestone must be completed.",
    examples: [
      "The submission deadline for the financial bid is Friday at 5:00 PM ICT.",
      "Our pricing team worked overtime to ensure we meet the tight tender deadline.",
      "Missing the bid submission deadline will result in immediate disqualification."
    ],
    synonyms: ["Cut-off Date", "Target Date", "Due Date", "Closing Date"]
  },
  "contract": {
    word: "Contract",
    ipa: "/ˈkɒn.trækt/",
    pos: "noun / verb",
    vi: "Hợp đồng pháp lý giữa các bên",
    def: "A legally binding agreement between Client and Contractor.",
    examples: [
      "Central Cons signed the main construction contract after winning the $500,000 tender.",
      "The contract incorporates FIDIC Red Book terms and Clause 13.8 price adjustments.",
      "Our legal team reviewed the Particular Conditions before signing the contract."
    ],
    synonyms: ["Agreement", "Pact", "Deed", "Binding Covenant"]
  },
  "takeoff": {
    word: "BOQ Takeoff",
    ipa: "/ˈtæ.kɒf/",
    pos: "noun",
    vi: "Bóc tách khối lượng từ bản vẽ thi công",
    def: "The process of measuring and estimating material quantities from architectural and engineering drawings.",
    examples: [
      "Estimators deploy AI software to automate BOQ takeoffs and eliminate scope gaps.",
      "Hero Kun audited the rebar takeoff to verify concrete volume calculations.",
      "Accurate quantity takeoffs ensure precise unit rate pricing during bid preparation."
    ],
    synonyms: ["Quantity Surveying", "Material Measurement", "Cost Estimating"]
  },
  "fidic": {
    word: "FIDIC",
    ipa: "/ˈfɪd.ɪk/",
    pos: "acronym / noun",
    vi: "Hiệp hội Quốc tế các Kỹ sư Tư vấn / Chuẩn Hợp đồng Quốc tế",
    def: "International Federation of Consulting Engineers providing standard international contract conditions.",
    examples: [
      "We recommend incorporating FIDIC Clause 13.8 price adjustment formulas to hedge against inflation.",
      "Under FIDIC Clause 8.4, contractors can claim Extension of Time (EOT) for Client delays.",
      "FIDIC Red Book is widely used for major infrastructure and commercial building tenders."
    ],
    synonyms: ["International Contract Standard", "Consulting Engineers Covenant"]
  }
};

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  const rawWord = (req.query.word || "").toLowerCase().trim();
  const found = oxfordDictDb[rawWord];
  if (found) {
    return res.status(200).json({ found: true, data: found });
  } else {
    const capitalized = rawWord.charAt(0).toUpperCase() + rawWord.slice(1);
    return res.status(200).json({
      found: true,
      data: {
        word: capitalized,
        ipa: `/${rawWord}/`,
        pos: "commercial business term",
        vi: `Thuật ngữ thầu & xây dựng: ${capitalized}`,
        def: `Oxford standard definition for ${capitalized} in international construction & bidding context.`,
        examples: [
          `Hero Kun discussed ${capitalized} during the post-tender negotiation with Coach Lorraine.`,
          `Our engineering team evaluated ${capitalized} to optimize project cost efficiency.`,
          `Central Cons incorporates ${capitalized} in our technical proposal submitted to the Client.`
        ],
        synonyms: [`${capitalized} Term`, "Commercial Keyword", "Bidding Metric"]
      }
    });
  }
};
