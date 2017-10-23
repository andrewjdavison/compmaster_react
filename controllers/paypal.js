'use strict';
var TableController = rootRequire('controllers/table');
var Paypal = require('paypal-adaptive');
var config = require('config');
var responder = rootRequire('common/responder');


class PaypalController extends TableController {
  constructor(){
    var paypalSdk = new Paypal(config.paypal.sdkData);

    super(paypalSdk);
  }

  testTransaction(req, res){
    var paypalSDK = new Paypal(config.paypal.sdkData);
    console.log( 'Testing Transaction');
    console.log('-------------------');
    console.log(config.get('paypal.returnURL'));
    var buyer= 'compmaster.buyer1@gmail.com';
    var club = 'compmaster.club1@gmail.com';
    var compFee= "10.00";
    var siteFee= "5.00";

    var payload = {
      requestEnvelope:{
        errorLanguage: 'en_US'
      },
      actionType: 'PAY',
      currencyCode: 'AUD',
      feespayer: 'PRIMARYRECEIVER',
      receiverList: {
        receiver:[
          {
            email: config.get('compmasterPaypalAccount'),
            amount: siteFee,
            primary: 'false'
          },
          {
           email: club,
           amount: compFee,
           primary: 'true'
          }
        ]
      },
      returnUrl: config.get('paypal.returnURL'),
      cancelUrl: config.get('paypal.cancelURL'),
    };

    var paykey;

    paypalSDK.pay(payload, function(err,response){
      if(err){
        console.log(err);
        console.log(response);
        responder.httpRespond(res, {code:responder.OK, details:[response]});
        return;
      } else {
        console.log(response);
        console.log('Redirect to '+response.paymentApprovalUrl);
        paykey = response.payKey;
        console.log('PayKey: '+paykey);


        // Now set up the payment options

        payload={
          requestEnvelope: {
            errorLanguage: 'en_US'
          },
          payKey: paykey,
          receiverOptions: [
            {
              receiver: {
                email: config.get('compmasterPaypalAccount'),
              },
              invoiceData: {
                item: [
                  {
                    name: "Fee for entry# 12",
                    price: "2",
                    identifier: "12232"
                  },
                  {
                    name: "Fee for entry# 13",
                    price: "3",
                    identifier: "12233"
                  }
                ]
              }
            },
            {
              receiver: {
                email: club,
              },
              invoiceData: {
                item: [
                  {
                    name: "Fee for entry# 12",
                    price: "5.00",
                    identifier: "C-12232"
                  },
                  {
                    name: "Fee for entry# 13",
                    price: "5.00",
                    identifier: "C-12233"
                  }
                ]
              }
            },
          ]
        };

        console.log('Setting Payment Options:');
        console.log('------------------------');

        paypalSDK.setPaymentOptions(payload,function(err,response){
          if(err){
            console.log(err);
            console.log(response);
          } else {
            console.log(response);

            var params = {
              payKey: paykey
            };

            console.log('Getting Payment Details');
            console.log('-----------------------');

            paypalSDK.paymentDetails(params, function(err,response){
              if(err){
                console.log(err);
                console.log(response);
              } else {
                console.log(response);
                console.log('');
                console.log(response.paymentInfoList.paymentInfo);
                responder.httpRespond(res, {code:responder.OK, detail:[paykey]});
              }
            })
          }
        });
      }
    });

  }
}

module.exports = PaypalController;
