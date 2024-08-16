import { Request, Response } from "express";
import myenv from "../config/myenv";
import PaytmHelpers from "../utils/helpers";

// const apiKey = "";
// const apiSecretKey = "";

const apiKey = myenv.API_KEY;
const apiSecretKey = myenv.API_SECRET_KEY;

const getLoginUrl = async (req: Request, res: Response) => {
 console.log(apiKey, "apiKey");
 console.log(apiSecretKey, "apiSecretKey");

 const url = `https://login.paytmmoney.com/merchant-login?apiKey=${apiKey}&state=${"value"}`;

 return res.redirect(url);
};

const accessTokenGeneration = async (req: Request, res: Response) => {
 const query = req.query;
 const requestToken = query.requestToken;

 await PaytmHelpers.generateAccessToken({
  request_token: requestToken as string,
  api_key: apiKey,
  api_secret_key: apiSecretKey,
 });

 //  await PaytmHelpers.saveAccessToken(apiAccessData);

 console.log(query);
 res.send({ message: "Hello", query });
};

const AuthHandler = {
 getLoginUrl,
 accessTokenGeneration,
};

export default AuthHandler;
// export default { getLoginUrl, accessTokenGeneration };
