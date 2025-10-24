import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    serviceType: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    shortDescription: {
      type: String,
      required: false,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    basePrice: {
      type: String,
      required: false,
      trim: true
    },
    coverageArea: {
      type: String,
      required: false,
      trim: true
    },
    serviceAreaTypes: [{
      type: String,
      trim: true
    }],
    image: {
      type: String,
      required: true,
      trim: true
    },
    gallery: [{
      type: String,
      trim: true
    }],
    featured: {
      type: Boolean,
      default: false,
      index: true
    },
    inclusions: [{
      type: String,
      trim: true
    }],
    pests: [{
      type: String,
      trim: true
    }],
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true
    },
    seoTitle: {
      type: String,
      required: false,
      trim: true,
      maxlength: 200,
    },
    seoDescription: {
      type: String,
      required: false,
      trim: true,
      maxlength: 300,
    },
    seoKeywords: {
      type: String,
      required: false,
      trim: true,
    },
    views: {
      type: Number,
      default: 0
    },
    bookings: {
      type: Number,
      default: 0
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance
serviceSchema.index({ status: 1, featured: -1, createdAt: -1 });
serviceSchema.index({ serviceType: 1, status: 1 });
serviceSchema.index({ serviceName: "text", description: "text" });

// Pre-save middleware to limit featured services
serviceSchema.pre("save", async function (next) {
  if (this.featured && this.isModified("featured")) {
    const featuredCount = await this.constructor.countDocuments({ 
      featured: true, 
      _id: { $ne: this._id },
      isDeleted: false 
    });
    
    if (featuredCount >= 3) {
      const error = new Error("Maximum 3 services can be featured at a time");
      error.name = "ValidationError";
      return next(error);
    }
  }
  next();
});

// Static method to get featured services
serviceSchema.statics.getFeatured = function() {
  return this.find({ 
    featured: true, 
    status: "active", 
    isDeleted: false 
  }).limit(3).sort({ createdAt: -1 });
};

// Static method to get active services with pagination
serviceSchema.statics.getActive = function(page = 1, limit = 6, serviceType = null) {
  const query = { status: "active", isDeleted: false };
  if (serviceType) {
    query.serviceType = serviceType;
  }
  
  const skip = (page - 1) * limit;
  
  return {
    services: this.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit),
    total: this.countDocuments(query)
  };
};

// Instance method to increment views
serviceSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Instance method to increment bookings
serviceSchema.methods.incrementBookings = function() {
  this.bookings += 1;
  return this.save();
};

const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default Service;
