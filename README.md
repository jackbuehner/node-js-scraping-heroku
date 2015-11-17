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


# Deploy to Heroku
First, Setup [Heroku CLI](https://github.com/heroku/heroku).

Create heroku app.
```
$ cd node-js-scraping-heroku
$ heroku create
```

Install redis service.
```
$ heroku addons:create heroku-redis:hobby-dev
$ heroku addons | grep REDIS
 └─ as REDIS
$ heroku config | grep REDIS
REDIS_URL: redis://<your redis endpoint>:<port>
```

Set config variables if you need.
```
$ heroku config:set "DEBUG=*"
$ heroku config
```

Push source code to remove.
```
$ git push heroku master
Counting objects: 256, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (217/217), done.
Writing objects: 100% (256/256), 28.50 KiB | 0 bytes/s, done.
Total 256 (delta 83), reused 3 (delta 0)
...
```

Open index page on your browser.
```
$ heroku open
```

Alternatively, you can deploy your own copy of the app using the web-based flow:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Continuous Delivery
[ ![Codeship Status for tayutaedomo/node-js-scraping-heroku](https://codeship.com/projects/c5e20a80-6dc9-0133-e702-666194911eaf/status?branch=master)](https://codeship.com/projects/115729)

# Plugins
## heroku-redis
https://devcenter.heroku.com/articles/heroku-redis#using-the-cli

```
heroku plugins:install heroku-redis
heroku redis:cli -a <your app id> -c <your app id>
```

# Addons
## Papertrail
See https://devcenter.heroku.com/articles/papertrail

```
heroku addons:create papertrail
```

## RedisMonitor
See https://devcenter.heroku.com/articles/redismonitor#adding-redismonitor

```
heroku addons:create redismonitor:free --url <redis url>
```

