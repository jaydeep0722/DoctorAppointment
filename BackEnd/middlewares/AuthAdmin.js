import jwt from "jsonwebtoken";
const AuthAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers;
    // console.log(atoken)
    if (!atoken) {
     return   res.status(400).json({
        success: false,
        message: "Please Enter Token to verify",
      });
    }

    // first decode token and then match if same or not
    const decoded_token = jwt.verify(atoken, process.env.JWT_SECRETKEY);
    if (
      decoded_token !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res.json({success:false,message:'Not Authorized Login Again'})
     
    } 
    console.log("Middleware:token verified")
    

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default AuthAdmin;
