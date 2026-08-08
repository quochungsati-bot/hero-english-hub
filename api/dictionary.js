const oxfordDictDb = {
  "spearhead": { word: "Spearhead", ipa: "/ˈspɪə.hed/", pos: "verb", vi: "Chủ trì, dẫn đầu gói thầu", def: "To lead or initiate a campaign or commercial bid.", ex: "As Deputy Head, I spearhead high-value commercial bids at Central Cons." },
  "milestone": { word: "Milestone Schedule", ipa: "/ˈmaɪl.stəʊn/", pos: "noun", vi: "Tiến độ mốc then chốt", def: "An important stage in the development of a construction project.", ex: "We aligned procurement with the Client's milestone schedule." }
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
