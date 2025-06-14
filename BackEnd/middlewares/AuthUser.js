import jwt from "jsonwebtoken";
const AuthUser = async (req, res, next) => {
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
      console.log("userId"+decoded_token.id)
      req.body.userId = decoded_token.id;
   

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default AuthUser;
