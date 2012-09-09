## About

* Asynchronously load plugins, optionally after page load.
* Interface with multiple backends:
    * Google Analytics
    * Mix Panel
	* KISS Metrics
	* Quantcast
	* Comscore
* Handle Backbone.js "thick clients" by registering a page view when a backbone route is executed
* Capture user behavior by firing events. From your App, do:
 
## Usage


```
 var PilotfishTracker = new Pilotfish('tracker');
 PilotfishTracker.backend('google-analytics', {"accountid": "adfadsf"})
 PilotfishTracker.backend('comscore', {"accountid": "adfadsf"})
 PilotfishTracker.backend('quantcast', {"accountid": "adfadsf"})
 
 <input type="submit" value="Buy" onclick="PilotfishTracker.recordEvent('buy-button-clicked')"/>
```