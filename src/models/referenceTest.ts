//dependecies
import { model, models, Schema } from "mongoose";

const reference_testSchema: Schema = new Schema(
  {
    name: { type: String },
    test: { type: Schema.Types.ObjectId, ref: "test" },
  },

  { timestamps: true }
);
export default models["reference_test"]
  ? model<any>("reference_test")
  : model<any>("reference_test", reference_testSchema);
