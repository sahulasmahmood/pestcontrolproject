import mongoose from "mongoose";

const serviceTypeSchema = new mongoose.Schema(
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
serviceTypeSchema.index({ name: 1, isDeleted: 1 });

const ServiceType = mongoose.models.ServiceType || mongoose.model("ServiceType", serviceTypeSchema);

export default ServiceType;
