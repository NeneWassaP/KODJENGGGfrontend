const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more than 50 charcters"],
    },
    address: {
      type: String,
      require: [true, "Please add an address"],
    },
    district: {
      type: String,
      require: [true, "Please add a district"],
    },
    province: {
      type: String,
      require: [true, "Please add a province"],
    },
    postalcode: {
      type: String,
      require: [true, "Please add a postalcode"],
      maxlength: [5, "Postal code can not be more than 5 digits"],
    },
    tel: {
      type: String,
      match: [/^\(?([0-9]{3})\)?[-]([0-9]{3})[-]([0-9]{4})$/, "Please add a telephone number in xxx-xxx-xxxx form."]
    },
    region: {
      type: String,
      require: [true, "Please add a region"],
    },
    picture: {
      type: String,
      require: [true, "Please add image URI"],
    }
  }
);


  const Hotel = mongoose.models.Hotel || mongoose.model("Hotel", HotelSchema);
  export default Hotel