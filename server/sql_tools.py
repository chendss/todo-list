def str_to_table(key_str):
    """
    创建一个表
    :param table_name:表名
    :param key_str: 'key-id,name,pwd' 主键用-id代表
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
