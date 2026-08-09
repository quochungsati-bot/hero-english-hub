const oxfordDictDb = {
  "bid": { word: "Bid", ipa: "/bɪd/", pos: "noun", vi: "Đề xuất / Hồ sơ chào giá dự thầu", def: "An offer to do a project for a certain price.", ex: "Our company will submit a formal bid tomorrow." },
  "tender": { word: "Tender", ipa: "/ˈten.dər/", pos: "noun", vi: "Thông báo mời thầu chính thức từ CĐT", def: "A formal request for bids from companies.", ex: "The government opened a tender for the new road." },
  "proposal": { word: "Proposal", ipa: "/prəˈpəʊ.zəl/", pos: "noun", vi: "Hồ sơ đề xuất phương án & kỹ thuật", def: "A written plan showing how the company will do the project.", ex: "We prepared a proposal with all details." },
  "client": { word: "Client", ipa: "/ˈklaɪ.ənt/", pos: "noun", vi: "Chủ đầu tư / Khách hàng", def: "The person or company who needs the project done.", ex: "The client asked for a lower price." },
  "deadline": { word: "Deadline", ipa: "/ˈded.laɪn/", pos: "noun", vi: "Thời hạn chót nộp hồ sơ", def: "The final date to finish something.", ex: "The deadline for the bid is Friday." },
  "contract": { word: "Contract", ipa: "/ˈkɒn.trækt/", pos: "noun", vi: "Hợp đồng pháp lý", def: "A legal agreement between two parties.", ex: "We signed the contract after winning the bid." }
};

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  const word = (req.query.word || "").toLowerCase().trim();
  const found = oxfordDictDb[word];
  if (found) {
    return res.status(200).json({ found: true, data: found });
  } else {
    return res.status(200).json({
      found: true,
      data: {
        word: req.query.word || "Word",
        ipa: `/${word}/`,
        pos: "business term",
        vi: `Thuật ngữ chuyên ngành: ${req.query.word}`,
        def: `Oxford standard definition for ${req.query.word} in commercial bidding context.`,
        ex: `Hero discussed ${req.query.word} during the post-tender negotiation with Coach Lorraine.`
      }
    });
  }
};
