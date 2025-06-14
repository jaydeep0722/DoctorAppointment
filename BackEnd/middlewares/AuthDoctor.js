import jwt from "jsonwebtoken";
const AuthDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    // console.log(dtoken)
    if (!dtoken) {
      return res.status(400).json({
        success: false,
        message: "Please Enter Token to verify",
      });
    }

    // first decode token and then match if same or not
    const decoded_token = jwt.verify(dtoken, process.env.JWT_SECRETKEY);
    console.log("docId" + decoded_token.id);
    req.body.docId = decoded_token.id;

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default AuthDoctor;
