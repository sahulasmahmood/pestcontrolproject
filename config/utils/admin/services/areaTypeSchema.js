import mongoose from "mongoose";

const areaTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
/*     isDeleted: {
      type: Boolean,
      default: false,
    }, */
  },
  {
    timestamps: true,
  }
);

// Index for better performance
areaTypeSchema.index({ name: 1, isDeleted: 1 });

const AreaType = mongoose.models.AreaType || mongoose.model("AreaType", areaTypeSchema);

export default AreaType;
