const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  costSpend: Number,
  charityFund: Number,
  revenue: Number,
  profit: Number,
  charityCategory: String,
  date: String 
});

const DataModel = mongoose.model('data', dataSchema);

module.exports = DataModel; 
   