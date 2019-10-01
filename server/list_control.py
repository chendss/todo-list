import json
from tools import rand_string
from flask import Blueprint, request
from public import api_factory, err_factory, user_id_by_token, check_login, unquote
from DB import commit, search_data, insert_data, table

list_api = Blueprint('list_api', __name__)


@list_api.route('/list', methods=['GET'])
@check_login
def get_list():
    token = request.headers.get('token')
    user_id = user_id_by_token(token)
    data_list = search_data('list', {'user_id': user_id}, True)
    body = [] if data_list == None else data_list
    body = list(reversed(body))
    return api_factory(body)


@list_api.route('/addList', methods=['POST'])
@check_login
def add_list():
    token = request.headers.get('token')
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
    return api_factory(True)


@list_api.route('/getLog/<list_id>', methods=['GET'])
@check_login
def get_log(list_id):
    id_ = unquote(list_id)
    data = search_data('log', {'list_id': id_}, True)
    result = data if isinstance(data, list) else []
    return api_factory(result)


@list_api.route('/addLog/<list_id>', methods=['POST'])
@check_login
def add_log(list_id):
    id_ = unquote(list_id)
    api_param = request.get_json()
    item = {
        'list_id': id_,
        'id': rand_string(64),
        'status': False,
        'collection': False,
        'content': api_param['text']
    }
    insert_data('log', item)
    commit()
    return api_factory(True)
