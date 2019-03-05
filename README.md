# btti aka secret assigment

## Main components
* Express.js app that servers /string get&post
* CryptingClient that allows doing the client side thigs.

## Usage
  install dependencies, start espress with usual *npm start*, client can be run with *node CryptingClient*. 
  If dev dependencies are present *npm test* will run some tests i had time to write.
  
## Notes on implementation
  1. bcrypt may refer to ancient encryption program or very commonly used hashing algorythm. I suppose assigment went
  for the hashing. 
  2. I choose not to use any session storage. Neccessary data is kept in encrypted cookie instead. This allows for stateless 
  server, and poses in this case minimal risk for inception(as secret is pulled from the server unprotected anyways). 
  3. Tests & Client are quite minimal to save time and effort.
  
