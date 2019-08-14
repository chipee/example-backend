FROM node:buster

RUN apt update && \
    apt install -qy \
	vim \
    git \
	&& \
    apt -qy autoremove --purge && \
    apt clean -qy && \
    rm -rf /tmp/* \
        /var/lib/apt/list/* \
        /var/tmp/* && \
    npm install -g nodemon && \
    npm install -g jsdoc && \
    mkdir /home/node/app && \
    git clone https://github.com/chipee/example-backend.git /home/node/app && \
    chown node:node /home/node/app && \
    cd /home/node/app && \
    npm install

EXPOSE 3000
USER node
WORKDIR /home/node/app
ENTRYPOINT ["node", "src/app.js"]
