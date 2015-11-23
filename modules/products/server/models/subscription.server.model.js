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
    description: {
        type: String
    },
    geologicalData: {
        type: String
    },
    culturalData: {
        type: String
    },
    subscriptionOnePrice: {
        type: String
    },
    subscriptionTwoPrice: {
        type: String
    },
    subscriptionThreePrice: {
        type: String
    },
    subscriptionOne: {
        type: String
    },
    subscriptionTwo: {
        type: String
    },
    subscriptionThree: {
        type: String
    },
    subscriptionOneDesc: {
        type: String
    },
    subscriptionTwoDesc: {
        type: String
    },
    subscriptionThreeDesc: {
        type: String
    },
    subscriptionOneBtn: {
        type: String
    },
    subscriptionTwoBtn: {
        type: String
    },
    subscriptionThreeBtn: {
        type: String
    }
});

mongoose.model('SubscriptionData', SubscriptionSchema);
