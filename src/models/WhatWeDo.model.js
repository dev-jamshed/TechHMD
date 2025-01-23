const mongoose = require('mongoose');

const { Schema } = mongoose;

const whatWeDoSchema = new Schema({
  serviceId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
    required: false,
  },
}, { timestamps: true }); 

const WhatWeDo = mongoose.model('WhatWeDo', whatWeDoSchema);
module.exports = { WhatWeDo };

