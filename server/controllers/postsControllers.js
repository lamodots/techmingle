
/**
 * CREATE A POST
 * POST: api/posts
 * PROTECTED
 * 
 * * */
const createPost = async (req, res, next) => {
    res.json("Create Post")
}

/**
 * GET ALL POST
 * GET: api/posts
 * UNPROTECTED
 * 
 * * */
const getPosts  = async (req, res, next) => {
    res.json("aLL Post")
}

/**
 * GET SINGLE POST
 * POST: api/posts/:id
 * UNPROTECTED
 * 
 * * */
const getPost = async (req, res, next) => {
    res.json("get 1 Post")
}

/**
 * GET POSTS BY CATEGORY A POST
 * GET: api/posts/categories/:category
 * UNPROTECTED
 * 
 * * */
const getPostsCategory = async (req, res, next) => {
    res.json("Category Post")
}

/**
 * GET POST BU AUTHOR
 * GET: api/posts/users/:id
 * UNPROTECTED
 * 
 * * */
const getUserPost = async (req, res, next) => {
    res.json("Get user  Post")
}

/**
 *EDIT POST
 * PATCH: api/posts/:id
 * PROTECTED
 * 
 * * */
const editPost = async (req, res, next) => {
    res.json("Edit Post")
}
/**
 * DELETE POST
 * DELETE: api/posts/:id
 * PROTECTED
 * 
 * * */
const deletePost = async (req, res, next) => {
    res.json("Delete Post")
}

module.exports = { createPost,getPosts, getPost, getPostsCategory, getUserPost, editPost, deletePost }