#!/bin/bash
if [ -f package.json -a -f package-lock.json ]
then
	npm install
else
	echo '{}' > package.json
	npm install -S bytebuffer@5.0.1
	npm install -S @types/bytebuffer@5.0.37
fi

\cp ../../data/typescript.cc/* assets/scripts/proto/
