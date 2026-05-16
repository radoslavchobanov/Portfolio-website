FROM httpd:2.4

COPY httpd-portfolio.conf /usr/local/apache2/conf/extra/httpd-portfolio.conf
RUN printf '\nInclude conf/extra/httpd-portfolio.conf\n' >> /usr/local/apache2/conf/httpd.conf

COPY . /usr/local/apache2/htdocs/
