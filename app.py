from flask import Flask, request, send_file, render_template
import datetime

app = Flask(__name__)

@app.route("/")
def index():
    # تسجيل IP
    user_ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    with open("ips.txt", "a") as f:
        f.write(f"{datetime.datetime.now()} - {user_ip}\n")
    
    # إظهار صفحة فيها صورة
    return render_template("index.html")

@app.route("/image")
def image():
    return send_file("static/morning.jpg", mimetype="image/jpeg")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
