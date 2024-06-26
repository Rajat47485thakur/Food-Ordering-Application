const User = require("../models/user.model");
const mongoose = require("mongoose");
const UserValidation = require('../validation/user.joi');



async function registerUser(req, res) {
    try {


        const { fullName, username, email, password, isActive } = req.body;
        const { error } = UserValidation({ fullName, username, email, password, isActive });
        if (error) return res.status(400).send(error.details);
        /*
               function() {
                   if (
                       [fullName, username, email].some((field) => !field || field.trim() === '')
                   ) {
                       return res.status(400).send({ error: 'All fields are required' });
                   }
       
                   const existedUser = await User.findOne({
                       $or: [
                           { username }, { email }
                       ]
                   });
       
                   if (existedUser) {
                       return res.status(400).send(`User with username or email already exists!`);
                   }
               }
       */

        const user = await User.create({
            fullName,
            username: username.toLowerCase(),
            email,
            password
        });

        res.status(200).json({ message: 'User Created Successfully', user });

    } catch (err) {
        res.status(500).json(`Unable to Register User ${err}`);
    }
}





async function loginUser(req, res) {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: "Not a registered User" });
        }
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        // console.log("User isActive-----------Test----:", user.isActive);
        if (!user.isActive) {
            return res.status(403).json({ error: "Account deactivated. Please contact support." });
        }
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}


async function retrieveUserProfile(req, res) {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!User) {
            res.status(404).json("No such user exists");
        }
        if (!user.isActive) {
            return res.status(403).json({ error: "Account deactivated. Please contact support." });
        }
        res.status(200).json({ user });

    } catch (err) {
        res.status(500).json({ err: "INTERNAL  SERVER ERROR!" });
    }
}




async function updateProfile(req, res) {
    const userId = req.params.id;
    const { fullName, username, email, profilePicture, contactInfo, preferences } = req.body;
    try {

        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!user.isActive) {
            return res.status(403).json({ error: "Account deactivated. Please contact support." });
        }

        user.fullName = fullName || user.fullName;
        user.username = username || user.username;
        user.email = email || user.email;
        user.profilePicture = profilePicture || user.profilePicture;
        user.contactInfo = contactInfo || user.contactInfo;
        user.preferences = preferences || user.preferences;


        user = await user.save();


        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}


async function deactivateUser(req, res) {
    const userId = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { isActive: false });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'Account deactivated successfully.' });
    } catch (err) {
        return res.status(500).send('Server Error While Deactivating User', err)
    }
}

async function activateUser(req, res) {
    const userId = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { isActive: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'Account activated successfully.' });
    } catch (err) {
        return res.status(500).send('Server Error While Activating User', err);
    }
}

module.exports = {
    registerUser,
    loginUser,
    retrieveUserProfile,
    updateProfile,
    deactivateUser,
    activateUser
}