#!/bin/sh

#==============================================================================
# File: run-test.sh
# Author: Odilon Lima (Intelbras)
# Date: 29 september 2022
# Brief: Test run script.
#==============================================================================

if [ -z "$BASEDIR" ]
then
    BASEDIR=$(pwd)
fi

case "$1" in
        up)
                echo "Up Daemon ..."
                DUID=$(id -u) DGID=$DOCKER_GROUP_ID  docker-compose -f $(pwd)/docker/docker-compose-test.yml down;
                DUID=$(id -u) DGID=$(id -g) docker-compose -f $BASEDIR/docker/docker-compose-test.yml up \
                --abort-on-container-exit  --exit-code-from devices-service-test;
                ;;
        shell)
                echo "Up ..."
                DUID=$(id -u) DGID=$(id -g) docker-compose -f $BASEDIR/docker/docker-compose-test.yml run devices-service-test
                ;;
        down-test)
                echo "Down ..."
                DUID=$(id -u) DGID=$(id -g) docker-compose -f $BASEDIR/docker/docker-compose-test.yml down -v --remove-orphans
                ;;

        up-test)
                echo "Call docker compose"
                DUID=$(id -u) DGID=$(id -g) docker-compose -f $BASEDIR/docker/docker-compose-int-test.yml up \
                --abort-on-container-exit  --exit-code-from app_server_testg;
                ;;

        up-test-build)
                echo "Call docker compose build"
                DUID=$(id -u) DGID=$(id -g) docker-compose -f $BASEDIR/docker/docker-compose-int-test.yml up --build \
                --abort-on-container-exit  --exit-code-from app_server_testg;
                ;;

        *)
                echo $"Usage: $0 {upd|up|shell|down|restart|logs}"
                RETVAL=2
esac
exit $RETVAL
