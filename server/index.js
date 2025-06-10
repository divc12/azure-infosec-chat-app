// server/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

/**
 * POST /api/chat
 *   Body: { appId: string, appName: string, message: string }
 *   Returns: { reply: string }
 */
app.post('/api/chat', async (req, res) => {
  const { appId, appName, message } = req.body;

  // For now, just echo back. In a real app, plug in OpenAI or another LLM here.
  const replyText = `🤖 [app ${appId} ${appName}] You said: "${message}"`;

  // Simulate a short delay to mimic real processing time
  await new Promise((r) => setTimeout(r, 500));

  res.json({ reply: replyText });
});

// Start on port 4000
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Chat backend listening on http://localhost:${PORT}`);
});
