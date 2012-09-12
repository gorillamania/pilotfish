## About

[Pilotfish quality rating](https://github.com/pilotfish/pilotfish/blob/master/doc/ratings.md): ![1.5 fish](http://cdn.pilotfish.io/img/pilotfish-rating-1.5.png)

This is a core plugin for the [Pilotfish user experience toolkit](http://pilotfish.io), that aims to simplify the instrumentation of event tracking across applications and other Pilotfish plugins. Features:

* With one call, multiple analytics backends. Currently supported:
    * Mix Panel
    * Google Analytics
    * Quantcast (page views only, no events)

* Handles "thick clients" where urls are changed via hashtag, by registering a page view when a route is executed. Set `hashTagPageView` = true in the options to activate


## Usage

This plugin is a core plugin of pilotfish, and as such these instructions assume you already have [pilotfish on your page](https://gist.github.com/3645309). 

```
Script:

Pilotfish('trackerInit', {
    backends: {
        'google-analytics': {"accountid": "UA-XXXXXXX-1"},
        'quantcast': {"accountid": "p-XXXXXXX-1"},
        'mixpanel': {"accountid": "aaaaaaaaaaaaaaaaaaaaaaa"}
    },
    hashTagPageView: true // Will record all hash tag changes as page views
});

Else where on your page:
<input type="submit" value="Buy" onclick="Pilotfish('tracker', 'buy-button-clicked')"/>
```

## Download/hosting
The source is hosted on a CDN for your convenience. You may point your script tag there (which will also give you the latest stable upates as we release them), or you may download it and host it yourself.

[http://cdn.pilotfish.io/client/plugins/tracker/pilotfish-tracker.js](http://cdn.pilotfish.io/client/plugins/tracker/pilotfish-tracker.js)

## Issues/Requests/Support
We want you to have a good experience, too. :)

Please check out [the existing issues](https://github.com/pilotfish/pilotfish/issues), and if you don't see that your problem is already being worked on, please [file an issue](https://github.com/pilotfish/pilotfish/issues/new)

## TODO
* Support other backends
	* Pilotfish API
	* KISS Metrics
	* Comscore (page views only, no events)
* Pass additional data for backends that support it


## History

#### 0.3.0
* Support for recording hash tag changes as a page view

#### 0.2.0
* Support for Mix Panel
* Support for Quantcast
  
#### 0.1.0 MVP
* Fire off events to Google Analytics 

## Contributing

Would you like to help out? We need:

* Features added
* [Bugs fixed](https://github.com/pilotfish/pilotfish/issues)
* [Tests](https://github.com/pilotfish/pilotfish/tree/master/plugins/tracker/test) written
* [Documentation](https://github.com/pilotfish/pilotfish/tree/master/doc) written

## License
All core plugins for Pilotfish are licensed under the same license as Pilotfish (MIT) see [LICENSE](https://github.com/pilotfish/pilotfish/blob/master/LICENSE)


