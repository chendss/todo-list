import json
from tools import rand_string
from flask import Blueprint, request
from public import api_factory, err_factory, user_id_by_token
from DB import commit, search_data, insert_data

list_api = Blueprint('list_api', __name__)


@list_api.route('/list', methods=['GET'])
def get_list():
    # api_param = request.args
    token = request.headers.get('token')
    if token == None:
        return err_factory('该用户未登录', None, 403)
    else:
        user_id = user_id_by_token(token)
        data_list = search_data('list', {'user_id': user_id}, True)
        body = [] if data_list == None else data_list
        return api_factory(body, token)


@list_api.route('/addList', methods=['POST'])
def add_list():
    token = request.headers.get('token')
    if token == None:
        return err_factory('该用户未登录', None, 403)
    else:
        api_param = request.get_json()
        name = api_param['name']
        type_ = api_param['type']
        user_id = user_id_by_token(token)
        insert_data('list', {
            'user_id': user_id,
            'name': name,
            'id': rand_string(64),
            'type': type_
        })
        return api_factory(True, token)
