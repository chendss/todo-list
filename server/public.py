import json
from flask import make_response


def api_factory(body):
    resp = make_response()
    resp.response = json.dumps({
        'data': body,
        'success': True,
    })
    resp.headers['Content-Type'] = 'application/json; charset=utf-8'
    return resp


def err_factory(body, code=200):
    resp = make_response()
    resp.response = json.dumps({
        'data': body,
        'success': False,
    })
    resp.headers['Content-Type'] = 'application/json; charset=utf-8'
    return resp, code
