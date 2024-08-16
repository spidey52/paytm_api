import axios from "axios";
import dotenv from "dotenv";
import app from "./app";
import PaytmHelpers from "./utils/helpers";
import API_URL from "./utils/urls";
dotenv.config();

console.log(process.env.API_KEY);

const PORT = 4002;

const getLiveData = async () => {
 try {
  const pref = ["NSE:11630:EQUITY"];

  const params = {
   mode: "LTP",
   pref: pref.join(","),
  };

  const authHeaders = await PaytmHelpers.getAuthHeaders();
  const { data } = await axios.get(API_URL.LIVE_DATA_URL, {
   headers: authHeaders,
   params,
  });

  // const liveData = data.data as LiveData;

  console.log(data);

  // console.log(liveData);
 } catch (error: any) {
  console.log(error?.response?.data);
  // return handleApiError(error);
 }
};

getLiveData();

app.listen(PORT, () => {
 console.log("Server running on port " + PORT);
});
