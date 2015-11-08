# node-js-scraping-heroku
Try scraping with Node.js on Heroku


# Setup for Mac
## Running Locally
### Install node
```
$ brew install node
```

### git clone
```
$ git clone git@github.com:tayutaedomo/node-js-scraping-heroku.git
```

### Install modules
```
$ cd node-js-scraping-heroku
$ npm install
```

### Setup Redis
Install redis and start redis-server.
```
$ brew install redis
$ redis-server /usr/local/etc/redis.conf
```

Configure redis URL.
```
$ cd node-js-scraping-heroku
$ export REDIS_URL="redis://:@127.0.0.1:6379"
```

### Start web server
```
$ cd node-js-scraping-heroku
$ npm start
```
Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku
First, Setup [Heroku CLI](https://github.com/heroku/heroku).

```
$ cd node-js-scraping-heroku
$ heroku create
$ git push heroku master
$ heroku open
```

Alternatively, you can deploy your own copy of the app using the web-based flow:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)


# Development
## Enable debug log
```
$ DEBUG=* npm start
```

## Auto-reload
Use [node-dev](https://github.com/fgnass/node-dev).
```
$ npm i -g node-dev # Install
$ node-dev index.js
```

