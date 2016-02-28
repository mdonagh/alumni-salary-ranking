// First add the following two lines at the top of the friends controller so that we can access our model through var Friend
// need to require mongoose to be able to run mongoose.model()
var mongoose = require('mongoose');
var College = mongoose.model('college');
var Zscore = mongoose.model('zscore');
var Mydata = mongoose.model('mydata');
module.exports = (function() {
 return {
  all: function(req, res){
    College.find({}, {INSTNM: 1, _id: 0}, function(err, colleges){
      var i;
      var array =[];
      for(i=0; i<colleges.length;i++){
        array.push(colleges[i].INSTNM);
      }
      if (err) throw err;
      res.json(array);
    })
  }, 
    salarydata: function(req, res){
      var rounded_z_score;
      var somedata = new Mydata(req.body);
        somedata.save(function(err){
        if(err) {
         console.log(err);
                }
              })
    College.find({INSTNM: req.body.my_college}, function (err, my_college){
      if(my_college[0] === undefined){
        res.json(0);
      }
      if(my_college[0] !== undefined){
      if(req.body.enrollment_year == 2001){
      var meandifference = req.body.salary - my_college[0].mn_earn_wne_p10;  
      var z_score = meandifference / my_college[0].sd_earn_wne_p10;
      }
      if(req.body.enrollment_year == 2003){
        var meandifference = req.body.salary - my_college[0].mn_earn_wne_p8;  
        var z_score = meandifference / my_college[0].sd_earn_wne_p8;
      }
      if(req.body.enrollment_year == 2005){
        var meandifference = req.body.salary - my_college[0].mn_earn_wne_p6;  
        var z_score = meandifference / my_college[0].sd_earn_wne_p6;
      }
        console.log(z_score);
        rounded_z_score = Math.round(z_score * 100) / 100;
        console.log("rounded:", rounded_z_score);
        Zscore.find({zscore: rounded_z_score}, function(err, result){
        console.log(result);
        if(result === undefined || result[0] === undefined){
          res.json(0);
        }
        else{
        res.json(result[0].percentile);
      }
      })
      }
      })

    // Zscore.find({zcore: rounded_z_score}, function(err, percentile){
    //     console.log(percentile);
    //     console.log(percentile.percentile);
    // })
    
    }
}
})();
// note that this is just a code snippet of the show method from the object returned in the controller (this includes the exports module.exports