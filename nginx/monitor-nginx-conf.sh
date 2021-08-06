#!/bin/sh
dir=/etc/nginx/conf.d/
while inotifywait -qqre create,modify,delete "$dir"; do
    nginx -s reload
done