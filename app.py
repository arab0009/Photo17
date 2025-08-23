from flask import Flask, request, send_file
import datetime

app = Flask(__name__)

@app.route('/')
def serve_image():
    # الحصول على IP الزائر
    visitor_ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    user_agent = request.headers.get('User-Agent', 'Unknown')

    # حفظ المعلومات في ملف ips.txt
    with open("ips.txt", "a") as f:
        f.write(f"{datetime.datetime.now()} - IP: {visitor_ip} - UA: {user_agent}\n")

    # إرسال صورة صباح الخير
    return send_file("static/sabah.jpg", mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
