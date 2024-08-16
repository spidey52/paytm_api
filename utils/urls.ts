const BASE_URL = "https://developer.paytmmoney.com";

const LOGIN_URL = `${BASE_URL}/merchant-login`;
const GET_TOKEN_URL = `${BASE_URL}/accounts/v2/gettoken`;

const USER_DETAILS_URL = `${BASE_URL}/accounts/v1/user/details`;
const FUND_DETAILS_URL = `${BASE_URL}/accounts/v1/funds/summary`;
const HOLDINGS_URL = `${BASE_URL}/holdings/v1/get-holdings-value`;
const LIVE_DATA_URL = `${BASE_URL}/data/v1/price/live/`;

const API_URL = {
 LOGIN_URL,
 GET_TOKEN_URL,
 USER_DETAILS_URL,
 FUND_DETAILS_URL,
 HOLDINGS_URL,
 LIVE_DATA_URL,
};

export default API_URL;
