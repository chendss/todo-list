import random


def rand_string(n=64):
    '''
    随机字符串生成
    '''
    result = ''
    seed = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for _ in range(n):
        result += random.choice(seed)
    return result
