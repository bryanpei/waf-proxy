FROM owasp/modsecurity-crs:v3.3.2-nginx
COPY waf-api_pei_dev.conf /etc/nginx/conf.d/waf-api_pei_dev.conf
COPY monitor-nginx-conf.sh /home/monitor-nginx-conf.sh
RUN apt-get update
RUN apt-get install -y inotify-tools
CMD service nginx start && /bin/sh /home/monitor-nginx-conf.sh 
