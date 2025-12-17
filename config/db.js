const mysql=require('mysql')
const db=mysql.createPool({
    host:'106.15.42.207',
    user:'root',
    password:'express.net168',
    database:'express_test'
})
module.exports=db