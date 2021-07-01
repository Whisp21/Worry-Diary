const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb+srv://admin-amy:Test123@cluster0.wwm6y.mongodb.net/worryDiary', { useNewUrlParser: true });

const entrySchema = {
  date: String,
  entry: String,
  tips: String
}

const Entry = mongoose.model('Entry', entrySchema);

app.get('/', (req, res) => {
  Entry.find({}, (error, entries) => {
    res.render('home', {
      entries: entries
    });
  })
})

app.get('/compose', (req, res) => {
  res.render('compose');
})

app.post('/compose', (req, res) => {
  const entry = new Entry({
    date: req.body.date,
    entry: req.body.entry,
    tips: req.body.tips
  })

  entry.save((error) => {
    if(!error) {
      res.redirect('/');
    }
  })
})

app.get('/entries/:entryId', (req, res) => {
  const entryId = req.params.entryId;

  Entry.findOne({_id: entryId}, (error, entry) => {
    res.render('entry', {
      date: entry.date,
      entry: entry.entry,
      tips: entry.tips
    })
  })
})

app.get('/about', (req, res) => {
  res.render('about');
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port 3000');
})
