const db=require('../config/db')
exports.listVideo=async (req,res)=>{
    let {category,page,size}=req.query
    page=(page-1)*size
    size=size

    const pageSql='select * from video where del=0 and (category=? OR category="all") order by id limit ?,?'

    //查询课程总数的SQL
    const totalSql='select count(*) as total from video where del=0 and (category=? OR category="all")'


    db.query(pageSql,[category,Number(page),Number(size)],(err,result)=>{
        if(err){
            res.send({code:1,msg:'查询课程列表失败'})
            return
        }
       db.query(totalSql,category,(err,totalResult)=>{
            if(err){
                res.send({code:1,msg:'查询课程总数失败'})
                return
            }
            res.send({code:0,msg:'查询课程列表成功',
                data:{
                  list:result,
                  total:totalResult[0].total
                }
            })
        })
    })
    // db.query(totalSql,[category],(err,totalResult)=>{
    //     if(err){
    //         res.send({code:1,msg:'查询课程总数失败'})
    //         return
    //     }
    //     res.send({code:0,msg:'查询课程列表成功',data:result,total:totalResult[0].total})
    // })
    // res.send('listVideo')
}
exports.updateVideoById=async (req,res)=>{
    let {title,price,id,}=req.query
    const sql='update video set title=?,price=? where id=?'
    db.query(sql,[title,Number(price),Number(id)],(err,result)=>{
        if(err){
            res.send({code:1,msg:'更新课程失败'})
            return
        }
        res.send({code:0,msg:'更新课程成功'})
    })
}
//课程删除
exports.deleteVideoById=async (req,res)=>{
    let {id}=req.query
    const sql='update video set del=1 where id=?'
    db.query(sql,Number(id),(err,result)=>{
        if(err){
            res.send({code:1,msg:'删除课程失败'})
            return
        }
        res.send({code:0,msg:'删除课程成功'})
    })
}