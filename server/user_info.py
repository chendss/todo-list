import json
from tools import rand_string
from flask import Blueprint, request
from DB import commit, search_data, insert_data, insert_batch, commit
from public import api_factory, err_factory, set_token, update_data, check_login

user_info_api = Blueprint('user_info_api', __name__)


def create_menu(user):
    """
    创建用户的基础清单
    """
    keys = []
    values = []
    user_id = search_data('user', {"user": user})['id']
    with open('./base_menu.json', 'r', encoding='utf-8') as f:
        read_file = json.loads(f.read())
        for menu in read_file:
            menu['id'] = rand_string()
            menu['user_id'] = user_id
            list_menu = list(menu.values())
            values.append(tuple(list_menu))
        keys = list(read_file[0].keys())
    insert_batch('list', keys, values)


@user_info_api.route('/login', methods=['POST'])
def login():
    api_param = request.get_json()
    user = api_param.get('user')
    pwd = api_param.get('pwd')
    db_value = search_data('user', {'user': user})
    if db_value == None or db_value['pwd'] != pwd:
        return err_factory('用户名或者密码错误', None, 403)
    else:
        token = rand_string()
        set_token(user, token)
        commit()
        print('更新token', user, token)
        return api_factory(token)


@user_info_api.route('/register', methods=['POST'])
def register():
    api_param = request.get_json()
    user = api_param.get('user')
    pwd = api_param.get('pwd')
    db_value = search_data('user', {'user': user})
    if db_value == None:
        insert_data('user', {
            'id': rand_string(),
            'user': user,
            'pwd': pwd
        })
        token = rand_string()
        set_token(user, token)
        create_menu(user)
        commit()
        return api_factory(token)
    else:
        return err_factory('该用户已存在', None, 403)


@user_info_api.route('/upToken', methods=['GET'])
@check_login
def upToken():
    token = request.headers.get('token')
    next_token = rand_string()
    update_data('user', {'token': next_token}, {'token': token})
    commit()
    return api_factory(next_token)
