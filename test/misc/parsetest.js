const et = require('elementtree');

var response = '<?xml version="1.0" encoding="utf-8"?><SOAP-ENV:Envelope xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><SOAP-ENV:Body><sendMessagesResponse xmlns="http://xml.m4u.com.au/2009"><result failed="0" scheduled="0" sent="1"><accountDetails creditLimit="500" creditRemaining="496" type="daily" /></result></sendMessagesResponse></SOAP-ENV:Body></SOAP-ENV:Envelope>';

var etree = et.parse(response);
console.log(etree.findall('SOAP-ENV:Body/sendMessagesResponse/result')[0].get('sent'));
console.log(etree.findall('SOAP-ENV:Body/sendMessagesResponse/result')[0].get('scheduled'));
console.log(etree.findall('SOAP-ENV:Body/sendMessagesResponse/result')[0].get('failed'));
console.log(etree.findall('SOAP-ENV:Body/sendMessagesResponse/result/accountDetails')[0].get('type'));
console.log(etree.findall('SOAP-ENV:Body/sendMessagesResponse/result/accountDetails')[0].get('creditLimit'));
console.log(etree.findall('SOAP-ENV:Body/sendMessagesResponse/result/accountDetails')[0].get('creditRemaining'));
