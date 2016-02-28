var mongoose = require('mongoose');

var zscoreSchema = new mongoose.Schema({
	zscore: Number,
	percentile: Number
})

var zscore = mongoose.model('zscore', zscoreSchema);