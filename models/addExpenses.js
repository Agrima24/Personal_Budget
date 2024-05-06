const mongoose = require('mongoose');


const expenseSchema = new mongoose.Schema({
    expenseTitle : {
        type : String
    },

    Amount : {
        type : String
    },
    budgetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "budget",
      },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
     },
})

expenseSchema.set('timestamps', true);
module.exports = mongoose.model('expense', expenseSchema)