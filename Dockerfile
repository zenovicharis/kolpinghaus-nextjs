# FROM php:7.1.3-fpm

# RUN apt-get update && apt-get install -y libmcrypt-dev \
#     mysql-client libmagickwand-dev --no-install-recommends \
#     && pecl install imagick \
#     && docker-php-ext-enable imagick \
# && docker-php-ext-install mcrypt pdo_mysql

# # Apache Configuration
# RUN a2enmod rewrite
# RUN a2enmod headers

# # SSL
# RUN a2enmod ssl
# RUN a2ensite default-ssl
# RUN openssl req -subj '/CN=example.com/O=My Company Name LTD./C=US' -new -newkey rsa:2048 -days 365 -nodes -x509 -keyout /etc/ssl/private/ssl-cert-snakeoil.key -out /etc/ssl/certs/ssl-cert-snakeoil.pem

# # Imagemagick
# RUN apt-get install --yes --force-yes libmagickwand-dev libmagickcore-dev
# RUN yes '' | pecl install -f imagick
# RUN docker-php-ext-enable imagick
# ENV APACHE_RUN_DIR /tmp/
# ENV APACHE_LOG_DIR /tmp/

# COPY config/apache.conf /etc/apache2/sites-available/restaurant-im-kolpinghaus.de.conf
# COPY config/apache.conf /etc/apache2/sites-enabled/restaurant-im-kolpinghaus.de.conf
# # RUN a2ensite restaurant-im-kolpinghaus.de.conf
# COPY config/config.json  /home/.config/kolpinghaus/config.json

# RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# WORKDIR /var/www/
# COPY ./composer.json ./
# RUN composer install

# COPY . .

# EXPOSE 80

FROM ubuntu:latest
# MAINTAINER Dan Pupius <dan@pupi.us>

# Install apache, PHP, and supplimentary programs. openssh-server, curl, and lynx-cur are for debugging the container.
RUN apt-get update && apt-get -y upgrade && DEBIAN_FRONTEND=noninteractive apt-get -y install \
    apache2 php7.4 php7.4-gd php7.4-intl php7.4-xsl php7.4-curl php-mysql libapache2-mod-php curl zip unzip git

# Enable apache mods.
RUN a2enmod php7.4
RUN a2enmod rewrite

# Update the PHP.ini file, enable <? ?> tags and quieten logging.
RUN sed -i "s/short_open_tag = Off/short_open_tag = On/" /etc/php/7.4/apache2/php.ini
RUN sed -i "s/error_reporting = .*$/error_reporting = E_ERROR | E_WARNING | E_PARSE/" /etc/php/7.4/apache2/php.ini

# Manually set up the apache environment variables
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2
ENV APACHE_PID_FILE /var/run/apache2.pid

# Expose apache.
EXPOSE 80

# Copy this repo into place.
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/
# COPY ./composer.lock ./
COPY ./composer.json ./
RUN composer install
# ADD www /var/www/site
COPY . /var/www/



# Update the default apache site with the config we created.
COPY ./config/apache.conf /etc/apache2/sites-enabled/000-default.conf
COPY ./config/config.json /home/.config/kolpinghaus/config.json

# By default start up apache in the foreground, override with /bin/bash for interative.
CMD /usr/sbin/apache2ctl -D FOREGROUND
