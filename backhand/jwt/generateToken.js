import jwt from "jsonwebtoken";


const createTokenandSaveCookie =(userId ,res )=>{

    const token  = jwt.sign({userId},process.env.JWT_TOKEN,{
        expiresIn:'5d',
    })
res.cookie("jwt" ,token,{
    httpOnly:true ,//xss
    secure:false,
    sameSite:"strict" //csrf
})
};
export default createTokenandSaveCookie;