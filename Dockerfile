# Use a lightweight web server image
FROM nginx:alpine

# Add a user 'node' with UID and GID 1000
RUN adduser -D -u 1000 -g 1000 node

# Copy website files to the default Nginx directory
COPY . /usr/share/nginx/html
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
