const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        profilePicture: {
            type: String,
            default: null
        },
        contactInfo: {
            type: String,
            default: null
        },
        preferences: {
            type: String,
            default: null
        },
    }, { timestamps: true }
);
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
};
UserSchema.methods.genrateAccessToken = function () {
    return jwt.sign( // jwt have this .sign method
        {
            _id: this._id, // all this. are payload 
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        },

    )
};
UserSchema.methods.genrateRefreshToken = async function () {
    return jwt.sign( // jwt have this .sign method
        {
            _id: this._id, // all this. are payload 
            email: this.email,
            username: this.username
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        },

    )
};
module.exports = mongoose.model('User', UserSchema);