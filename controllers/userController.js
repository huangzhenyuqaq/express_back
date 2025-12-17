const db=require('../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {jwtSecretKey}=require('../config/jwtSecretKey')


//注册接口
exports.register=async(req,res)=>{
  let  {password,userName}=req.body
  if(!password||!userName){
    return res.send({code:1,msg:'用户名或者密码不能为空！'})
  }
  const userSelectSql='select * from user where name=?'
  db.query(userSelectSql,userName,(err,results)=>{
    if(err){
      return res.send({code:1,msg:'注册失败'})
    }
    if(results.length>0){
      return res.send({code:1,msg:'用户名已存在'})
    }
    const passwordB = bcrypt.hashSync(password,10)
    
    // 随机生成头像
    // 头像列表
    const imgList = [
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/10.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/11.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/12.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/13.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/14.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/15.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/16.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/17.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/18.jpeg',
      'https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/default/head_img/19.jpeg',
    ];
       // 随机生成1-10的整数
    const num = Math.floor(Math.random() * 10 + 1);
    // 用户信息插入数据库
    const userInsertSql="INSERT INTO user (name,pwd,head_img) value (?,?,?)"
    db.query(userInsertSql,[userName,passwordB,imgList[num]],(err,results)=>{
      if(err){
        return res.send({code:1,msg:'注册失败'})
      }
      res.send({code:0,data:'注册成功'})
    })
  })
}
//登录接口
exports.login=async(req,res)=>{
    let {userName,password}=req.body
    if(!userName||!password){
        return res.send({code:1,msg:'用户名或者密码不能为空！'})
    }
    const userSelectSql='select * from user where name=?'
    db.query(userSelectSql,userName,(err,results)=>{
        if(err){
            return res.send({code:1,msg:'登录失败'})
        }
        if(results.length<=0){
            return res.send({code:1,msg:'用户名不存在,请先注册！'})
        }
        const user=results[0]
        const compareResult=bcrypt.compareSync(password,user.pwd)
        if(!compareResult){
            return res.send({code:1,msg:'密码错误'})
        }
        const userInfo={...results[0],pwd:""}
        const token=jwt.sign(userInfo,jwtSecretKey,{expiresIn:'24h'})
        res.send({code:0,msg:'登录成功',token:"Bearer "+token})
    })
}

//查询用户信息
exports.userInfoController=async(req,res)=>{
    const token=req.headers.authorization
    const userInfo=jwt.verify(token.split('Bearer ')[1],jwtSecretKey)
   res.send({code:0,msg:'查询用户信息成功',data:{
    name:userInfo.name,
    headImg:userInfo.head_img
   }})
}


