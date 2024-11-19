// models/Disease.js  

const mongoose = require('mongoose');  

const diseaseSchema = new mongoose.Schema({  
  disease: { type: String, required: true },  
  symptoms: [{ type: String, required: true }],  
  precautions: [{ type: String }],  
}, { collection: 'disease_data' }); // Specify the collection name  

module.exports = mongoose.model('Disease', diseaseSchema);