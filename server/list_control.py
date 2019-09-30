import json
from tools import rand_string
from flask import Blueprint, request
from public import api_factory, err_factory, user_id_by_token, check_login
from DB import commit, search_data, insert_data

list_api = Blueprint('list_api', __name__)


@list_api.route('/list', methods=['GET'])
@check_login
def get_list():
    token = request.headers.get('token')
    user_id = user_id_by_token(token)
    data_list = search_data('list', {'user_id': user_id}, True)
    body = [] if data_list == None else data_list
    return api_factory(body, token)


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
    return api_factory(True, token)


@list_api.route('/getLog/<list_id>', methods=['GET'])
@check_login
def get_log(list_id):
    token = request.headers.get('token')
    data = search_data('log', {'list_id': list_id}, True)
    result = data if isinstance(data) else []
    return api_factory(result, token)


@list_api.route('/addLog/<list_id>', methods=['POST'])
@check_login
def add_log(list_id):
    token = request.headers.get('token')
    pass
