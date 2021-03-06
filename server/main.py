from icon import icon_api
from flask_cors import CORS
from DB import create_table
from log_control import log_api
from list_control import list_api
from user_info import user_info_api
from flask import Flask, redirect, abort, make_response, jsonify, send_file, request

app = Flask(__name__)
CORS(app, supports_credentials=True)
CORS(app, resources=r'/*')

app.register_blueprint(user_info_api)
app.register_blueprint(list_api)
app.register_blueprint(log_api)
app.register_blueprint(icon_api)


def mian():
    create_table('user', 'id-id,user,pwd,name,avatar,token')
    create_table('list', 'id-id,name,user_id,type,icon')
    create_table(
        'log', 'id-id,user_id,list_id,remarks,content,collection,start_time,end_time,status,titps_time,repeat_time')


if __name__ == '__main__':
    mian()
    app.run(
        host='0.0.0.0',
        port=6382,
        debug=True
    )
