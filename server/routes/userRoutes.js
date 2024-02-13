const {Router} = require('express')

const  {registerUser, loginUser, getUser, changeUserAvatar, editUser , getAllUsers} = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/:id', getUser)
router.get('/', getAllUsers)
router.post('/change-avatar', authMiddleware, changeUserAvatar )
router.patch('/edit-user', authMiddleware,  editUser)

module.exports = router