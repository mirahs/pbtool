#!/usr/bin/python
# coding:utf-8
import sys

reload(sys)
sys.setdefaultencoding('utf-8')


# 驼峰转下划线
def camel_to_underline(camel_format):
    underline_format = ''
    if isinstance(camel_format, str):
        for _s_ in camel_format:
            underline_format += _s_ if _s_.islower() else '_' + _s_.lower()
    if underline_format.startswith('_'):
        underline_format = underline_format[1:]

    return underline_format


# 下划线转驼峰
def underline_to_camel(underline_format):
    camel_format = ''
    if isinstance(underline_format, str):
        for _s_ in underline_format.split('_'):
            camel_format += _s_.capitalize()

    return camel_format
