const express = require('express');
const res = require('express/lib/response');
const {customAlphabet} = require('nanoid');
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 6);
const dayjs = require('dayjs');
const url = require('url'); 

const app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let options = {
        invalid: !!req.query.invalid,
        longURL: req.query.longURL || '',
        shortURL: req.query.shortURL || ''
    };
    console.log(JSON.stringify(options, null, 4));
    res.render('index', options);
});

app.get('/info/:shortURL', (req, res) => {
    let options = {};
    if(1 === 1){
        options = {
            error: false,
            shortURL: req.params.shortURL,
            createdOn: dayjs().format('DD MMM YYYY, h:mm a'),
            clicks: 45,
            longURL: 'http://www.youtube.com'
        }
    } else {
        options = {
            error: true
        }
    }
    res.render('info', options);
});


app.get('/dhuski', (req, res) => {
    const d = dayjs().format('DD MMM YYYY, h:mm a');
    res.send();
})

app.post('/createShort', (req, res) => {
    const currDate = new Date();
    const id = nanoid();

    // res.redirect(`/info/${id}`);
    res.redirect(url.format({
        pathname: "/",
        query: {
            "invalid": true,
            "longURL": "http://www.dhuski.com",
            "shortURL": "HgND5h"
        }
    }));
})
app.listen(process.env.PORT || 5769);