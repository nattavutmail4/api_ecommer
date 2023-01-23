const express = require('express')
const router = express.Router()
const {
    getaUser,
    getallUser,
    createUser,
    loginUserCtrl,
    deleteUser,
    updatedUser,
    unblockUser,
    blockUser
} = require('../controller/userCtrl')

const  {authMiddleware , isAdmin}  = require('../middlewares/authMiddleware')

router.get('/all-users',getallUser)
router.get('/:id', authMiddleware, isAdmin, getaUser)

router.post('/register', createUser)
router.post('/login', loginUserCtrl)

router.put('/:id',authMiddleware, updatedUser)

router.put('/block-user/:id',authMiddleware, isAdmin ,blockUser)
router.put('/unblock-user/:id',authMiddleware, isAdmin ,unblockUser)

router.delete('/:id', authMiddleware, deleteUser)

module.exports = router