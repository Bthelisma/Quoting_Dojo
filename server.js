// ========== CONFIG =============
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();

app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// ===============================

// ==== NEW MONGOOSE CODE! =======
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myFirstDB');
mongoose.Promise = global.Promise;


let QuoteSchema = new mongoose.Schema({
    name: String,
    quote: String,
}, { timestamps: true })




let Quote = mongoose.model("Quote", QuoteSchema);
// =============================


// ===== ROUTES! ======
app.get('/', function(req, res) {
    Quote.find({}, function(err, results) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(results);
            res.render('index', { data: results });
        }
    })
})

app.post('/add_quote', function(req, res) {
    console.log(req.body);
    let new_quote = new Quote(req.body);
    new_quote.save(function(err, results) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(results);
            res.redirect('/');
        }
    })
})

app.get('/quotes', function(req, res) {

        Quote.find({}).exec(function(err, quotes) {
            if (!err) {
                console.log("Show quotes");
                res.render('quotes', { quotes: quotes })
            } else {
                console.log("Error: dont show quotes");
                res.render('quotes', { quotes: false });
            }
        })

    })
    // ======================

// ==== SERVER LISTENER! =======
app.listen(8000, function() {
    console.log("Express on port 8000!")
});
// =============================