import json
import os
import hashlib
from tools import rand_string
from flask import Blueprint, request
from public import api_factory, err_factory, check_login

icon_api = Blueprint('icon_api', __name__)


def file_md5(file_path):
    with open(file_path, 'rb') as f:
        md5obj = hashlib.md5()
        md5obj.update(f.read())
        _hash = md5obj.hexdigest()
    return str(_hash).upper()


def parsing(icon_path):
    result = []
    with open(icon_path, 'r', encoding='utf-8') as f:
        readlines = f.read().split('\n')
    for line_ in readlines:
        line = line_.replace(' ', '')
        if line.find(':before') != -1:
            class_ = line.split(':')[0].replace('.', '')
            result.append(class_)
    return result


def write_file(icon_path, list_):
    with open('./icon.json', 'w', encoding='utf-8') as f:
        icon_obj = {
            "md5": file_md5(icon_path),
            "list": list_
        }
        f.write(json.dumps(icon_obj))


@icon_api.route('/icons', methods=['GET'])
@check_login
def icon():
    icon_path = '../client/src/assets/icon/iconfont.css'
    with open('./el_icon.json', 'r', encoding='utf-8') as f:
        result = json.loads(f.read())
    local_icon_json = {}
    if os.path.exists('./icon.json'):
        with open('./icon.json', 'r', encoding='utf-8') as f:
            local_icon_json = json.loads(f.read())
        md5_value = local_icon_json['md5']
        if md5_value == file_md5(icon_path):
            result = local_icon_json['list']
        else:
            result.extend(parsing(icon_path))
            write_file(icon_path, result)
        return api_factory(result)
    else:
        result.extend(parsing(icon_path))
        write_file(icon_path, result)
        return api_factory(result)
