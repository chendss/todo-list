import sqlite3
import time
from sql_tools import split_dict, join_dict, str_to_table, tuple_to_dict, tuple_to_str


def commit(con):
    """
    数据库提交函数
    """
    con.commit()


def close(con, cursor):
    con.commit()
    cursor.close()
    con.close()


# 插入数据的函数

# -----------------------------------
def insert_data(table_name, k_v_dict):
    """
    插入一条数据
    :param k_v_dict:{键：值}
    :param table_name:表名
    :return:
    """
    k_v_s_dict = split_dict(k_v_dict)
    base_command = 'insert into {} ({}) values ({})'
    command = base_command.format(
        table_name, k_v_s_dict['k_s'], k_v_s_dict['v_s'])
    return call(command)


def create_table(table_name, key_str):
    """
    创建一个表
    :param table_name:表名
    :param key_str: 'key-id,name,pwd' 主键用-id代表
    :return:无
    """
    command = 'create table {} ({})'.format(
        table_name, str_to_table(key_str))
    if table_name not in all_table():
        return call(command)


def insert_batch(table_name, base_key_list, item_list):
    """
    通过事务，批量插入数据
    :param table_name: 表名
    :param base_key_list
    :param item_list:[(第一个键的值，第二个……，第n个),(第一个键的值，第二个……，第n个),]
    :return:
    """
    con = sqlite3.connect('list.db')
    cursor = con.cursor()
    print('DB Created')
    key_list = base_key_list if isinstance(
        base_key_list, list) else [base_key_list]
    key_str = ','.join(key_list)
    no_str = ','.join([f'?' for k in key_list])  # 匹配键的数量的'？'
    command = f'insert into {table_name} ({key_str}) values ({no_str})'
    try:
        con.executemany(command, item_list)
    except BaseException as error:
        print(error, command, '此sqlite语句发送了一个异常')
    close(con, cursor)


# -----------------------------------

# 更新数据的函数

# -----------------------------------

def update_data(table_name, set_dict, condition_dict):
    """
    修改一条数据
    :param table_name:表名 \n
    :param set_dict:需要修改的键-值 \n
    :param condition_dict: 约束的键-值（支持列表）\n
    :return:
    """
    set_str = join_dict(set_dict, '=')
    if condition_dict is None:
        command = f'update {table_name} set {set_str}'
    else:
        condition_str = join_dict(condition_dict, '=', ' and ')
        command = f'update {table_name} set {set_str} where {condition_str}'
    return call(command)


# -----------------------------------

# 查询数据的函数

# -----------------------------------


def search_data(table_name, constraint_dict=None, batch=False):
    """
    查询记录 \n
    :param constraint_dict: {要查的键名,要查的键值} \n
    :param table_name:要查的表名 \n
    :return:元组
    """
    command = 'select * from {} where {}'.format(
        table_name, join_dict(constraint_dict, '='))
    structure = table_structure(table_name)
    db_data = call(command)
    if db_data == 'error':
        return None
    else:
        if len(db_data) >= 1:
            result = [tuple_to_dict(data, structure) for data in db_data]
            return result[0] if batch == False else result
        else:
            return None


def all_column(column_name):
    """
    全局搜索所有表返回列名为column_name的数据
    :param column_name: 列名
    :return: []
    """
    return_value = []
    con = sqlite3.connect('list.db')
    cursor = con.cursor()
    print('DB Created')
    for table_name in all_table():
        props = table_structure(table_name)
        if column_name in props:
            key_column = cursor.execute(
                f'select {column_name} from {table_name}').fetchall()
            return_value.extend(key_column)
    close(con, cursor)
    return [tuple_to_str(value) for value in return_value]


def table_structure(table_name):
    """
    返回表的结构
    :param table_name:
    :return:
    """
    structure = call(f'pragma table_info(\'{table_name}\')')
    props = [p[1] for p in structure] if structure is not None else []
    return props


def table(table_name):
    """
    查询一个表的内容
    :param table_name: 表名
    :return:
    """
    command = f'select * from {table_name}'
    db_value = call(command)
    structure = table_structure(table_name)
    data_list = []
    for d in db_value:
        data_list.append(tuple_to_dict(d, structure))
    return data_list


def all_table():
    """
    获得数据库中所有的表
    :return: [('user',)]
    """
    command = 'SELECT name FROM sqlite_master WHERE type=\'table\' ORDER BY name'
    return [tuple_to_str(table_) for table_ in call(command)]


# -----------------------------------

# 删除数据的函数

# -----------------------------------

def del_data(table_name, constraint_dict=None):
    """
    删除数据，如果constraint_dict为空那么则清空整个表内容
    :param table_name: 表名
    :param constraint_dict:约束条件的字典
    :return:
    """
    if constraint_dict is None:
        command = f'delete from {table_name}'
    else:
        c_d_str = join_dict(constraint_dict, '=', ' and ')
        command = 'delete from {} where {}'.format(table_name, c_d_str)
    return call(command)


def del_table(table_name):
    """
    删除一张表
    :param table_name:
    :return:
    """
    command = f'drop table {table_name}'
    return call(command)


# -----------------------------------

# 异常处理

# -----------------------------------

def call(sqlite_command):
    """
    sqlite语句带异常处理
    :param sqlite_command: sqlite语句
    :return:
    """
    con = sqlite3.connect('list.db')
    cursor = con.cursor()
    print('DB Created', sqlite_command)
    result = None
    try:
        result = cursor.execute(sqlite_command).fetchall()
    except sqlite3.IntegrityError:
        pass
    except BaseException as error:
        print(error, f'此 {sqlite_command}\n sqlite语句发送了一个异常')
        time.sleep(5)
        result = 'error'
    close(con, cursor)
    return result
