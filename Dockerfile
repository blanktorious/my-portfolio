FROM nginx:alpine

RUN addgroup -g 1000 -S nginxgroup && adduser -u 1000 -S -G nginxgroup nginxuser

RUN mkdir -p /var/run/nginx /var/cache/nginx/client_temp /var/cache/nginx/proxy_temp /var/cache/nginx/fastcgi_temp /var/cache/nginx/scgi_temp /var/cache/nginx/uwsgi_temp \
    && chown -R nginxuser:nginxgroup /var/cache/nginx /var/run /var/run/nginx /var/log/nginx /etc/nginx /usr/share/nginx/html

RUN sed -i 's/listen       80;/listen       8080;/g' /etc/nginx/conf.d/default.conf
RUN sed -i 's/\/var\/run\/nginx.pid/\/var\/run\/nginx\/nginx.pid/g' /etc/nginx/nginx.conf

USER nginxuser

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]