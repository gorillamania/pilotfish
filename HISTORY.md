A history of changes for this project is here. We follow [software versioning standards](http://semver.org) as follows:
major.new.maintenance[.trivial]

##### 0.4.1
* Fixes for loading plugins

### 0.4.0
* Events API renamed to use the more standard on/off/trigger

### 0.3.0
* NEW: Deal with errors more elegantly
* NEW: [Unstuck](https://github.com/pilotfish/pilotfish/blob/master/plugins/unstuck) plugin released
* FIX: Filter out duplicate hashchange events

### 0.2.0
* NEW: API for plugin management
    * Register plugins with `Pilotfish('registerPlugin', 'name', func)`
    * Dynamically load/require with `Pilotfish('requirePlugin', 'name', [url])` - will asynchronously load the plugin from the cdn.pilotfish.io if no url is supplied
    * Test for plugins with `Pilotfish('hasPlugin', 'name')`

##### 0.1.1
* NEW: events for load, ready, and hashtag change

# 0.1.0 ![1 fish](http://cdn.pilotfish.io/img/pilotfish-rating-1.0.png)

* [Minimum Viable Product](http://en.wikipedia.org/wiki/Lean_Startup)
* [Tag on page syntax](https://gist.github.com/3645309) created, with async support. 
* `Pilotfish` core object with utilities for:
	* [publish/subscribe/unsubscribe](https://github.com/pilotfish/pilotfish/blob/master/doc/utils.md#pubsub) for listening to user events (via jQuery)
	* [Console Logging](publish/subscribe/unsubscribe](https://github.com/pilotfish/pilotfish/blob/master/doc/core.md#logging)
	* [Page Data](publish/subscribe/unsubscribe](https://github.com/pilotfish/pilotfish/blob/master/doc/core.md#page-data)
	* [App settings](publish/subscribe/unsubscribe](https://github.com/pilotfish/pilotfish/blob/master/doc/core.md#settings)
	* [DOM selector](publish/subscribe/unsubscribe](https://github.com/pilotfish/pilotfish/blob/master/doc/core.md#selector) (via jQuery)
	* [extend](publish/subscribe/unsubscribe](https://github.com/pilotfish/pilotfish/blob/master/doc/core.md#extend) (via jQuery)
* Basic plugin infrastructure via [Pilotfish('register')](https://github.com/pilotfish/pilotfish/blob/master/doc/core.md#registering-plugins)
* Preload Queue to better handle asynchronously loaded js
* First plugin - [Tracker](https://github.com/pilotfish/pilotfish/blob/master/plugins/tracker) released
* Test framework with [qunit](http://qunitjs.com) and [phantomjs](http://phantomjs.org), run on every commit with [travis](http://travis-ci.org/#!/pilotfish/pilotfish)
* [Grunt](https://github.com/cowboy/grunt) setup, with [release tasks](https://github.com/pilotfish/pilotfish/blob/master/tasks/release.js) that handle linting, minification, and distribution
* Graceful degredation of unsupported browsers

