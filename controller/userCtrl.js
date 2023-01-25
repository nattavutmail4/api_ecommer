const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const {generateToken} = require('../config/jwtToken')
const validateMongoDbId = require('../utils/validateMongodid')

//ฟังกชั่นสร้างข้อมูลสมาชิก
const createUser = asyncHandler( async (req, res) => {
    const email = (req.body.email)
    const findUser = await User.findOne({email:email}) //ค้นหาอีเมล์ด้วยคำสั่ง findOne
    if(!findUser){
        const newUser = await User.create(req.body)
       return res.json({
            msg:"create user successfully",
            response:newUser
        }).status(201)
    }else{
       throw new Error ('User Already Exists')
    }
})


//ฟังกชั่น login
const loginUserCtrl = asyncHandler( async (req, res) => {
    const {email, password } = req.body 
    //check if user exists or not
    const findUser = await User.findOne({email:email}) //ค้นหา อีเมล์
    // isPasswordMatched คือการไปที่ฟังชั่นดั่งกล่าวแล้วให้ bcrypt.compare รหัสผ่าน
    if(findUser && await findUser.isPasswordMatched(password)){

       // ข้อมูลที่ถูกส่งออกไปแสดง 
       return res.json({
            _id: findUser?._id,
            firstname:findUser?.firstname,
            lastname:findUser?.lastname,
            email:findUser?.email,
            mobile:findUser?.mobile,
            token:generateToken(findUser?._id)
       }).status(200)
    }else{
        //กรณี login ไม่สำเร็จ
        throw new Error("Invalid Credentials")
    }
})

// ฟังกชัน getAlluser
const getallUser = asyncHandler( async ( req, res) => {
    try {
      const getUsers = await User.find() // find in mongodb คือดึงข้อมูลทั้งหมด
      return res.json(getUsers).status(200)
    } catch (error) {
        throw new Error(error)
    }
})

// ฟังชั่นค้นหายูสแบบ 1ต่อ 1
const getaUser = asyncHandler(async (req, res) => {
    //รับค่า id จาก params ที่แนบมาจาก url :exmple:500/1
    // localhost:4000/api/user/63cb95ff0765669fb14e08fe
    const id  = req.params.id 
    validateMongoDbId(id)

    try {
        const getUsers = await User.findById(id)
        return res.json(getUsers)
    } catch (error) {
        throw new Error(error)
    }
})


const deleteUser = asyncHandler(async (req, res) => {
    //รับค่า id จาก params ที่แนบมาจาก url :exmple:500/1
    // localhost:4000/api/user/63cb95ff0765669fb14e08fe
    const id  = req.params.id 
    validateMongoDbId(id)

    try {
        const getUsers = await User.findByIdAndDelete(id) //ลบข้อมูลด้วยคำสั่ง findByIdAndDelete
        return res.json(getUsers)
    } catch (error) {
        throw new Error(error)
    }
})


const updatedUser = asyncHandler( async (req, res) => {
    const  { id } = req.params
    validateMongoDbId(id)
    try {
        //findByIdAndUpdate เป็นคำสั่งสำหรับอัพเดทข้อมูลของ mongodb
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                firstname: req?.body?.firstname,
                lastname: req?.body?.lastname,
                email: req?.body?.email,
                mobile: req?.body?.mobile
            },
            {
                new: true
            }
        )
        return res.json(updatedUser).status(200)
    } catch (error) {
        throw new Error(error)
    }
})

const blockUser = asyncHandler( async (req,res) => {
    const  { id } = req.params
    validateMongoDbId(id)

    try {
        const block = await User.findByIdAndUpdate(id,
            {
                isBlocked:true
            },
            {
                new:true
            }
        )
        return res.json({
            message:"User Blocked",
            response:{block}
        })
    } catch (error) {
        throw new Error(error)
    }
})

const unblockUser = asyncHandler( async (req, res) => {
    const  { id } = req.params
    validateMongoDbId(id)
    try {
        const unblock = await User.findByIdAndUpdate(id,
            {
                isBlocked:false
            },
            {
                new:true
            }
        )
        return res.json({
            message:"User UnBlocked",
            response:{unblock}
        })
    } catch (error) {
        throw new Error(error)
    }
})


// export function ไปใช้
module.exports = { 
    createUser, loginUserCtrl , getallUser , getaUser, deleteUser , updatedUser,
    blockUser, unblockUser
}