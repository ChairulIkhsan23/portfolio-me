FROM php:8.3-fpm

# System deps
RUN apt-get update && apt-get install -y \
    git zip unzip curl \
    libpng-dev libonig-dev libxml2-dev \
    libzip-dev libicu-dev \
    && rm -rf /var/lib/apt/lists/*

# PHP extensions
RUN docker-php-ext-install \
    pdo_mysql mbstring exif pcntl bcmath intl zip

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Buat folder runtime
RUN mkdir -p /var/www/.config/psysh \
    && mkdir -p /var/www/html/storage \
    && mkdir -p /var/www/html/bootstrap/cache \
    && mkdir -p /var/www/html/public/storage

# Permission untuk development
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www \
    && chmod -R 777 /var/www/html/storage \
    && chmod -R 777 /var/www/html/bootstrap/cache

USER www-data