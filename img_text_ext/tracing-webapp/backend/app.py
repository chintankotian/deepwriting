from flask import Flask, url_for, request, render_template, jsonify
import json
import os
app = Flask(__name__)

@app.route('/<imgNo>', methods=['POST', 'GET'])
def index(imgNo):
    if(request.method == "POST"):
        # print(request.json)
        data = request.form
        with open("static/jsons/"+data['name']+".json", "w") as f:
            json.dump(json.loads(data['data']), f, indent=6)
        return 'done'
    else:
        print(imgNo)
        data = {
                'img' : "binarized_img/"+imgNo+".png",
                "no"  : imgNo
               }
        return render_template("html/tracer.html", data = data)

if __name__ == "__main__":
    app.run()