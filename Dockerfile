FROM node:16
WORKDIR /usr/src/app
COPY . index.js ./
RUN npm install
EXPOSE 3030
CMD [ "node" , "index.js" ] 
