import mongoose from "mongoose";

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  list: {
    type: Array,
    unique: true,
    default: [String],
  },
});

export default mongoose.model("List", ListSchema);
