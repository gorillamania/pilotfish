## About

* Asynchronously load plugins, optionally after page load.
* Interface with multiple backends:
    * Google Analytics
    * Quantcast
    * TODO: Mix Panel
    * TODO: KISS Metrics
    * TODO: Comscore
* Handle Backbone.js "thick clients" by registering a page view when a backbone route is executed
* Capture user behavior by firing events. From your App, do:
 
## Usage


```
 var PilotfishTracker = new Pilotfish('tracker');
 PilotfishTracker.backend('google-analytics', {"accountid": "UA-XXXXXXX-1"})
 PilotfishTracker.backend('quantcast', {"accountid": "p-XXXXXXX-1"})

 <input type="submit" value="Buy" onclick="PilotfishTracker.recordEvent('buy-button-clicked')"/>
```
