See a history of changes for this project is here. Note that we follow [software versioning standards](http://semver.org) as follows:
major.new[.maintenance[.trivial]]


# 0.1.0

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
* First plugin - [Tracker](https://github.com/pilotfish/pilotfish/blob/master/plugins/tracker) released, v0.1.0
	* Consolidate Event and page view tracking across multiple analytics providers
	* Integration with Google Analytics
	* Integration with Quantcast
* Test framework with [qunit](http://qunitjs.com) and [phantomjs](http://phantomjs.org), run on every commit with [travis](http://travis-ci.org/#!/pilotfish/pilotfish)
* [Grunt](https://github.com/cowboy/grunt) setup, with [release tasks](https://github.com/pilotfish/pilotfish/blob/master/tasks/release.js) that handle linting, minification, and distribution
* Graceful degredation of unsupported browsers

