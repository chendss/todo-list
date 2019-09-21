import json
import time
import time
import datetime
import threading
import subprocess
from flask_cors import CORS
from DB import create_table
from user_info import user_info_api
from flask import Flask, redirect, abort, make_response, jsonify, send_file, request

app = Flask(__name__)
CORS(app, supports_credentials=True)
CORS(app, resources=r'/*')

app.register_blueprint(user_info_api)


def mian():
    create_table('user', 'id-id,user,pwd,name')
    # create_table('log', 'id-id,user_id,pwd')


if __name__ == '__main__':
    mian()
    app.run(
        host='0.0.0.0',
        port=6382,
        debug=True
    )
