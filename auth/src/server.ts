import app from './index';
import mongoose from 'mongoose';
import {PORT ,DB_URI} from './config/base'


async function startServer() {
  try{
    console.log('Trying to connect to mongo database!')
    await mongoose.connect(DB_URI);
    console.log('Connected to the mongo database!');
    app.listen(PORT, () => {
      console.log(`Authentication api running on ${PORT}`);
    });
  }
  catch(e){
    console.log(e);
    
  }
}

startServer();