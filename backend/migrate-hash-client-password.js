const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Client = require('./src/models/appModels/Client');

require('dotenv').config();

const MONGO_URI = process.env.DATABASE;

async function migrate(){
    await mongoose.connect(MONGO_URI);


    const clients = await Client.find({}).select('+password');

    for(let client of clients){
        if(client.password && !client.password.startsWith('$2a$')){
            const salt = await bcrypt.genSalt(10);
            client.password = await bcrypt.hash(client.password,salt);
            await client.save();
        }
    }
    mongoose.disconnect();
}   

migrate().catch((err) => {
  console.error('❌ Migration failed:', err);
});
