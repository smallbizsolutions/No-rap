# Vapi Backend (Express + Railway)

This is a simple Express server designed to work with Vapi’s custom tool system.  
It listens for POST requests from your Vapi assistant and returns short answers from a built-in knowledge base.

---

### 🔧 Endpoints
#### `POST /tool`
Input:
```json
{ "query": "What are your hours?" }
