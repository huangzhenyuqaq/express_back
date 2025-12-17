const joi = require('joi')
const userName = joi.string().pattern(/^[\S]{1,6}$/).required();
const password = joi.string().pattern(/^[\S]{6,15}$/).required();


exports.userCheck={
    body:{
        userName,
        password
    }
}

//课程查询参数的校验规则
const category=joi.string().required();
const page=joi.number().integer().required();
const size=joi.number().integer().required();
exports.findCourseCheck={
   query:{
       category,
       page,
       size
   }
}




//课程更新参数的校验规则
const id=joi.number().integer().required();
const title=joi.string().required();
const price=joi.number().integer().required();
exports.updateCourseCheck={
    query:{
        id,
        title,
        price
    }
}
//课程删除参数的校验规则
exports.deleteCourseCheck={
    query:{
        id
    }
}