'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  username: {type: String, default:'', trim: true},
  userPicture: {type: String, default: 'https://ssl.gstatic.com/accounts/ui/avatar_2x.png', trim: true},
  verified: {type: Boolean, default: true, trim:true},
  review: {type: String, default:'', trim: true},
  rating: {type: Number, default:5, trim: true}
});

var ProductSchema = new Schema({
    created: {
      type: Date,
      default: Date.now
    },
    proType: Boolean, //false = geological, true = cultural
    proTitle: {
        type: String,
        default: '',
        required: 'Product must have a name'
    },
    longDes: {
        type: String,
        default: '',
        //required: 'Product must have a description'
    },
    shortDes: {
        type: String,
        default: '',
       required: 'Product must have a short description'
    },
    imageUrl: {
        type: String,
        default: '',
        trim: true
    },
    imageOne: {
        type: String,
        default: '',
        trim: true
    },
    imageTwo: {
        type: String,
        default: '',
        trim: true
    },
    imageThree: {
        type: String,
        default: '',
        trim: true
    },
    imageFour: {
        type: String,
        default: '',
        trim: true
    },
    indvPrice: {
        type: String,
        default: '',
        trim: true
    },
    eduPrice: {
        type: String,
        default: '',
        trim: true
    },
    wholePrice: {
        type: String,
        default: '',
        trim: true
    },
    teacher: {
      type: Boolean,
      default: false,
      trim: true
    },
    reviews: {
      type: [ReviewSchema]
    }

});

mongoose.model('Product', ProductSchema);
