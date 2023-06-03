Note:

Since we need to make requests to an SSL secured Mongo API, we need to get around CORS on a dev env. 
To do this, run ```npm run start-proxy``` to start a proxy and then run ```npm run start``` to start the react dev server. 