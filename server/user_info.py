import json
from tools import rand_string
from store import globalStore
from flask import Blueprint, request
from public import api_factory, err_factory

user_info_api = Blueprint('user_info_api', __name__)


@user_info_api.route('/login', methods=['POST'])
def login():
    api_param = request.get_json()
    user = api_param.get('user')
    pwd = api_param.get('pwd')
    if pwd == None or user == None:
        resp = err_factory('用户名或密码不能为空')
        return resp
    token = rand_string(64)
    globalStore.user_info_list.append({
        user: user,
        token: token
    })
    print('更新token', globalStore.user_info_list)
    return api_factory(token)


@user_info_api.route('/register', methods=['POST'])
def register():
    api_param = request.get_json()
    user = api_param.get('user')
    pwd = api_param.get('pwd')
    if pwd == None or user == None:
        resp = err_factory('用户名或密码不能为空')
        return resp
    return api_factory('注册成功')
