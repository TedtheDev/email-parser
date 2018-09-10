const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const simpleParser = require('mailparser').simpleParser;


var multer  = require('multer')
var upload = multer({})


const PORT = process.env.port || 8080;

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json({urlEncoded: false}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/api/upload/mail', upload.array('files'), (req,res) => {   
    const promises = [];

    req.files.forEach(file => {
        promises.push(simpleParser(file.buffer));
    });
    
    Promise.all(promises)
        .then(results => {
            const emailResults = results.map(result => {
                const parsedResults = {
                    to: `'${result.to.value[0].name}' <${result.to.value[0].address}>`,
                    from: `'${result.from.value[0].name}' <${result.from.value[0].address}>`,
                    date: result.date,
                    subject: result.subject,
                    messageId: result.messageId
                };

                return parsedResults;
            });

            res.json({success: true, data: emailResults});
        })
        .catch(err => res.json({ success: false, err: err }));
});

app.listen(PORT, () => {
    console.log('App listening on: ' + PORT);
});