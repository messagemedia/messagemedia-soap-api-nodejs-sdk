# MessageMedia NodeJS Library
A library that allows NodeJS programmers to access MessageMedia's SOAP API.

## How to get this library:

Install it as a package from **npm**(Node Package Manager).
```
npm install messagemedia
```

**OR**
```
$ cd node_modules

$ git clone https://github.com/messagemedia/messagemedia-nodejs.git messagemedia
```
**OR**

Create a **package.json** file in the project's root directory and add **messagemedia** as a dependency. You can refer to the one in this project's root directory. After this file is created you can run the following command...
```
npm install
```
## Project file & directory structure:
* **/lib** MessageMedia library. 
* **/test** Contains test scripts called from **/test/tests.js**.
* **/sample** Contains a sample application.
* **/node_modules** Is created after running **npm install**.

## Sample:
In **/sample** there is a sample web application that can be used to test/demonstrate the library. 
This sample has two major parts.
* **Server** (NodeJS)
* **Client** (AngularJS)
This sample uses the Express web application framework package, which was created using NodeJS. 

The code snippet below shows how a very simple REST interface could be made to access MessageMedia's SOAP API via this library.
```javascript
var messagemedia = require('../index.js');

app.post('/api/checkUser', function(req, res){
  messagemedia.checkUser(req.body.userId, req.body.password, function(result){
    res.send(result);
  });
});
```

## Unit Tests:
When attempting to run **/tests.js** for the first time you must...

* Create a **config.json** file in project root directory (use the **config.template.json** file as an example)
* Run ```npm install nodeunit -g```
* In ```/test``` execute ```nodeunit tests.js```

* **TC 1:** Checking
	* **TC 1.1:** Check User. 
	* **TC 1.2:** Check Replies
	* **TC 1.3:** Check Reports
* **TC 2:** Number Blocking
	* **TC 2.1:** Get blocked numbers.
	* **TC 2.2:** Block numbers(s).
	* **TC 2.3:** Unblock numbers(s).
* **TC 3:** Confirmations
	* **TC 3.1:** Confirm Replies.
	* **TC 3.2:** Confirm Reports.
* **TC 4:** Messages
	* **TC 4.1:** Send Messages.
	* **TC 4.2:** Delete Scheduled Messages.
	
Please note: The unit tests require an active MessageMedia account in order for them to function.
