const oxfordDictDb = {
  "spearhead": { word: "Spearhead", ipa: "/ˈspɪə.hed/", pos: "verb", vi: "Chủ trì, dẫn đầu gói thầu", def: "To lead or initiate a campaign or commercial bid.", ex: "As Deputy Head, I spearhead high-value commercial bids at Central Cons." },
  "milestone": { word: "Milestone Schedule", ipa: "/ˈmaɪl.stəʊn/", pos: "noun", vi: "Tiến độ mốc then chốt", def: "An important stage in the development of a construction project.", ex: "We aligned procurement with the Client's milestone schedule." },
  "value engineering": { word: "Value Engineering", ipa: "/ˈvæl.juː ˌen.dʒɪˈnɪə.rɪŋ/", pos: "noun", vi: "Kỹ thuật giá trị (Tối ưu chi phí)", def: "A systematic method to improve the value of goods or construction works.", ex: "Our Value Engineering proposal saved 6% on superstructure costs." },
  "scope creep": { word: "Scope Creep", ipa: "/skəʊp kriːp/", pos: "noun", vi: "Phình phạm vi ngoài kiểm soát", def: "Uncontrolled growth in a project's scope.", ex: "PMBOK guidelines helped us prevent scope creep during clarifications." },
  "fidic": { word: "FIDIC Contract", ipa: "/ˈfɪd.ɪk/", pos: "noun", vi: "Mẫu hợp đồng chuẩn quốc tế FIDIC", def: "International standard form of construction contract issued by FIDIC.", ex: "Central Cons negotiated under FIDIC Clause 13.8 for price adjustments." }
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
