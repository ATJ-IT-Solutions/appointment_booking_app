import jwt from 'jsonwebtoken'

const authAdmin = async(req,res,next) => {

    try{

        const {atoken} = req.headers
  
        if (!atoken){
            return res.json({success:false,message:"Not Authorized! Please try again"})
        }
        const token_decode = jwt.verify(atoken,process.env.TOKEN_SECRET)

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"Not Authorized! Please try again"})
        }

        next()

    }
    catch (error){
        console.log(error)
        res.send({success:false,message:error.message})
    }
}

export default authAdmin