## About

[Pilotfish quality rating](https://github.com/pilotfish/pilotfish/blob/master/doc/ratings.md): ![0.5 fish](http://cdn.pilotfish.io/img/pilotfish-rating-0.5.png)

This is a core plugin for the [Pilotfish user experience toolkit](http://pilotfish.io), that aims to figure out when a user is having problems, and report that as a javascript event. When combined with [tracker](https://github.com/pilotfish/pilotfish/tree/master/plugins/tracker), can feed into your analytics platform!

Events:

* `hash_change_no_pointer` - The hash of the page changed, but the recent click wasn't a pointer
* `url_change_no_pointer` - The user left the page, but the last element they clicked on wasn't a pointer

## Usage

This plugin is a core plugin of pilotfish, and as such these instructions assume you already have [pilotfish on your page](https://gist.github.com/3645309). 

```
Pilotfish('requirePlugin', 'unstuck');
Pilotfish('on', 'plugins:unstuck', function(evt, data){
   // data.name will be the event
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
});

```


## Download/hosting
The source is hosted on a CDN for your convenience. You may point your script tag there (which will also give you the latest stable upates as we release them), or you may download it and host it yourself.

[http://cdn.pilotfish.io/client/plugins/unstuck/pilotfish-unstuck.js](http://cdn.pilotfish.io/client/plugins/unstuck/pilotfish-unstuck.js)

## Issues/Requests/Support
We want you to have a good experience, too. :)

Please check out [the existing issues](https://github.com/pilotfish/pilotfish/issues), and if you don't see that your problem is already being worked on, please [file an issue](https://github.com/pilotfish/pilotfish/issues/new)

## TODO
* `ajax_no_indicator`
* Stuck click
* `click_caused_error`
* Frequent reloads
* User stopped the page before it was downloaded 
* user sees the same message twice
* user hit back x times in a row
* slowed_cadence - this page is taking signifigantly longer than previous pages
* lost_focus
* user_searched, and didn't find anything
* Tap into the accelerometer and watch for a thrown computer :)

## History

#### 0.2.0
* Update for Pilotfish 0.5.0 (unload event)
* `url_change_no_pointer` event 

#### 0.1.0
* MVP
* `hash_change_no_pointer` event 

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


