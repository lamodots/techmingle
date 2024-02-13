const AppError = require('../models/errorModel');
const User = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const fs =  require('fs')
const path = require('path')
const {v4:uuid} = require('uuid');

/****
 * REGISTER A NEW USER
 * POST: api/users/register
 * UNPROTECTED
 *
 ****/
const registerUser = async (req, res, next)=> {
   try{
    
    const { name, email , password , confirmPassword} = req.body;

    if(!name || !email || !password){
        return next(new AppError("Fill in all fields", 422))
    }
    const newEmail = email.toLowerCase();

    const  emailExists = await User.findOne({email: newEmail})

    if(emailExists){
        return next(new AppError("Email already exits", 422))
    }
    if(password.trim().length < 6){
        return next(new AppError("Password should be at least 6 characters .", 422))
    }

    if(password !== confirmPassword){
        return next(new AppError("Passwords do not match.", 422))
    }

const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt)
const newUser = await User.create({name, email: newEmail, password: hashedPassword})
res.status(201).json(`New user ${newUser.email} registered.`)

   }catch(error){
    return next(new AppError("User registration failled", 422))
   }
}
/****
 * LOGIN REGISTERED USER
 * POST: api/users/login
 * UNPROTECTED
 *
 ****/
const loginUser = async (req, res, next)=> {
    try {
        const { email , password} = req.body
        if(!email || !password){
            return next(new AppError("Fill in all fileds", 422))

        }
        const newEmail = email.toLowerCase();
        const user = await User.findOne({email: newEmail})
        if(!user){
            return next(new AppError("Invalid credentials.", 422))
        }

        const comparePass = await bcrypt.compare(password, user.password)
        if(!comparePass){
            return next(new AppError("Invalid credentials", 422))
        }

        /**
         * lets extract info from user above
         * */
        const { _id: id, name} = user;
        const token = jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: "1d"})
        res.status(200).json({token, id, name})

    } catch (error) {
        return next(new AppError("Login failed. Please check your credentials", 422))
    }

}
/****
 * USER PROFILE
 * POST: api/users/:id
 * PROTECTED
 *
 ****/
const getUser = async (req, res, next)=> {
    try {
        const {id} = req.params;
        const user = await User.findById(id).select('-password') //The .select('-password') is to exclude password when we are displaying the user
        if(!user){
            return next(new AppError("User not found", 404))
        }
        res.status(200).json(user)
    } catch (error) {
        return next(new AppError(error))
    }
}
/****
 * CHANGE USER AVATAR
 * POST: api/users/change-avatar
 * PROTECTED
 *
 ****/
const changeUserAvatar = async (req, res, next)=> {
    try {
        if(!req.files.avatar){
            return next(new AppError("Please choose an image", 422))
        }

        // find user form database
        const user = await User.findById(req.user.id)
        //delete old avatar if exists
        if(user.avatar){
            fs.unlink(path.join(__dirname, "...", "uploads", user.avatar), (err)=> {
                    if(err){
                        return next(new AppError(err))
                    }
            })
        }
        const  { avatar} = req.files;
        if(avatar.size > 500000){
             return next(new AppError("Profile picture too big. should be less than 500kb", 422))
        }

        let fileName ;
        fileName = avatar.name;
        let splittedName = fileName.split('.');
        const newFile = splittedName[0] + uuid() + "." + splittedName[splittedName.length - 1];
        
        avatar.mv(path.join(__dirname, "..", "uploads", newFile), async (err)=> {
            if(err){
                return next(new AppError(err))
            }
            const updatesAvatar = await User.findByIdAndUpdate(req.user.id, {avatar: newFile}, {new:true})
            if(!updatesAvatar){
                return next(new AppError("Avatar couldnt be changed", 422))
            }
            res.status(200).json(updatesAvatar)
        })
    } catch (error) {
        return next(new AppError(error))
    }
}
/****
 * EDIT USER DETAILS
 * POST: api/users/edit-user
 * PROTECTED
 *
 ****/
const editUser = async (req, res, next)=> {
    try {
        
        const { name, email , currentPassword , newPassword , newConfirmPassword} = req.body;

        if(!name || !email || !currentPassword || !newPassword ){
            return next(new AppError("Fill in all fields", 422))
        }

        // GET user from database
        const user = await User.findById(req.user.id)
        if(!user){
            return next(new AppError("User not found", 403))
        }


        //make sure new email doesnt already exists and that it does not belong to something else.
        const emailExists = await User.findOne({email});
        if(emailExists && (emailExists._id != req.user.id)){
            return next(new AppError("Email already exit.", 422))
        }
        //compare current password to db password
        const validateUserPassword = await bcrypt.compare(currentPassword, user.password);
        if(!validateUserPassword){
            return next(new AppError("invalid current password.", 422))
        }

        //compare new passswords
        if(newPassword !== newConfirmPassword){
            return next(new AppError("New passwords to not match.", 422))
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword, salt)

        // Update user
        const newInfo = await User.findByIdAndUpdate(req.user.id, {name, email, password:hash}, { new: true})
        res.status(200).json(newInfo)

    } catch (error) {
        return next(new AppError(error))
    }
}
/****
 * GET ALL USERS
 * POST: api/users/authors
 * UNPROTECTED
 *
 ****/
const getAllUsers = async (req, res, next)=> {
   try {
    const authors = await User.find({}).select("-password")
    res.json(authors)
   } catch (error) {
    return next(new AppError(error))
   }
}

module.exports= {
    registerUser, loginUser, getUser, changeUserAvatar, editUser , getAllUsers
}