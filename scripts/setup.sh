# After cloned from heroku
heroku config:pull

# Install all the required node modules
npm install
npm install -g bower
npm install -g grunt-cli
npm install -g karma-cli
npm install -g mocha
npm install -g protractor
npm install -g sails

# Run the tests
node app.js
karma start karma.conf.js --no-auto-watch --single-run
protractor tests/protractor.conf.js