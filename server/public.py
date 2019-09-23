import json
from flask import make_response
from DB import search_data, update_data


def api_factory(body, token):
    resp = make_response()
    model = {
        'data': body,
        'success': True,
    }
    if is_login(token) == False:
        return err_factory('该用户未登录', None, 401)
    resp.response = json.dumps(model)
    resp.headers['Content-Type'] = 'application/json; charset=utf-8'
    return resp


def err_factory(msg, extra=None, code=200):
    resp = make_response()
    resp.response = json.dumps({
        'data': {
            'msg': msg,
            'extra': extra
        },
        'success': False,
    })
    resp.headers['Content-Type'] = 'application/json; charset=utf-8'
    return resp, code


def user_id_by_token(token):
    user_data = search_data('user', {'token': token})
    print('找到一个什么', user_data)
    if user_data == None:
        return None
    else:
        return user_data['id']


def set_token(user, token):
    update_data('user', {'token': token}, {'user': user})


def is_login(token):
    user_obj = search_data('user', {'token': token})
    if token == 'Login':
        return True
    return user_obj != None
