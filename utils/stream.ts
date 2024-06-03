import { ApiAccessData } from "../types";
import PaytmHelpers from "./helpers";

const connectWs = async () => {
 // make a websocket connection
 const apiAccessData: ApiAccessData = await PaytmHelpers.getApiAccessData();

 var socket = new WebSocket(`wss://developer-ws.paytmmoney.com/broadcast/user/v1/data?x_jwt_token=${apiAccessData.access_token}`);

 const preferences = [
  {
   actionType: "ADD",
   modeType: "FULL",
   scripType: "INDEX",
   exchangeType: "NSE",
   scripId: "13",
  },
  {
   actionType: "ADD",
   modeType: "LTP",
   scripType: "EQUITY",
   exchangeType: "BSE",
   scripId: "523144",
  },
 ];

 socket.onopen = function (e) {
  console.log("[open] Connection established");
  console.log("Sending to server");

  socket.send(JSON.stringify(preferences));
 };

 socket.onmessage = function (event) {
  const byteData = event.data;

  if (byteData instanceof ArrayBuffer) {
   console.log("Array Buffer");

   const dv = new DataView(byteData);
   // Example: Read an integer at position 0
   const value = dv.getInt32(0, true); // true for little-endian
   console.log("Parsed binary data:", value);
  }

  if (typeof byteData === "string") {
   console.log("Received data:", byteData);
  }

  if (byteData instanceof Blob) {
   console.log("Received Blob");
  }

  if (byteData instanceof Buffer) {
   const dv = new DataView(byteData.buffer);
   const value = dv.getInt32(0, true); // true for little-endian
  }
 };
};

export default connectWs;
