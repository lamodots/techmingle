const Post = require("../models/postsModels")
const User = require('../models/userModels')
const path = require('path')
const fs = require('fs')
const {v4: uuid} = require('uuid')
const AppError = require('../models/errorModel')


/**
 * CREATE A POST
 * POST: api/posts
 * PROTECTED
 * 
 * * */
const createPost = async (req, res, next) => {
  try {
    let { title, category , description } = req.body;
    if(!title, !category, !description,  !req.files) {
        return next(new AppError("Fill in all fields and choose thuimbnail.", 422))
    }
    const { thumbnail } = req.files;
  
    // check file sise
    if(thumbnail.size > 2000000){
        return next(new AppError("Thumbnail too big. File should be less than 2mb", 422))
    }
    let fileName = thumbnail.name;
    let splittedFilename = fileName.split('.')
    let newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length - 1];
 
    thumbnail.mv(path.join(__dirname, '..', '/uploads', newFilename), async (err)=> {
            if(err){
                return next(new AppError(err))
            }else {
                const newPost =  await Post.create({title, category, description, thumbnail: newFilename, creator:req.user.id})
                if(!newPost){
                    return next(new AppError("Post couldn't be created.", 422))
                }

                // find user and Increase post count by 1
                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser.posts + 1;
                await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})

                res.status(201).json(newPost)
            }
    })
  } catch (error) {
    return next(new AppError(error))
  }
}

/**
 * GET ALL POST
 * GET: api/posts
 * UNPROTECTED
 * 
 * * */
const getPosts  = async (req, res, next) => {
    try {
        const allPost = await Post.find().sort({updatedAt: -1})
        if(!allPost || allPost.length === 0){
            return next(new AppError("No post made yet!", 422))
        }

        res.status(201).json(allPost)
    } catch (error) {
        return next(new AppError(error))
    }
}

/**
 * GET SINGLE POST
 * POST: api/posts/:id
 * UNPROTECTED
 * 
 * * */
const getPost = async (req, res, next) => {
    try {
        const {id} = req.params;
        const post = await Post.findById(id)

        if(!post){
            return next(new AppError("Post not found", 404))
        }
        res.status(200).json(post)
    } catch (error) {
        return next(new AppError(error))
    }
}

/**
 * GET POSTS BY CATEGORY A POST
 * GET: api/posts/categories/:category
 * UNPROTECTED
 * 
 * * */
const getPostsCategory = async (req, res, next) => {
    try {
        const { category} = req.params;
        const categoryPost = await Post.find({category}).sort({createdAt: -1})
        res.status(200).json(categoryPost)
    } catch (error) {
        return next(new AppError(error))
    }
}

/**
 * GET POST BU AUTHOR
 * GET: api/posts/users/:id
 * UNPROTECTED
 * 
 * * */
const getUserPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const posts = await Post.find({creator: id}).sort({createdAt: -1})
        res.status(200).json(posts)
    } catch (error) {
        return next(new AppError(error))
    }
}

/**
 *EDIT POST
 * PATCH: api/posts/:id
 * PROTECTED
 * 
 * * */
const editPost = async (req, res, next) => {
    try {
        let fileName;
        let newFilename;
        let updatedPost;
        const {id} = req.params
        let {title, category, description} = req.body;

        /**
         * 
         * I am doing this description.length < 12  because the ReactQuill has already characters and they a 11 .
         */
        if(!title || !category || description.length < 12 ){
            return next(new AppError("Fill in all fields", 422))
        }

        if(!req.files){
            updatedPost  = await Post.findByIdAndUpdate(id, {title, category, description}, {new:true})
        }else{
            // Get old post from database
            const oldPost = await Post.findById(id)
            //delete old thumbnail from upload
            if(req.user.id === oldPost.creator){
                fs.unlink(path.join(__dirname, "..", "uploads" , oldPost.thumbnail), async (err)=> {
                    if(err){
                        return next(new AppError(err))
                    }
                    
                })
                //upload new thumbnail
                const { thumbnail} = req.files;
                if(thumbnail.size > 2000000){
                    return next(new AppError("Thumbnail too big.Should be less than 2mb"))
                }
    
                fileName = thumbnail.name;
                let splittedFilename = fileName.split('.');
                newFilename = splittedFilename[0] + uuid + "." + splittedFilename[splittedFilename.length - 1];
                //Now upload thumbnail
                thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err)=> {
                        if(err){
                            return next(new AppError(err))
                        }
                })
    
                updatedPost = await Post.findByIdAndUpdate(id, {title, category, description, thumbnail:newFilename}, {new:true})
            }
    
            if(!updatedPost){
                return next(new AppError(error))
            }
    
            res.status(200).json(updatedPost)
            }
    } catch (error) {
        return next(new AppError(error))
    }
}
/**
 * DELETE POST
 * DELETE: api/posts/:id
 * PROTECTED
 * 
 * * */
const deletePost = async (req, res, next) => {
    try {
        const {id} = req.params;
        if(!id){
            return next(new AppError("Post Unavailable", 400))
        }
        const post = await Post.findById(id)

        //I need to delete the Thumbnail before deleteing the user
        const fileName = req.files;
      if(req.user.id === post.creator){
        fs.unlink(path.join(__dirname, "..", "uploads", fileName), async (err)=>{
            if(err){
                return next(new AppError(error))
            }else{
                // if everythin went well, we want to delete the post
                await Post.findByIdAndDelete(id)
                // Once we delete the post we want to reduce the user post cound
                const currentUser =  await User.findById(req.user.id)
                const userPostCount = currentUser?.posts - 1;
                await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})
                res.json(`Post ${id} deleted sucessfully! .`)
            }
    })
      }
    } catch (error) {
        return next(new AppError(error))
    }
}

module.exports = { createPost,getPosts, getPost, getPostsCategory, getUserPost, editPost, deletePost }