import { Request, Response } from "express";
import PaytmHelpers from "../utils/helpers";

const getFundDetailsHandler = async (req: Request, res: Response) => {
 try {
  const fundDetails = await PaytmHelpers.getFundDetails();

  return res.send({ data: fundDetails });
 } catch (error) {
  return res.status(500).send({ message: "Internal Server Error" });
 }
};

const OrderHandler = {
 getFundDetailsHandler,
};

export default OrderHandler;
