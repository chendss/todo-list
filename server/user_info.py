import json
from tools import rand_string
from flask import Blueprint, request
from DB import commit, search_data, insert_data
from public import api_factory, err_factory, set_token, update_data, is_login

user_info_api = Blueprint('user_info_api', __name__)


@user_info_api.route('/login', methods=['POST'])
def login():
    api_param = request.get_json()
    user = api_param.get('user')
    pwd = api_param.get('pwd')
    db_value = search_data('user', {'user': user})
    if db_value == None or db_value['pwd'] != pwd:
        return err_factory('用户名或者密码错误', None, 403)
    else:
        token = rand_string(64)
        set_token(user, token)
        commit()
        print('更新token', user, token)
        return api_factory(token, 'Login')


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
        set_token(user, token)
        commit()
        return api_factory(token, 'Login')
    else:
        return err_factory('该用户已存在', None, 403)


@user_info_api.route('/upToken', methods=['GET'])
def upToken():
    token = request.headers.get('token')
    next_token = rand_string(64)
    if is_login(token) == True:
        update_data('user', {'token': next_token}, {'token': token})
        commit()
        return api_factory(next_token, next_token)
    return err_factory('该用户未登录', None, 401)
