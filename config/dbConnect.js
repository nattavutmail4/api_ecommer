const { default: mongoose } = require("mongoose")

const dbConnect = () => {
    try{
      mongoose.set("strictQuery", false);
      const conn = mongoose.connect('mongodb://127.0.0.1/ecommerce').then(() => {
        console.log('Database Connected successfully')
      });
    }catch(error){
        console.log('DATABASE ERROR');
    }
}

module.exports = dbConnect