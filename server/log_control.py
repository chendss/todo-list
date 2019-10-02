import json
from tools import rand_string
from flask import Blueprint, request
from public import api_factory, err_factory, unquote, check_login, user_id_by_token
from DB import commit, search_data, update_data, table, commit, del_data, insert_data

log_api = Blueprint('log_api', __name__)


@log_api.route('/changeLog/<log_id>', methods=['POST'])
@check_login
def change_log(log_id):
    id_ = unquote(log_id)
    api_param = request.get_json()
    api_param = api_param if api_param != None else {}
    db_value = search_data('log', {'id': id_})
    keys = db_value.keys() if isinstance(db_value, dict) else []
    for key in keys:
        if key in api_param.keys():
            db_value[key] = api_param[key]
    update_data('log', db_value, {'id': id_})
    commit()
    return api_factory({'msg': '修改成功'})


@log_api.route('/delLog/<log_id>', methods=['POST'])
@check_login
def del_log(log_id):
    id_ = unquote(log_id)
    del_data('log', {'id': id_})
    commit()
    return api_factory({'msg': '删除成功'})


@log_api.route('/getLog/<list_id>', methods=['GET'])
@check_login
def get_log(list_id):
    id_ = unquote(list_id)
    data = search_data('log', {'list_id': id_}, True)
    result = data if isinstance(data, list) else []
    return api_factory(result)


@log_api.route('/addLog/<list_id>', methods=['POST'])
@check_login
def add_log(list_id):
    token = request.headers.get('token')
    user_id = user_id_by_token(token)
    id_ = unquote(list_id)
    api_param = request.get_json()
    item = {
        'list_id': id_,
        'id': rand_string(64),
        'status': False,
        'user_id': user_id,
        'collection': False,
        'content': api_param['text']
    }
    insert_data('log', item)
    commit()
    return api_factory(True)
