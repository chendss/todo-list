import json
from tools import rand_string
from store import globalStore
from flask import Blueprint, request
from public import api_factory, err_factory
from DB import commit, search_data, insert_data

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
    globalStore.user_dict[user] = token
    print('更新token', globalStore.user_dict)
    return api_factory(token)


@user_info_api.route('/register', methods=['POST'])
def register():
    api_param = request.get_json()
    user = api_param.get('user')
    pwd = api_param.get('pwd')
    db_value = search_data('user', {'user': user})
    if db_value == None:
        insert_data('user', {
            'id': rand_string(64),
            'user': user,
            'pwd': pwd
        })
        token = rand_string(64)
        commit()
        return api_factory(token)
    else:
        return err_factory({'msg': '该用户已存在'})
