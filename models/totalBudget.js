const mongoose = require('mongoose');


const budgetSchema = new mongoose.Schema ({
    budegetName : {
        type : String
    },
    budgetAmount : {
        type : Number
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
     },
});

budgetSchema.set('timestamps', true);
module.exports = mongoose.model('budget',budgetSchema)