import axios from "axios";
import fs from "fs/promises";
import { AccessTokenSaver, ApiAccessData, AuthHeadersGenerator, FundSummary, HoldingsValue } from "../types";
import API_URL from "./urls";

const getApiAccessData = async () => {
 const data = await fs.readFile("token.txt", "utf-8");

 if (data === "") {
  return {
   merchant_id: "",
   channel_id: "",
   api_key: "",
   access_token: "",
  } as ApiAccessData;
 }

 return JSON.parse(data) as ApiAccessData;
};

const getAuthHeaders: AuthHeadersGenerator = async () => {
 const token = (await getApiAccessData()).access_token;

 return {
  "x-jwt-token": token,
 };
};

const generateAccessToken = async ({ api_key, api_secret_key, request_token }: { api_key: string; api_secret_key: string; request_token: string }) => {
 try {
  const { data } = await axios.post(API_URL.GET_TOKEN_URL, {
   api_key,
   api_secret_key,
   request_token,
  });

  await saveAccessToken(data);
 } catch (error: any) {
  return handleApiError(error);
 }
};

const getFundDetails = async () => {
 try {
  const authHeaders = await getAuthHeaders();
  const { data } = await axios.get(API_URL.FUND_DETAILS_URL, {
   headers: authHeaders,
  });

  const fundSummary = data.data.funds_summary as FundSummary;

  // await fs.writeFile("fund-details.txt", JSON.stringify(fundSummary, null, 2));

  return fundSummary;
 } catch (error: any) {
  return handleApiError(error);
 }
};

const getHoldingsValue = async () => {
 try {
  const authHeaders = await PaytmHelpers.getAuthHeaders();
  const { data } = await axios.get(API_URL.HOLDINGS_URL, {
   headers: authHeaders,
  });

  const holdingsValue = data.data.results as HoldingsValue;

  const printValue = {
   currentValue: holdingsValue[0].cv,
   investmentValue: holdingsValue[0].iv,
   timestamp: new Date(holdingsValue[0].timestamp).toLocaleString(),
  };
  console.log(printValue);
 } catch (error: any) {
  return handleApiError(error);
 }
};

const getUserDetails = async (token: string) => {
 try {
  const authHeaders = await PaytmHelpers.getAuthHeaders();
  const { data } = await axios.get(API_URL.USER_DETAILS_URL, {
   headers: authHeaders,
  });

  console.log(data);
 } catch (error: any) {
  return handleApiError(error);
 }
};

const handleApiError = (error: any) => {
 console.log(error?.response?.data || error.message);
 return error;
};

const saveAccessToken: AccessTokenSaver = async (token) => {
 await fs.writeFile("token.txt", JSON.stringify(token, null, 2));
};

const PaytmHelpers = {
 getApiAccessData,
 getAuthHeaders,

 generateAccessToken,
 saveAccessToken,
 getFundDetails,
};

export default PaytmHelpers;
