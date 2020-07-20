#Using pre-defined node base image
FROM node:10.0.0
RUN mkdir /var/www
WORKDIR /var/www

# Copy package.json. To take advantage of cached Docker layer
ADD package.json /var/www/

# Install nodemon to restart server on changes and the express
# packages for routing and path
RUN npm install nodemon react react-dom next @zeit/next-sass -g 
RUN npm install --unsafe-perm -g node-sass
RUN npm install knex bookshelf -g

ADD . /var/www/

# Expose web service
EXPOSE 9100

CMD [ "npm", "run", "dev", "--", "-p", "9100", "node", "apiServer.js" ]
 