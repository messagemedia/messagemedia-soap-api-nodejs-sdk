module.exports = function(data) {
  var et = require('elementtree');
  var etree = et.parse(data);
  var fault = etree.findall('SOAP-ENV:Body/SOAP-ENV:Fault/')[0];
  if (fault !== undefined) {
    var parsedFault = {
      faultcode : fault.findall('faultcode/')[0].text,
      faultstring : fault.findall('faultstring/')[0].text,
      detail : {
        faultResponse : {
          error : fault.findall('detail/faultResponse/error')[0].get('code')
        }
      }
    };
    return parsedFault;
  } else {
    return null;
  }
};