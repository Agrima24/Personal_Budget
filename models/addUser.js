const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    userName : {
        type : String
    },
    userEmail : {
        type : String
    },
    userPassword : {
        type : String
    },
    userNumber : {
        type : Number
    }
});

userSchema.set('timestamps', true);
module.exports = mongoose.model('user',userSchema)