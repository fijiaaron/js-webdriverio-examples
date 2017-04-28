var webdriverio = require("webdriverio");

// ENVIRONMENT SETTINGS
var SAUCE_USERNAME = process.env["SAUCE_USERNAME"];
var SAUCE_ACCESS_KEY = process.env["SAUCE_ACCESS_KEY"];
var SELENIUM_BROWSER = process.env["SELENIUM_BROWSER"] || "chrome";
var SELENIUM_VERSION = process.env["SELENIUM_VERSION"] || "latest";
var SELENIUM_PLATFORM = process.env["SELENIUM_PLATFORM"] || "linux";

// WEBDRIVER OPTIONS
var options = {
	protocol: "https", 
	host: `${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@ondemand.saucelabs.com`,
	port: "443",
	path: "/wd/hub",
	desiredCapabilities: {
		browserName: SELENIUM_BROWSER,
		version: SELENIUM_VERSION,
		platform: SELENIUM_PLATFORM,

		name: "upload file example with webdriverio"
	}
}

// PAGE OBJECT
var page = {
	url: "http://the-internet.herokuapp.com/upload",
	title: "The Internet",
	choose_file: "#file-upload",
	upload_button: "#file-submit"
}

// FILE TO UPLOAD
var filePath = "/tmp/foo";

// TEST STEPS
webdriverio.remote(options).init()
	.url(page.url)
	.getTitle().then((title)=> console.log("title: ", title))
	.chooseFile(page.choose_file, filePath)	
	.getValue(page.choose_file).then((value)=> console.log("got value: ", value))
	.click(page.upload_button)
	.waitForText("File Uploaded!")
	.end();