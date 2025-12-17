const express = require('express')
const bodyParser = require('body-parser')

const app = express()
// const PORT = process.env.PORT || 80; // 默认端口 5000
// const HOST = process.env.HOST || '192.168.71.24'; // 监听所有网络接口
// 解析请求体中的 JSON 数据
app.use(bodyParser.json())
// 解析请求体中的 URL-encoded 数据
app.use(bodyParser.urlencoded({ extended: false }))



const cors=require('cors')
//解决接口跨域问题
app.use(cors())
//解析json格式得数据
app.use(express.json())
//解析urlencoded格式得数据
app.use(express.urlencoded({extend:false}))

//解析token校验 及哪些接口需要token
const expressJWT=require('express-jwt')
const {jwtSecretKey}=require('./config/jwtSecretKey')
app.use(expressJWT({secret:jwtSecretKey,algorithms:['HS256']}).unless({path:['/api/v1/user/login','/api/v1/user/register']}))



//用户相关得接口
const userRouter=require('./router/user')
app.use('/api/v1/user',userRouter)

//课程相关的接口
const courseRouter=require('./router/course')
app.use('/api/v1/course',courseRouter)
const joi = require('joi')
app.use((err,req,res,next)=>{
    //joi 表单得用户信息校验失败
    if(err instanceof joi.ValidationError){
        return res.send({code:1,msg:err.message})
    }
    //身份认证失败
    console.log(err.name)
    if(err.name==='UnauthorizedError'){
        return res.send({code:1,msg:'身份认证失败'})
    }
    //其他未知错误
    res.send({code:1,msg:'未知错误'})
})
// app.listen(PORT,HOST, () => {
//     console.log(`Server running at http://${HOST}:${PORT}`);
//     // console.log('服务器启动成功')
// })
app.listen(8061, () => {
    console.log('服务器启动成功')
})