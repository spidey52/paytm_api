type AuthHeaders = {
 "x-jwt-token": string;
};

type AccessToken = {
 merchant_id: string;
 channel_id: string;
 api_key: string;
 access_token: string;
 public_access_token: string;
 read_access_token: string;
};

type FundSummary = {
 trade_balance: number;
 utilised_amount: number;
 withdrawal_balance: number;
 adhoc_limit: number;
 opening_balance: number;
 funds_added: number;
 collaterals: number;
 available_cash: number;
 available_sgb_cash: number;
};

type HoldingsValue = {
 cv: string;
 iv: string;
 timestamp: string;
}[];

type AuthHeadersGenerator = () => Promise<AuthHeaders>;
type AccessTokenSaver = (token: AccessToken) => Promise<void>;

type ApiAccessData = {
 merchant_id: string;
 channel_id: string;
 api_key: string;
 access_token: string;
 public_access_token: string;
 read_access_token: string;
};

export type { AccessToken, AccessTokenSaver, ApiAccessData, AuthHeaders, AuthHeadersGenerator, FundSummary, HoldingsValue };
