const mongoose = require('mongoose');
const URL = 'mongodb://mahmoud:123mmm@ds133353.mlab.com:33353/passportapp';
mongoose.promise = global.promise;
//-------------------------------------- connect to database ------------------
mongoose.connect(URL);