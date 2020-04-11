#!/bin/sh
cd `dirname $0`

BUILD_DIR=../build

if [ $# != 1 ]; then
    echo "Specify version as argument"
    exit 1
fi

rm ../build/Pluto-$1.js

cd ../src
while read src
do
  cat $src >> $BUILD_DIR/Pluto-$1.js
  echo "" >> $BUILD_DIR/Pluto-$1.js
done < ../bin/src_list.txt

cp -frp $BUILD_DIR/Pluto-$1.js ../Pluto.js