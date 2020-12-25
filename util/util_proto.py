#!/usr/bin/python
# coding:utf-8
import sys
import util

reload(sys)
sys.setdefaultencoding('utf-8')


# 协议名常量 AccountLogin -> P_ACCOUNT_LOGIN
def proto_name_msg(mess_name):
    return 'P_' + util.camel_to_underline(mess_name).upper()


# 协议名常量 AccountLogin -> ACCOUNT_LOGIN
def proto_name_msg2(mess_name):
    return util.camel_to_underline(mess_name).upper()
