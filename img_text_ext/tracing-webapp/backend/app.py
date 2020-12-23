from flask import Flask, url_for, request, render_template, jsonify
import json
import os
app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])
def index():
    if(request.method == "POST"):
        # print(request.json)
        with open("static/jsons/output.json", "w") as f:
            json.dump(request.json, f, indent=6)
        return 'done'
    else:
        return render_template("html/tracer.html")

if __name__ == "__main__":
    app.run()