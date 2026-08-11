const fetch = require('node-fetch');
const DOC_TXT_URL = "https://docs.google.com/document/d/1vAs8b0xp_Yo60C0NsbN-nLU42uUsj6PqOzm2wktTOs0/export?format=txt";
const fallbackLessons = [{"id": 1, "title": "Lesson 01: Introduction to Bidding & Executive Pitch", "topic": "Executive Self-Introduction, Bidding Process & Technical vs Financial Bids", "scheduleDate": "Monday, Aug 10, 2026 (22:00 - 22:50)", "status": "Completed (Đã hoàn thành)", "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965"}, {"id": 2, "title": "Lesson 02: Technical Method Statements & Engineering Solutions", "topic": "Complex Underground & Diaphragm Wall Engineering Pitch", "scheduleDate": "Friday, Aug 14, 2026 (22:00 - 22:50)", "status": "Next Session (Sắp diễn ra)", "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965"}, {"id": 3, "title": "Lesson 03: Commercial Strategy & BOQ Unit Rate Breakdown", "topic": "Defending Unit Rates, Overhead Margins & Provisional Sums", "scheduleDate": "Monday, Aug 17, 2026 (22:00 - 22:50)", "status": "Scheduled (Đã lên lịch)", "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965"}, {"id": 4, "title": "Lesson 04: FIDIC Contract Clauses & Risk Allocation", "topic": "FIDIC Price Adjustments (Clause 13.8) & EOT Claims (Clause 8.4)", "scheduleDate": "Friday, Aug 21, 2026 (22:00 - 22:50)", "status": "Scheduled (Đã lên lịch)", "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965"}, {"id": 5, "title": "Lesson 05: Subcontractor Procurement & Supply Chain Strategy", "topic": "Tier-1 Subcontractor Prequalification & Long-Lead Items", "scheduleDate": "Monday, Aug 24, 2026 (22:00 - 22:50)", "status": "Scheduled (Đã lên lịch)", "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965"}, {"id": 6, "title": "Lesson 06: Value Engineering (VE) & Cost Optimization Proposals", "topic": "Pitching CAPEX & OPEX Savings to Client Board", "scheduleDate": "Friday, Aug 28, 2026 (22:00 - 22:50)", "status": "Scheduled (Đã lên lịch)", "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965"}, {"id": 7, "title": "Lesson 07: Project Fast-Tracking & CPM Schedule Presentation", "topic": "Critical Path Method (CPM) & Milestone Commitments", "scheduleDate": "Monday, Aug 31, 2026 (22:00 - 22:50)", "status": "Scheduled (Đã lên lịch)", "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965"}, {"id": 8, "title": "Lesson 08: High-Pressure Post-Tender Q&A & Winning Pitch Closing", "topic": "Objection Handling, Final Alignment & Contract Award Closing", "scheduleDate": "Friday, Sep 04, 2026 (22:00 - 22:50)", "status": "Scheduled (Đã lên lịch)", "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965"}];

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
