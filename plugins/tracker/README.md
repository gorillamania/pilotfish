## About

* Send user events to a server
* Handles "thick clients" where urls are changed via hashtag, by registering a page view when a route is executed.
    * Backbone
    * TODO: Other MVCs?
* Handle multiple backends. 
    * Currently supported:
        * Mix Panel
        * Google Analytics
        * Quantcast (page views only, no events)
    * Planned support: 
        * Pilotfish API
        * KISS Metrics
        * Comscore (page views only, no events)

## Usage


```
Pilotfish('tracker', {
    backends: {
        'google-analytics': {"accountid": "UA-XXXXXXX-1"},
        'quantcast': {"accountid": "p-XXXXXXX-1"},
        'mixpanel': {"accountid": "aaaaaaaaaaaaaaaaaaaaaaa"}
    },
    events: [
        'buy-button-clicked',
        'cancel-button-clicked'
    ]
});

<input type="submit" value="Buy" onclick="Pilotfish('fire', 'buy-button-clicked')"/>
<input type="submit" value="Buy" onclick="Pilotfish('fire', 'cancel-button-clicked')"/>
```
