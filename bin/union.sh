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
  line=`grep "/\* start \*/" -n $src | sed -e 's/:.*//g'`

  if [ -z $line ]; then
    line=0
  fi

  line=$(( $line + 1 ))

  tail -n +$line $src >> $BUILD_DIR/Pluto-$1.js
  echo "" >> $BUILD_DIR/Pluto-$1.js
done < ../bin/src_list.txt

cp -frp $BUILD_DIR/Pluto-$1.js ../Pluto.js