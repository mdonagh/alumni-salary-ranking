var mongoose = require('mongoose');

var collegeSchema = new mongoose.Schema({
	INSTNM: String,
	mn_earn_wne_p10: Number,
	sd_earn_wne_p10: Number,
	mn_earn_wne_p6: Number,
	sd_earn_wne_p6: Number,
	mn_earn_wne_p8: Number,
	sd_earn_wne_p8: Number
})

var college = mongoose.model('college', collegeSchema);