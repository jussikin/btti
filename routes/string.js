var express = require('express');
var router = express.Router();
var randomstring = require("randomstring");
var bcrypt = require('bcryptjs-then');

//function to generate random length strings.
function randomLength() {
  let min = 8;
  let max = 32;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*generate random string. supposedly password or something like */
function generateRandomString(){
  return randomstring.generate({length:randomLength()})
}

/*Process get calls, respond with random string, save string so encryption can be verified.
* cookie is encrypted with middleware in app.js. Thus no need for server side storage.
* */
function getProcessor(req, res, next){
  const cookieParams = {
    httpOnly: true,
    signed: true,
    maxAge: 15,
  };
  let randomString=generateRandomString();
  res.cookie('string',randomString,cookieParams);
  res.send(randomString);
}

/* Process post calls. aka verification step. using bcrypt compare to see that hash is intact.
*/
function postProcessor(req,res,next){
  return bcrypt.compare(req.signedCookies.string,req.body.toString()).then(result=>{
    if(result===true)
      res.send("OK");
    else
      res.send("NOK");
  }).catch(error => {
    res.status(500);
    res.send('Pöljä Koodari ed 2.');
  });
}

/*set the routes according to task spec*/
router.get('/', getProcessor);
router.post('/', postProcessor);

module.exports = {router,
                  getProcessor,
                  postProcessor};
