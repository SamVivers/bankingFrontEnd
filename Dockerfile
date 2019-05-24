FROM node
COPY . .
RUN ["usr/local/bin/npm"]
ENTRYPOINT ["usr/local/bin/npm", "start"]