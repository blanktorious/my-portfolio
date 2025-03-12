# Use a lightweight web server image
FROM nginx:alpine

# Create a new user 'my-port' with UID and GID 1000 (or any other ID you prefer)
RUN adduser -D -u 1000 my-port

# Create the necessary directories for Nginx cache and logs
RUN mkdir -p /var/cache/nginx /var/log/nginx /etc/my-portfolio/data && \
    chown -R my-port:my-port /var/cache/nginx /var/log/nginx /etc/my-portfolio/data

# Copy website files to the default Nginx directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Switch user
USER my-port

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
