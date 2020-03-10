//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Expense = require('../../models/Expense');
router.get('/', function (req, res) {
  res.render('index')
});

router.route('/insert')
  .post(function (req, res) {
    var expense = new Expense();
    expense.description = req.body.desc;
    expense.amount = req.body.amount;
    expense.month = req.body.month;
    expense.year = req.body.year;

  expense.save(function (err) {
    if (err)
      res.send(err);
    res.send('Expense successfully added!');
    });
  })


router.route('/update')
  .post(function (req, res) {
    const doc = {
      description: req.body.description,
      amount: req.body.amount,
      month: req.body.month,
      year: req.body.year
    };
    console.log(doc);
    Expense.update({ _id: req.body._id }, doc, function (err, result) {
      if (err)
        res.send(err);
      res.send('Expense successfully updated!');
    });
  });
router.get('/delete', function (req, res) {
  var id = req.query.id;
  Expense.find({ _id: id }).remove().exec(function (err, expense) {
    if (err)
      res.send(err);
    res.send('Expense successfully deleted!');
  })
});
router.get('/getAll', function (req, res) {
  var monthRec = req.query.month;
  console.log('aqui 1 :' + monthRec);
  var yearRec = req.query.year;
  console.log('aqui 2 :' + yearRec);
  if (monthRec && monthRec !== 'All') {
    Expense.find({ $and: [{ month: monthRec }, { year: yearRec }] }, function (err, expenses) {
      if (err)
        res.send('errorr  ' + err);
      res.json(expenses);
    });
  } else {
    Expense.find({ year: yearRec }, function (err, expenses) {
      if (err)
        res.send('errorr 2 ' + err);
      res.json(expenses);
    });
  }
});
module.exports = router;