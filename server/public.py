import json
from flask import make_response, request
from DB import search_data, update_data, table


def api_factory(body, token):
    resp = make_response()
    model = {
        'data': body,
        'success': True,
    }
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


def check_login(func):
    def wrap(*args, **kwargs):
        token = request.headers.get('token')
        if is_login(token):
            return func(*args, **kwargs)
        else:
            return err_factory('该用户未登录', None, 401)
    wrap.__name__ = func.__name__
    return wrap
