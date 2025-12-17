const express = require('express')
const router = express.Router()

const userController=require('../controllers/userController')
const joi = require('@escook/express-joi')
// const { login_schema, register_schema } = require('../schema/user')
const {userCheck} = require('../utils/check')
router.post('/register',joi(userCheck),userController.register)
//登录
router.post('/login',joi(userCheck),userController.login)
//查询用户信息
router.get('/userInfo',userController.userInfoController)

module.exports = router