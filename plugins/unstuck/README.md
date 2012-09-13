## About

[Pilotfish quality rating](https://github.com/pilotfish/pilotfish/blob/master/doc/ratings.md): ![0.5 fish](http://cdn.pilotfish.io/img/pilotfish-rating-0.5.png)

This is a core plugin for the [Pilotfish user experience toolkit](http://pilotfish.io), that aims to figure out when a user is having problems, and report that as a javascript event. When combined with [tracker](https://github.com/pilotfish/pilotfish/tree/master/plugins/tracker), can feed into your analytics platform!

Events:

* ERR
	* `unhandled_click` - User clicked, nothing happened, so they clicked again
	* `same_message` - the user received the same notice more than once on a page view (chances are they didn't understand it)
	* `multiple_reload` - The user has reloaded the page several times
* WARN
	* `back_forward_reload` - User came back to the same page more than once back-forward-back.  
	* `slowed_cadence` - User was clicking along at a good pace, but then spends more than x standard deviations on a particular page.

## Usage

This plugin is a core plugin of pilotfish, and as such these instructions assume you already have [pilotfish on your page](https://gist.github.com/3645309). 

```
Pilotfish('requirePlugin', 'unstuck');
Pilotfish('subscribe', 'unhandled_click', function(evt, data){
   // Do whatever you want when the user had an unhandled click
});
```
To track the activity using Pilotfish tracker and have it feed into your analytics platform:

```
Pilotfish('requirePlugin', 'unstuck');
Pilotfish('requirePlugin', 'tracker');
Pilotfish('trackerInit', function({
	backends: {
        'google-analytics': {"accountid": "UA-XXXXXXX-1"},
        'quantcast': {"accountid": "p-XXXXXXX-1"},
        'mixpanel': {"accountid": "aaaaaaaaaaaaaaaaaaaaaaa"}
    },
    events: ['unhandled_click', 'same_message', 'multiple_reload']
});

```


## Download/hosting
The source is hosted on a CDN for your convenience. You may point your script tag there (which will also give you the latest stable upates as we release them), or you may download it and host it yourself.

[http://cdn.pilotfish.io/client/plugins/unstuck/pilotfish-unstuck.js](http://cdn.pilotfish.io/client/plugins/unstuck/pilotfish-unstuck.js)

## Issues/Requests/Support
We want you to have a good experience, too. :)

Please check out [the existing issues](https://github.com/pilotfish/pilotfish/issues), and if you don't see that your problem is already being worked on, please [file an issue](https://github.com/pilotfish/pilotfish/issues/new)

## TODO
* TODO item 1
* TODO item 2

## History

#### 0.1.0 MVP
* Fire off events to Google Analytics 

## Contributing

Would you like to help out? We need:

* Features added
* [Bugs fixed](https://github.com/pilotfish/pilotfish/issues)
* [Tests](https://github.com/pilotfish/pilotfish/tree/master/plugins/unstuck/test) written
* [Documentation](https://github.com/pilotfish/pilotfish/tree/master/doc) written

## Development
See the [pilotfish development guide](https://github.com/pilotfish/pilotfish/blob/master/doc/development.md)


## License
All core plugins for Pilotfish are licensed under the same license as Pilotfish (MIT) see [LICENSE](https://github.com/pilotfish/pilotfish/blob/master/LICENSE)


