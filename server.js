import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🗂️ Simple built-in knowledge base
const knowledgeBase = {
  hours: "We’re open Monday through Saturday from 7 AM to 6 PM.",
  location: "We’re located at 123 Main Street, Saline, Michigan.",
  glutenfree: "Yes! We offer gluten-free cupcakes and bread.",
  contact: "You can reach us at (734) 555-1212.",
  owner: "Our owner is Austin, who started the business in 2025."
};

// 🚀 POST /tool — endpoint that Vapi calls
app.post("/tool", async (req, res) => {
  const { query } = req.body || {};
  console.log("Incoming query:", query);

  let answer = "I'm not sure, but I can connect you to someone who knows.";

  if (!query) {
    return res.json({ answer });
  }

  const lower = query.toLowerCase();

  if (lower.includes("hour")) answer = knowledgeBase.hours;
  else if (lower.includes("where") || lower.includes("address") || lower.includes("located"))
    answer = knowledgeBase.location;
  else if (lower.includes("gluten")) answer = knowledgeBase.glutenfree;
  else if (lower.includes("contact") || lower.includes("phone") || lower.includes("number"))
    answer = knowledgeBase.contact;
  else if (lower.includes("owner")) answer = knowledgeBase.owner;

  res.json({ answer });
});

// Health check
app.get("/", (req, res) => res.send("✅ Vapi backend running"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
