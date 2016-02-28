var colleges = require('./../controllers/colleges.js');
module.exports = function(app) {
app.get('/colleges', function(req, res){
	colleges.all(req, res)
})
app.post('/salarydata', function(req, res){
	colleges.salarydata(req, res)
})
}
