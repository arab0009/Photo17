import express from "express";
import fetch from "node-fetch";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// بيانات بوت Telegram (اختياري)
const BOT_TOKEN = "YOUR_BOT_TOKEN";
const CHAT_ID = "YOUR_CHAT_ID";

async function sendToTelegram(message) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
  });
}

app.get("/good_morning.jpg", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  // إرسال إخطار للتيليجرام (اختياري)
  await sendToTelegram(`زيارة جديدة - IP: ${ip}`);

  res.set("Content-Type", "image/jpeg");
  res.sendFile(path.join(process.cwd(), "good_morning.jpg"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
