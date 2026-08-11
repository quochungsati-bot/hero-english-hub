const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const masterLessons = [{"id": 1, "title": "Lesson 01: Introduction to Bidding & Executive Pitch", "topic": "Executive Self-Introduction, Bidding Process & Technical vs Financial Bids", "scheduleDate": "Monday, Aug 10, 2026 (22:00 - 22:50)", "status": "Completed (Đã hoàn thành)", "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965"}, {"id": 2, "title": "Lesson 02: Technical Method Statements & Engineering Solutions", "topic": "Complex Underground & Diaphragm Wall Engineering Pitch", "scheduleDate": "Friday, Aug 14, 2026 (22:00 - 22:50)", "status": "Next Session (Sắp diễn ra)", "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965"}, {"id": 3, "title": "Lesson 03: Commercial Strategy & BOQ Unit Rate Breakdown", "topic": "Defending Unit Rates, Overhead Margins & Provisional Sums", "scheduleDate": "Monday, Aug 17, 2026 (22:00 - 22:50)", "status": "Scheduled (Đã lên lịch)", "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965"}, {"id": 4, "title": "Lesson 04: FIDIC Contract Clauses & Risk Allocation", "topic": "FIDIC Price Adjustments (Clause 13.8) & EOT Claims (Clause 8.4)", "scheduleDate": "Friday, Aug 21, 2026 (22:00 - 22:50)", "status": "Scheduled (Đã lên lịch)", "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965"}, {"id": 5, "title": "Lesson 05: Subcontractor Procurement & Supply Chain Strategy", "topic": "Tier-1 Subcontractor Prequalification & Long-Lead Items", "scheduleDate": "Monday, Aug 24, 2026 (22:00 - 22:50)", "status": "Scheduled (Đã lên lịch)", "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965"}, {"id": 6, "title": "Lesson 06: Value Engineering (VE) & Cost Optimization Proposals", "topic": "Pitching CAPEX & OPEX Savings to Client Board", "scheduleDate": "Friday, Aug 28, 2026 (22:00 - 22:50)", "status": "Scheduled (Đã lên lịch)", "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965"}, {"id": 7, "title": "Lesson 07: Project Fast-Tracking & CPM Schedule Presentation", "topic": "Critical Path Method (CPM) & Milestone Commitments", "scheduleDate": "Monday, Aug 31, 2026 (22:00 - 22:50)", "status": "Scheduled (Đã lên lịch)", "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965"}, {"id": 8, "title": "Lesson 08: High-Pressure Post-Tender Q&A & Winning Pitch Closing", "topic": "Objection Handling, Final Alignment & Contract Award Closing", "scheduleDate": "Friday, Sep 04, 2026 (22:00 - 22:50)", "status": "Scheduled (Đã lên lịch)", "preplyClassUrl": "https://preply.com/edu/english/classroom-v2/10523965"}];

app.get('/api/lessons', (req, res) => res.json(masterLessons));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}

module.exports = app;
