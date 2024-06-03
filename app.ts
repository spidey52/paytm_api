import express from "express";
import fs from "fs/promises";
import AuthHandler from "./handlers/auth.handler";
import OrderHandler from "./handlers/orders.handler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/login-url", AuthHandler.getLoginUrl);
app.get("/access-token", AuthHandler.accessTokenGeneration);

// funds

app.get("/funds", OrderHandler.getFundDetailsHandler);

app.post("/postback-paytm", async (req, res) => {
 try {
  const data = req.body;

  await fs.appendFile("postback.txt", JSON.stringify(data) + "\n");

  return res.status(200).send({ message: "Success" });
 } catch (error) {
  console.error(error);
  res.status(500).send("Internal Server Error");
 }
});

app.get("/download-postback", async (req, res) => {
 try {
  const data = await fs.readFile("postback.txt", "utf-8");
  return res.status(200).send(data);
 } catch (error) {
  console.error(error);
  res.status(500).send("Internal Server Error");
 }
});

export default app;
