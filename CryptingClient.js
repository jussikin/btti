var apiurl="http://localhost:3000/string";
var client = require('node-rest-client-promise').Client();
var bcrypt = require('bcryptjs-then');

/* As you can see client is super simple, perhaps some argument parsing could be added if used as utility.
    it's has some processing for cookies, perhaps i did choose wrong client lib. but if this would be part of
     browser side app this would not be neccessary.
 */

let cookie = "empty";
client.getPromise(apiurl)
       .then(response=> {
           cookie = response.response.headers['set-cookie'][0];
           return bcrypt.hash(response.data.toString(), 10);
       }).then(hash=>{
           return client.postPromise(apiurl,{data:hash,headers:{cookie:cookie,'Content-Type':"text/plain"}})
       }).then(postRetun=>{
           let response = postRetun.data.toString();
           console.log(response);
       }).catch(error=>{
           console.log(error);
       });