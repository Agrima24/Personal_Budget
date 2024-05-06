const express = require("express");
const router = express.Router();
const budget = require('../controllers/budget');

router.post('/add/:userId',budget.AddTotalBudget);
router.get('/list/:userId',budget.getBudget);
router.delete('/delete/:id',budget.deleteBudget);
router.patch('/edit/:id',budget.editBudget);


module.exports = router