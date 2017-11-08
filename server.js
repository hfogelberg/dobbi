const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    DF_CHAT_ACCESS_TOKEN = process.env.DF_CHAT_ACCESS_TOKEN,
    DF_SESSION_ID = Math.random() * 10000,
    apiai = require('apiai')(DF_CHAT_ACCESS_TOKEN);
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

router = express.Router();

router.route('/message')
        .post((req, res) => {
        text = req.body.text;

        let apiaiReq = apiai.textRequest(text, {
            sessionId: DF_SESSION_ID
        });

        apiaiReq.on('response', (response) => {
            let aiText = response.result.fulfillment.speech;
            res.json({botReply: aiText});
        });

        apiaiReq.on('error', (error) => {
            console.log(error);
        });

        apiaiReq.end();
    });

app.use('/api', router);

app.listen(port, ()=>{
    console.log('API listening on port: '+ port);
});

