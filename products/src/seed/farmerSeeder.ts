import { Farmer } from "../models/Farmer";
let bluebird = require("bluebird");
let mongoose = require("mongoose");
mongoose.Promise = bluebird;

const mongoUrl =
  "mongodb+srv://sindhu:sindhu1234@customers-9xbiq.mongodb.net/products?retryWrites=true&w=majority";
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch((err: any) => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
  });

const farmers = [
  new Farmer({
    farmerName: "dummy1",
    farmingType: "natural",
    mobileNum: "123456781",
    location: "32256",
  }),
  new Farmer({
    farmerName: "dummy2",
    farmingType: "natural",
    mobileNum: "123456782",
    location: "32256",
  }),
  new Farmer({
    farmerName: "dummy3",
    farmingType: "natural",
    mobileNum: "123456783",
    location: "32256",
  }),
  new Farmer({
    farmerName: "dummy4",
    farmingType: "natural",
    mobileNum: "123456784",
    location: "32256",
  }),
  new Farmer({
    farmerName: "dummy5",
    farmingType: "natural",
    mobileNum: "123456785",
    location: "32256",
  }),
];

let done = 0;
for (let i = 0; i < farmers.length; i++) {
  farmers[i].save(function (err: any, result: any) {
    done++;
    if (done === farmers.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
