import json
from tools import rand_string
from flask import Blueprint, request
from public import api_factory, err_factory, unquote, check_login
from DB import commit, search_data, insert_data, update_data, table, commit

log_api = Blueprint('log_api', __name__)


@log_api.route('/changeLog/<log_id>', methods=['POST'])
@check_login
def change_log(log_id):
    id_ = unquote(log_id)
    api_param = request.get_json()
    api_param = api_param if api_param != None else {}
    db_value = search_data('log', {'id': id_})
    keys = db_value.keys() if isinstance(db_value, object) else []
    for key in keys:
        if key in api_param.keys():
            db_value[key] = api_param[key]
    update_data('log', db_value, {'id': id_})
    commit()
