import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🧠 Simple internal knowledge base
const knowledgeBase = {
  hours: "Our business hours are Monday through Friday, from 9 AM to 5 PM.",
  location: "We’re located at 123 Main Street, Saline, Michigan.",
  glutenfree: "Yes! We offer gluten-free cupcakes and bread.",
  contact: "You can reach us at (734) 555-1212.",
  owner: "Our owner is Austin, who started the business in 2025."
};

// 🧩 Helper function for fuzzy query matching
function matchQuery(text = "") {
  const q = text.toLowerCase();

  if (q.includes("hour") || q.includes("open") || q.includes("close"))
    return knowledgeBase.hours;

  if (q.includes("where") || q.includes("address") || q.includes("located"))
    return knowledgeBase.location;

  if (q.includes("gluten") || q.includes("celiac"))
    return knowledgeBase.glutenfree;

  if (q.includes("contact") || q.includes("phone") || q.includes("number"))
    return knowledgeBase.contact;

  if (q.includes("owner") || q.includes("who runs") || q.includes("who started"))
    return knowledgeBase.owner;

  return "I'm not sure about that one, but I can connect you to someone who knows.";
}

// 🚀 POST /tool — endpoint for Vapi
app.post("/tool", (req, res) => {
  console.log("📦 Body received:", req.body);
  console.log("📞 Query received:", req.query);

  // Accept query from either body or query params
  const query = req.body.query || req.query.query;
  console.log("✅ Final query:", query);

  if (!query) {
    return res.status(400).json({ error: "No query received" });
  }

  const answer = matchQuery(query);
  console.log("🎯 Answer:", answer);

  res.json({ answer });
});

// 🩺 Health check
app.get("/", (req, res) => res.send("✅ Vapi backend is running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
