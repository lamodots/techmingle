const {Router} = require('express')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

const { createPost,getPosts, getPost, getPostsCategory, getUserPost, editPost, deletePost }= require('../controllers/postsControllers');




router.post('/',authMiddleware, createPost )
router.get('/',getPosts)
router.get('/:id',getPost )
router.patch('/:id', authMiddleware,  editPost)
router.get('/categories/:category', getPostsCategory )
router.get('/users/:id', getUserPost )
router.delete('/:id', authMiddleware , deletePost )

module.exports = router