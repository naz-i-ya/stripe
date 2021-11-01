import React from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { BrowserRouter } from "react-router-dom";

import ElementDemos from "./components/ElementDemos";
import CardForm from "./components/demos/CardForm";
import SplitForm from "./components/demos/SplitForm";
import GooglePayButton from '@google-pay/button-react'

import "./App.css";


const stripePromise = loadStripe("pk_test_GBMXjkiXmlRawJCb1FG8wzb100yBMmGIrm");

const demos = [
  {
    path: "/card-element",
    label: "CardElement",
    component: CardForm
  },
  {
    path: "/split-card-elements",
    label: "Split Card Elements",
    component: SplitForm
  }
];

const App = () => {
  return (


    <BrowserRouter>
      <GooglePayButton
      environment="TEST"
      PaymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods:[
          { 
            type:'CARD',
            parameters:{
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['MASTERCARD', 'VISA'],
            },

            tokenizationSpecification:{
              type:'PAYMENT_GATEWAY',
              parameters:{
                gateway: 'example',
                gatewayMerchantId: 'gatewayMarchantId',
              },
            },
          },
        ],

        merchantInfo:{
          merchantId: '123456789901234567890',
          merchantName: "Name Merchant",
        },
        transactionInfo:{
          totalPriceStatus: 'FINAL',
          totalPriceLabel: 'Total',
          totalPrice: '1',
          currencyCode:'INR',
          countryCode: 'India',

        },

        shippingAddressRequired: true,
        callbackIntents:['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
      }}
      onLoadPaymentData={paymentRequest => {
        console.log('success', paymentRequest);
      }}

      onPaymentAuthorized={paymentData => {
        console.log('Payment Authorized success', paymentData)
        return{ transactionsState: 'SUCESS'}
      }}

      existingPaymentRequired='false'
      buttonColor='black'
      buttonType="Buy"
      />
  
    <hr />

    <p className="option">Or</p>
      <Elements stripe={stripePromise}>
        <ElementDemos demos={demos} />
      </Elements>
    </BrowserRouter>
  );
};

export default App;
