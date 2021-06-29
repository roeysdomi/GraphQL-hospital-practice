const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  managersIds: {
    type:String,
    required: true
  },
  state: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  }
});

const Hospital = mongoose.model('Hospital', HospitalSchema);

module.exports = Hospital;
