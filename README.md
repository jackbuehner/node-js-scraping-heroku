# node-js-scraping-heroku
Try scraping with Node.js on Heroku

# Setup for Mac
## Running Locally

```
$ brew install node
$ git clone git@github.com:tayutaedomo/node-js-scraping-heroku.git
$ cd node-js-scraping-heroku
$ npm install
$ npm start
```
Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku
First, Setup [Heroku CLI](https://github.com/heroku/heroku)

```
$ cd node-js-scraping-heroku
$ heroku create
$ git push heroku master
$ heroku open
```

Alternatively, you can deploy your own copy of the app using the web-based flow:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

