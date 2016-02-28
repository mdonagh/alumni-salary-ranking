var mongoose = require('mongoose');

var mydataSchema = new mongoose.Schema({
	enrollment_year: Number,
	my_college: String,
	salary: Number
})

var mydata = mongoose.model('mydata', mydataSchema);