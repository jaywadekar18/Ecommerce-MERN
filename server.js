const express = require("express");
const app = express();
var cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRouter");
const orderRouter = require("./routes/orderRouter");
const reviewRouter = require("./routes/reviewRouter");
const { errorHandler, notFound } = require("./middleware/errorHandler");
const { MOGOURI } = require("./config/keys");
mongoose
  .connect(
    "mongodb+srv://jaywadekar:jaywadekar@cluster0.8p6ea.mongodb.net/ecommerce?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }
  )
  .then(() => {
    console.log("Connected mongoose");
  })
  .catch((err) => {
    console.log("Mongoose connection error", err);
  });
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

global.appRoot = path.resolve(__dirname);
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);

app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.join(__dirname, "client", "build")));


  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/public/index.html"));
  });
}
// if (process.env.NODE_ENV == "production") {
//   console.log("in");
//   const path = require("path");

//   app.get("/", (req, res) => {
//     app.use(express.static(path.resolve(__dirname, "client", "build")));
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
app.use(notFound);
app.listen(port, () => {
  console.log(`Connection successful at ${port}`);
});
