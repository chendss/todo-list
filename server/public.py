import json


def api_factory(body):
    result = {
        'data': body,
        'success': True,
    }
    return json.dumps(result)


def err_factory(body):
    error_model = {
        'message': body,
        'success': False
    }
    return json.dumps(error_model)
