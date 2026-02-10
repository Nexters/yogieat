FROM nginx:1.29.4-alpine

# Default Configuration 파일 삭제
RUN rm /etc/nginx/conf.d/default.conf

# Configuration 파일 복사 (Dev와 Prod 모두)
COPY ./config/client-dev.conf /etc/nginx/conf.d/client-dev.conf
COPY ./config/client-prod.conf /etc/nginx/conf.d/client-prod.conf
COPY ./config/nginx.conf /etc/nginx/nginx.conf

# 로그 디렉토리 생성 (환경별 분리)
RUN mkdir -p /var/log/nginx/client-dev /var/log/nginx/client-prod

# Certbot webroot 디렉토리 생성 (환경별 분리)
RUN mkdir -p /var/www/certbot-dev /var/www/certbot-prod

CMD ["nginx", "-g", "daemon off;"]
