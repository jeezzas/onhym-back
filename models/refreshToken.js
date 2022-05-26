const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Administrateur', unique : true },
    token: String
});

const RefreshToken = mongoose.model('Refresh Token', schema);
module.exports = RefreshToken;
