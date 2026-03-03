import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    
    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["admin", "manager", "employee"],
      required: true
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    documents: [
      {
        name: String,
        url: String
      }
    ],

    lastlogin:{
      type: Date,
      default: Date.now
    },

    lastlogout: {
      type: Date,
      default: Date.now
    },

    refreshTokenVersion: {
      type : Number,
      default: 0
    },

    isdeleted: {
      type: Boolean,
      default: false
    }
  },

  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);