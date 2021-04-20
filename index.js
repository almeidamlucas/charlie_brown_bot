require('dotenv').config();
const Twit = require('twit');
const frases = require('./frases');     

const twit = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET, 
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
});

const postTweet = () => {
    const randomNumber = Math.floor(Math.random() * frases.length);

    twit.post('statuses/update', { status: frases[randomNumber] }, function (err, data) {
            console.log(data)  

            if (err) {
                console.log(err)  
            }
        }
    );
}

setInterval(postTweet, 20520000); 

const stream = twit.stream('statuses/filter', { track: 'bolsonaro' }) 

stream.on('tweet', tweet => { 
    twit.post('favorites/create', {id: tweet.id_str}, (err, data) => {
        console.log(data) 

        if (err) {
            console.log(err) 
        }
    })
})