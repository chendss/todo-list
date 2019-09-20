def str_to_table(key_str):
    """
    创建一个表 \n
    :param table_name:表名 \n
    :param key_str: 'key-id,name,pwd' 主键用-id代表 \n
    :return:无
    """
    result = []
    for key in key_str.split(','):
        if '-id' in key:
            read_key = key.split('-')[0]
            result.append('{} varchar(20) primary key'.format(read_key))
        else:
            result.append('{} varchar(20)'.format(key))
    return ', '.join(result)


def split_dict(k_v_dict):
    """
    切割对象为数据库插入语句 \n
    :param k_v_dict:{键：值} \n
    """
    k_s = []
    v_s = []
    for key in k_v_dict.keys():
        k_s.append(key)
        v_s.append('\'{}\''.format(k_v_dict[key]))
    return {
        'k_s': ', '.join(k_s),
        'v_s': ', '.join(v_s)
    }


def join_dict(source, connector, group_connector=''):
    """
    对象或者对象列表转字符串 \n
    :param connector 连接符 \n
    :param group_connector 每组对象的连接符 \n
    """
    result = []
    source_list = source if isinstance(source, list) else [source]
    for item in source_list:
        obj_str_list = []
        for key in item.keys():
            value = item[key]
            obj_str_list.append('{} {} {}'.format(key, connector, value))
        result.append(', '.join(obj_str_list))
    return ' {} '.format(group_connector).join(result)


def tuple_to_str(tuple_):
    """
    元组转字符串
    """
    return list(tuple_)[0]


def tuple_to_dict(tuple, table_keys):
    """
    元组数组+表键集合生成对象 \n
    :param tuple_list 元组数组 \n
    :param table_keys 表键集合 \n
    """
    result = {}
    for i, key in enumerate(table_keys):
        value = tuple[i]
        result[key] = value
    return result
