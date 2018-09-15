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
                let parsedResults = {
                    messageId: '',
                    to: '',
                    from: '',
                    date: '',
                    subject: ''
                }

                if(result.messageId) {
                    parsedResults.messageId = result.messageId;
                }

                if(result.to) {
                    let name = '';
                    let address = '';
                    if(result.to.value && result.to.value.length > 0) {
                        if(result.to.value[0]) {
                            if(result.to.value[0].name) {
                                name = result.to.value[0].name;
                            }
                            if(result.to.value[0].address) {
                                address = result.to.value[0].address
                            }
                        }
                    }
                        
                    parsedResults.to = `'${name}' <${address}>`;
                }

                if(result.from) {
                    let name = '';
                    let address = '';
                    if(result.from.value && result.from.value.length > 0) {
                        if(result.from.value[0]) {
                            if(result.from.value[0].name) {
                                name = result.from.value[0].name;
                            }
                            if(result.from.value[0].address) {
                                address = result.from.value[0].address
                            }
                        }
                    }
                    parsedResults.from = `'${name}' <${address}>`;
                }

                if(result.date) {
                    parsedResults.date = result.date;
                }

                if(result.subject) {
                    parsedResults.subject = result.subject;
                }

                return parsedResults;
            });

            res.json({success: true, data: emailResults});
        })
        .catch(err => res.json({ success: false, err: err }));
});

app.listen(PORT, () => {
    console.log('App listening on: ' + PORT);
});