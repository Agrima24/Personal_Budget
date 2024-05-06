const express = require("express");
const router = express.Router();
const expense = require('../controllers/expenses');

router.post('/add/:userId',expense.addExpenses);
router.get('/list/:userId',expense.getList);
router.delete('/delete/:id',expense.deleteExpense);
router.patch('/edit/:id',expense.editExpense);


module.exports = router