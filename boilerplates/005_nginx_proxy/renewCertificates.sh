#!/usr/bin/env bash
set -e

# NOTE: you can run this script to both setup crontab job as well as actually renew certificates

SCRIPT_PATH=`realpath -s "$0"`

# setup cronjob if needed
EXISTING_CRONJOBS=`crontab -l 2> /dev/null || echo ""`
if ! echo $EXISTING_CRONJOBS | grep $SCRIPT_PATH > /dev/null; then
    TMP_FILE=crontab.tmp

    echo $EXISTING_CRONJOBS > $TMP_FILE
    echo "0 0 * * * $SCRIPT_PATH" >> $TMP_FILE

    crontab $TMP_FILE
    rm $TMP_FILE
fi

docker compose up certbot-renewal
docker compose exec webserver nginx -s reload
