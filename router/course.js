const express = require('express')
const router = express.Router()
const joi = require('@escook/express-joi')
const {findCourseCheck,updateCourseCheck,deleteCourseCheck} = require('../utils/check')

const courseController=require('../controllers/courseController')


router.get('/find',joi(findCourseCheck),courseController.listVideo)

router.get('/update',joi(updateCourseCheck),courseController.updateVideoById);

router.get('/delete',joi(deleteCourseCheck),courseController.deleteVideoById);
module.exports = router