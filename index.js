require('dotenv').config();
const Twit = require('twit');
const frase = require('./frases')      //Importa o array de frases do outro arquivo

//credenciais do twitter dev
const Bot = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET, 
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
})

console.log('Bot iniciado')  //Log para ver que codigo foi iniciado

//Função que faz o bot funcionar
const botInit = () => {
    const randomNumber = Math.floor(Math.random() * frase.length)       //Gera um numero aleatorio entre 0 e o tamanho do array de frases

    Bot.post('statuses/update',
        {
            status: frase[randomNumber]    //Posta uma frase do array de frases baseado no índice do número aleatorio gerado
        },
        function (err, data, response) {
            console.log(data)  //Dados sobre o tweet

            if (err) {
                console.log(err)  //Se der algum erro ao postar, exiba o erro no console
            }
        }
    );
}

setInterval(botInit, 20520000); //Chama a função de postar o tweet em um intervalo de tempo determinado

const stream = Bot.stream('statuses/filter', { track: 'charlie brown' }) //Variavel para fazer o bot ouvir o evento de pessoas tweetando 'charlie brown'

//listener que ao detectar um tweet com as palavras charlie brown, dá um like no tweet ouvido
stream.on('tweet', tweet => { 
    Bot.post('favorites/create', {id: tweet.id_str}, (err, data, response) => {
        console.log(data) //Dados sobre o tweet curtido

        if (err) {
            console.log(err) //Se ocorrer algum erro ao tentar favoritar o tweet, exiba o erro no console
        }
    })
})