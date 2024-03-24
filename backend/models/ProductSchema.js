import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  
    title: {type:String, required:true},
    description: String,
    price: {type: Number, required: true},
    photo: [{type: String}],
    
    
  }, {
    timestamps: true,
   
  
});

export default mongoose.model("Product", ProductSchema);
