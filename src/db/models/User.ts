const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  tel: {
    type: String,
    unique: true,
    match: [/^\(?([0-9]{3})\)?[-]([0-9]{3})[-]([0-9]{4})$/, "Please add a telephone number in xxx-xxx-xxxx form."]
  },
  email: {
    type: String,
    require: [true, "Please add an email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please add a valid email",
    ],
  },
  role: {
    type: String,
    enum: ["user", "admin" , "hotelmanager"],
    default: "user",
  },
  hotel: {
    type: mongoose.Schema.ObjectId,
    ref: "Hotel",
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlenght: 6,
    select: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
  export default User
