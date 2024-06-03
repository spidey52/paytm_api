import { Request, Response } from "express";
import PaytmHelpers from "../utils/helpers";

// const apiKey = "";
// const apiSecretKey = "";

const apiKey = process.env.API_KEY || "";
const apiSecretKey = process.env.API_SECRET_KEY || "";
// const apiKey = "75fb266ed75e40a4872e64377cf39d82";
// const apiSecretKey = "7fcb9998925a4a15a8349968f50ce027";

const getLoginUrl = async (req: Request, res: Response) => {
 //  const apiAccessData = await PaytmHelpers.getApiAccessData();

 //  const apiKey = apiAccessData.api_key;

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
