#!/bin/sh

if [ -z "$BASEDIR" ]
then
    BASEDIR=$(pwd)
fi

#echo "Project Base Directory: $BASEDIR"
#DUID=$(id -u) DGID=$(id -g) docker-compose -f $BASEDIR/docker/docker-compose.yml up -d

case "$1" in
        upd)
                echo "Up Daemon ..."
                DUID=$(id -u) DGID=$(id -g) docker-compose -f $BASEDIR/docker/docker-compose.yml up -d
                ;;
        up)
                echo "Up ..."
                DUID=$(id -u) DGID=$(id -g) docker-compose -f $BASEDIR/docker/docker-compose.yml up
                ;;
        down)
                echo "Down ..."
                DUID=$(id -u) DGID=$(id -g) docker-compose -f $BASEDIR/docker/docker-compose.yml down
                ;;
        down-volume)
                echo "Down ..."
                DUID=$(id -u) DGID=$(id -g) docker-compose -f $BASEDIR/docker/docker-compose.yml down -v
                ;;
        restart)
                echo "Restart ..."
                DUID=$(id -u) DGID=$(id -g) docker-compose -f $BASEDIR/docker/docker-compose.yml restart
                ;;
        logs)
                echo "Logs ..."
                DUID=$(id -u) DGID=$(id -g) docker-compose -f $BASEDIR/docker/docker-compose.yml logs -f
                ;;
        db)
                echo "Opening psql CLI ..."
                docker exec -it gaming-library-db psql -p gamingLibrary -U gamingLibrary -d gaming-library-db
                ;;

        *)
                echo $"Usage: $0 {upd|up|down|restart|logs|db}"
                RETVAL=2

esac
exit $RETVAL