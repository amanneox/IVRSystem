const express = require('express')
const router = express.Router()
const xml = require('xml')
var flag = 0;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.header('Content-Type', 'application/xml')
  var event = req.query.event
  var data = req.query.data || ''

  var xmlres =   {
    response:''
  }
  if(event){
    if(event=='NewCall'){
       xmlres =
      {
              response:
              [{
                playtext: 'Welcome to an Assignment by Aman Adhikari.'
              },
              {
                collectdtmf: [ {
                  _attr: {l: "1",o:"30000"}
                },
                {
                  playtext: 'Please enter 1 for Male 2 for Female'
                }
              ]}
            ]
      }
    }
    else if(event=='GotDTMF'){
      if(String(data)=='1')
        {
          if( flag == 1 ){
            var dtmfres = '';
            if(String(data)==1){
              dtmfres = 'You are an adult'
            }
            else {
              dtmfres = 'Minors not allowed'
            }
            xmlres = {
               response:
               [{
                 playtext: dtmfres
             },{
                 hangup: ''
               }]
           }
          }
          else{
            flag = 1
            xmlres = {
               response:
               [{
                   collectdtmf: [{
                     _attr: {l: "1",o:"10000"}
                   },
                 {
                 playtext: 'Enter 1 if your 21 or above, 2 if not'
               }
             ]}
             ]
           }
          }

        }
        else if(String(data)=='2'){
          if( flag == 1 ){
            var dtmfres = '';
            if(String(data)==1){
              dtmfres = 'You are an adult'
            }
            else {
              dtmfres = 'Minors not allowed'
            }
            xmlres = {
               response:
               [{
                 playtext: dtmfres
             },{
                 hangup: ''
               }]
           }
          }
          else{
            flag = 1
            xmlres = {
               response:
               [{
                   collectdtmf: [{
                     _attr: {l: "1",o:"10000"}
                   },
                 {
                 playtext: 'Enter 1 if your 18 or above, 2 if not'
               }
             ]}
             ]
           }
          }

        }
        else{
          flag = 0;
          xmlres = {
             response:
             [{
               playtext: 'Invalid Input'
           },{
               hangup: ''
             }]
         }
        }
    }
    else{
       flag = 0;
       xmlres =
      {
              response:
              [{
                playtext: 'Sorry Invalid Input.'
              },{
                  hangup: ''
                }]
      }
    }
  }

  res.send(xml(xmlres));
});

module.exports = router;
