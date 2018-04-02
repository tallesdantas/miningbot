const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '542657766:AAGaCZlzMfFoNgQ7gqtsU8Ueb0sgRTSn5ZE';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

//542657766:AAGaCZlzMfFoNgQ7gqtsU8Ueb0sgRTSn5ZE

var express = require('express');
var app = express();
var request = require('request');


 dadosrig =[];

 users = [];

bot.onText(/Pipiu/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  if(users.indexOf(chatId) <= 0)
  {
  	users.push(chatId); 

  	resp = 'Gosto d+ !!! vc foi adicionado a lista de informações da rig!'; // the captured "whatever"
  	console.log(users);

  }else{
  	resp = 'vc já está na lista !';
  	console.log(users,users.indexOf(chatId));
  }
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);

});

bot.onText(/Calado/, (msg, match) => {
	
	chatId = msg.chat.id;
	users.splice(users.indexOf(chatId),1);

});

function senddata(msg)
{
	console.log('senddata '+msg);
	console.log(users, users.length);

	for(i=0;i<users.length;i++ )
	{
		console.log(users[i])
		bot.sendMessage(users[i], msg);
	}

}


(function loop() {
	var url = "http://dwarfpool.com/eth/api?wallet=2fdde5073a4ffd851aa3a633ce87a52ec4b30ba3";
	  request({
	    url: url,
	    json: true
	  }, function (error, response, body) {
	      if (!error && response.statusCode === 200) {
	      {

	      	for(var key in body.workers)
	      	{

	      		console.log(dadosrig.indexOf(key));
	      		if(dadosrig.indexOf(key) >= 0 )
	      		{
  					console.log(body.workers);
	      			if(body.workers[key].alive == false)
	      			{	
	      				senddata('worker '+key+' está desligado!');
	      			}

	      			console.log(body.workers[key].hashrate,dadosrig[dadosrig.indexOf(key)+1]);

	      			if(body.workers[key].hashrate < parseFloat(dadosrig[dadosrig.indexOf(key)+1]) )
	      			{
	      				senddata( 'worker '+key+' está com o hash abaixo do esperado!, está igual a '+body.workers[key].hashrate );
	      			}
      				

	      		}
	      	}

	      }   // Print the json response
	    }
	  });
  

    setTimeout(loop, 7000);
    
})();



app.get('/rigs/:tagId', function(req, res) {
  	
  var dataurl = req.params.tagId;

  dataurl = dataurl.split(',');
  console.log(dataurl);
  if(dataurl[dataurl.length-1] != 'xoxota')
  {
  	res.send("n salvo !");
  }

  dadosrig =  dataurl;


  res.send(" salvo !");

});



var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
 
app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});