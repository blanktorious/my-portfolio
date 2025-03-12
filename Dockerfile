# Use a lightweight web server image
FROM nginx:alpine

# Add a user 'node' with UID and GID 1000
RUN adduser -D -u 1000 -g 1000 -h /home/my-port -c "Linux User" my-port

RUN mkdir -p /var/cache/nginx /var/log/nginx /etc/my-portfolio/data && \
    chown -R my-port:my-port /var/cache/nginx /var/log/nginx /etc/my-portfolio/data

# Copy website files to the default Nginx directory
COPY . /usr/share/nginx/html
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
