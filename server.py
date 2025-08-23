from flask import Flask, request, send_from_directory, render_template
import datetime

app = Flask(__name__)

# صفحة رئيسية تعرض صورة فقط
@app.route('/')
def index():
    return render_template("index.html")

# صفحة مزيفة
@app.route('/fake')
def fake():
    ip = request.remote_addr
    with open("ips.txt", "a") as f:
        f.write(f"{ip} - {datetime.datetime.now()}\n")
    return render_template("fake.html")

# عرض الصورة مباشرة
@app.route('/image/<path:filename>')
def image(filename):
    return send_from_directory("static", filename)

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
