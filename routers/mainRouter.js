const express = require('express');
const router = express.Router();
const budgetRoute = require('./budgetRouter');
const expenseRoute = require('./expenseRouter');
const userRoute = require('./userRouter')


router.use('/budget', budgetRoute);
router.use('/expense',expenseRoute);
router.use('/user',userRoute);


module.exports = router
