/**
 * Created by memamdie on 11/23/15.
 */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SubscriptionSchema = new Schema({
    pictureUrl: {
        type: String
    },
    quote: {
        type: String
    },
    typeOne: {
        type: String
    },
    typeTwo: {
        type: String
    },
    typeOneData: {
        type: String
    },
    typeTwoData: {
        type: String
    },
    grabber: {
        type: String
    },
    modelOnePrice: {
        type: String
    },
    modelTwoPrice: {
        type: String
    },
    modelThreePrice: {
        type: String
    },
    modelOne: {
        type: String
    },
    modelTwo: {
        type: String
    },
    modelThree: {
        type: String
    },
    modelOneDesc: {
        type: String
    },
    modelTwoDesc: {
        type: String
    },
    modelThreeDesc: {
        type: String
    },
    modelOneBtn: {
        type: String
    },
    modelTwoBtn: {
        type: String
    },
    modelThreeBtn: {
        type: String
    }
});

mongoose.model('SubscriptionData', SubscriptionSchema);
