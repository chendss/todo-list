from flask import Blueprint, request, make_response
from public import api_factory, err_factory
import json

login_api = Blueprint('login_api', __name__)


@login_api.route('/login', methods=['POST'])
def login():
    api_param = request.get_json()
    user = api_param.get('user')
    pwd = api_param.get('pwd')
    if pwd == None or user == None:
        resp = make_response()
        resp.status = '403'
        resp.response = err_factory('用户名或密码不能为空')
        return resp
    return api_factory('登录成功')
