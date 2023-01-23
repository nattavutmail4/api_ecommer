const jwt = require('jsonwebtoken')

const generateToken = ( id ) => {
    // jwt.sing เป็นการ generatetoken ที่รับค่าจาก id และ + jwt secret ที่เราสร้างมาเอง 
    // expiresIN กำหนดอายุของ token 3d เท่ากับ3วัน
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn:"3d"})
}

module.exports =  { generateToken}