# MessageMedia NodeJS Library
A library that allows NodeJS programmers to access MessageMedia's SOAP API.

## How to install:
npm install messagemedia

**OR**

$ cd node_modules

$ git clone https://github.com/messagemedia/messagemedia-nodejs.git messagemedia

## Project file & directory structure:
* **/test** Contains test scripts called from **/test/tests.js**.
* **/lib** MessageMedia library. 
* **/sample** Contains a sample application.
* **/node_modules** Is created after running **npm install**.

## Unit Tests:
When attempting to run **/tests.js** for the first time you must...

* Create a **config.json** file in project root directory (use the **config.template.json** file as an example)
* Run "npm install nodeunit -g"
* From project root execute "nodeunit tests.js"

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