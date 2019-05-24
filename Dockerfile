FROM node
COPY . .
RUN ["usr/local/bin/npm", "install"]
ENTRYPOINT ["usr/local/bin/npm", "start"]