#!/bin/bash


#使用引擎自带的bytebuffer.js(如果不使用64位整形,不然使用下面的命令安装)
npm install bytebuffer
npm install @types/bytebuffer

cp -f ../../data/data.code.typescript.client/* src/proto
