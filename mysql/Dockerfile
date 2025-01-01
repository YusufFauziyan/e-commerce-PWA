FROM mysql:8.0

# Environment variables for MySQL configuration
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=myapp
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password

# Copy custom MySQL configuration if needed
# COPY my.cnf /etc/mysql/conf.d/my.cnf

# Expose MySQL port
EXPOSE 3306

# Set character set and collation
CMD ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]
