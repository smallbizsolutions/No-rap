import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🧠 Simple internal knowledge base
const knowledgeBase = {
  hours: "We’re open Monday through Saturday from 7 AM to 6 PM.",
  location: "We’re located at 123 Main Street, Saline, Michigan.",
  glutenfree: "Yes! We offer gluten-free cupcakes and bread.",
  contact: "You can reach us at (734) 555-1212.",
  owner: "Our owner is Austin, who started the business in 2025."
};

// 🧩 Helper function: fuzzy text match
function matchQuery(text = "") {
  const q = text.toLowerCase();

  // Hours
  if (
    q.includes("hour") ||
    q.includes("open") ||
    q.includes("closing") ||
    q.includes("time")
  )
    return knowledgeBase.hours;

  // Location
  if (
    q.includes("where") ||
    q.includes("address") ||
    q.includes("located") ||
    q.includes("place")
  )
    return knowledgeBase.location;

  // Gluten-free
  if (q.includes("gluten") || q.includes("celiac"))
    return knowledgeBase.glutenfree;

  // Contact
  if (q.includes("contact") || q.includes("phone") || q.includes("number"))
    return knowledgeBase.contact;

  // Owner
  if (q.includes("owner") || q.includes("who runs") || q.includes("who started"))
    return knowledgeBase.owner;

  // Nothing matched
  return "I'm not sure about that one, but I can connect you to someone who knows.";
}

// 🚀 POST /tool — endpoint Vapi calls
app.post("/tool", async (req, res) => {
  // Handle both plain and nested request formats
  const query = req.body?.query || req.body?.parameters?.query;
  console.log("📞 Live call received from Vapi at", new Date().toISOString());
  console.log("💬 Incoming query:", query);

  if (!query) {
    console.log("⚠️ No query received from Vapi request body:", req.body);
    return res.json({
      answer: "I didn’t quite catch that. Could you repeat your question?"
    });
  }

  const answer = matchQuery(query);
  console.log("🧠 Responding with:", answer);
  res.json({ answer });
});

// Health check route
app.get("/", (req, res) => res.send("✅ Vapi backend running"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
