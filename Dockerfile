FROM nginx:latest
COPY ./frontend/bis-crypto-wallet-client/build/* /usr/share/nginx/html/
COPY ./frontend/nginx-docker/default.conf /etc/nginx/conf.d/


