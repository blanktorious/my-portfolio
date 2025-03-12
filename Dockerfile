# Use a lightweight web server image
FROM nginx:alpine

# Create the necessary directories for Nginx cache and logs
RUN mkdir -p /var/cache/nginx /var/log/nginx /etc/my-portfolio/data && \
    chown -R www-data:www-data /var/cache/nginx /var/log/nginx /etc/my-portfolio/data

# Copy website files to the default Nginx directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Switch user
USER www-data

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
