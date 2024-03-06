const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    description: {
        type:String 
    },
    category: String,
    price: Number
})

const itemModel = mongoose.model('items', itemSchema)

module.exports = itemModel; 