//dependecies
import { model, models, Schema } from "mongoose";

const testSchema: Schema = new Schema(
  {
    name: { type: String },
  },

  { timestamps: true }
);
export default models["test"]
  ? model<any>("test")
  : model<any>("test", testSchema);
