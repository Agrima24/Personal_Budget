const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/personalBudget', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("error", (err) => {
    console.log("Mongoose connection error:", err);
});

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to MongoDB");
});