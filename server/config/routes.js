const mongoose = require('mongoose');
// let Task = mongoose.model('Task', TaskSchema);

module.exports = function(app) {

  app.get('/', (req, res) => {
    console.log("Hit root route");
    return res.render('index');
  });



}
