FROM node:latest

WORKDIR /probusca

COPY . /probusca

ENV PATH /probusca/node_modules/.bin:$PATH

COPY package.json /package.json
RUN npm install --silent
RUN npm install react-scripts@3.3.1 -g --silent
RUN npm install react-vertical-timeline-component

EXPOSE 7755

CMD ["npm", "run", "dev"]