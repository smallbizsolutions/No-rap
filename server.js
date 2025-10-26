import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// TEMP: Hardcoded business data
const knowledgeBase = {
  hours: "We’re open Monday through Saturday from 7 AM to 6 PM.",
  location: "We’re located at 123 Main Street, Saline, Michigan.",
  glutenfree: "Yes! We offer gluten-free cupcakes and bread."
};

function matchQuery(text = "") {
  const q = text.toLowerCase();
  if (q.includes("hour") || q.includes("open") || q.includes("closing"))
    return knowledgeBase.hours;
  if (q.includes("where") || q.includes("address") || q.includes("located"))
    return knowledgeBase.location;
  if (q.includes("gluten")) return knowledgeBase.glutenfree;
  return "I'm not sure. Would you like me to transfer you?";
}

app.post("/tool", (req, res) => {
  console.log("Incoming Vapi body:", req.body);

  const query = req.body?.query ?? "";
  const answer = matchQuery(query);

  res.json({ answer });
});

// Health check
app.get("/", (_, res) => res.send("✅ Vapi backend running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
