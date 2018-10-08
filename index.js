const express = require('express');

//const axios = require('axios');
const bodyParser = require('body-parser');





var app = new express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());


var fs = require('fs');
    var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
     
    var nlu = new NaturalLanguageUnderstandingV1({
      iam_apikey: "_HbRDCoaTzZhfIkWI3KTRxneZfsBqxzA5dxhfasnldkfanlZSttigYks",
        
        version: '2018-04-05'
    });



app.get('/', function (req, res) {
    res.send('hello world')
  });

app.post('/getSentiment',(req,res,next)=>{
    let user_name = req.params.user_name;
    
    if(req.body.text != undefined){
        
      // The text to analyze
      const text = req.body.text;
      
      nlu.analyze(
        {
          html: text,
           features: {
            sentiment:{},
            emotion:{}
          }
        },
        function(err, response) {
          if (err) {
           res.send(err);
          } else {
            var sentiment = response["sentiment"]["document"]["score"];
            var emotion = {
              Fear:response["emotion"]["document"]["emotion"]["fear"],
              Anger:response["emotion"]["document"]["emotion"]["anger"],
              Joy:response["emotion"]["document"]["emotion"]["joy"],
              Disgust:response["emotion"]["document"]["emotion"]["disgust"],
              Sadness:response["emotion"]["document"]["emotion"]["sadness"]
            };
            // emotion["Fear"] = response["emotion"]["document"]["emotion"]["fear"];
            // emotion["Anger"] = response["emotion"]["document"]["emotion"]["anger"];
            // emotion["Joy"] = response["emotion"]["document"]["emotion"]["joy"];
            // emotion["Disgust"] = response["emotion"]["document"]["emotion"]["disgust"];
            // emotion["Sadness"] = response["emotion"]["document"]["emotion"]["sadness"];


            res.send({
              sentiment:sentiment,
              emotion: emotion
            });
          }
        }
      );
      
      } else {
        res.send('no text found');
      }
     
   
    
});


app.listen( process.env.PORT||3000);
