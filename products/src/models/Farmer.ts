import mongoose from "mongoose";

export type FarmerDocument = mongoose.Document & {
  farmerName: String;
  farmingType: string;
  mobileNum: String;
  location: String;
};

const farmerSchema = new mongoose.Schema({
  farmerName: String,
  farmingType: String,
  mobileNum: String,
  location: String,
});

export const Farmer = mongoose.model<FarmerDocument>("Farmer", farmerSchema);
