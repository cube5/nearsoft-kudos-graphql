FROM node:10-alpine

RUN mkdir /app

WORKDIR /app

# We first copy package.json and then run npm install to
# allow Docker to cache the output, so there's no need
# to execute npm i from sratch every time
COPY package.json /app/package.json
RUN npm i

# Then we copy the rest of the project.
COPY . /app

EXPOSE 4000

CMD ["npm", "run", "now-start"]
