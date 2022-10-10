FROM node:16
WORKDIR /usr/src/app
COPY package*.json index.js ./
RUN npm install
EXPOSE 3030
CMD [ "node" , "index.js" ] 
