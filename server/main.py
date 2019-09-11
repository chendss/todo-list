import json
import time
import datetime
import subprocess
import time
import threading
from flask_cors import *
from login import login_api
from flask import Flask, redirect, abort, make_response, jsonify, send_file, request

app = Flask(__name__)
CORS(app, supports_credentials=True)
CORS(app, resources=r'/*')

app.register_blueprint(login_api)


@app.route('/', methods=['GET'])
def index():
    request.headers
    return redirect('https://www.baidu.com')


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=6382,
        debug=True
    )
