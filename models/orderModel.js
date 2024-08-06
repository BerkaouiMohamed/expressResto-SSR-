const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  order: [{id:{ type: mongoose.Types.ObjectId, ref: "plates", required: true },quantity:Number,_id:0}],
  user: {
    type: String,
    validate: {
      validator: function (name) {
        return name.length > 3;
      },
      message:"name must be longer"
    },
  },
  address:String
});


module.exports =new mongoose.model('order',orderSchema)