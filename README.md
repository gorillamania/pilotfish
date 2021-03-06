[![Build Status](https://secure.travis-ci.org/pilotfish/pilotfish.png)](http://travis-ci.org/pilotfish/pilotfish)

[Pilotfish quality rating](https://github.com/pilotfish/pilotfish/blob/master/doc/ratings.md): ![1 fish](http://cdn.pilotfish.io/img/pilotfish-rating-1.0.png)

# Warning 
**This code is not production ready.**  Pilotfish developers are practicing [README driven development](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html), so this documentation is being written before the code is actually done. :) To see the actual state of the code, checkout the [HISTORY](https://github.com/pilotfish/pilotfish/blob/master/HISTORY.md). If the project interests you and you would like to be notified when the first release is ready, let us know. TODO: Link to newsletter signup.

## About
Software should be intuitive, easy, and fun to use. Pilotfish is a user experience platform for web and application developers to build better experiences. 

Instead re-writing these common user experiences for each platform over and over again, pilotfish unifies this effort as a community driven project that pulls together the latest best practices in User Experience. Your users get a better experience, and you save time. See [plugins](#plugins) for a list of the functionality you gain by using a User Experience Platform.

Pilotfish's architecture comes in 3 components:

* A thin javascript toolkit that provides a plugin driven architecture for widgets that improve user experience. 
* A [server side api](http://api.pilotfish.io), for data collection, processing, and access, for the plugins that require server side support. [Source on github](https://github.com/pilotfish/pilotfish-api)
* A [web console](http://console.pilotfish.io) to provide allow for configuration of the widgets, analytics, and insights into your users. [Source on github](https://github.com/pilotfish/pilotfish-console)

More info can be found on the [pilotfish.io website](http://pilotfish.io). TODO: Link.

### FAQ
###### Can't I just do this on my own? 

Sure, most experienced developers have created experiences like the ones you see here, at least once. Do you want to keep doing that over and over again, or use well tested, high quality interactions?

###### Isn't this what jQueryUI does?

jQuery is client side only. Pilotfish provides a server side component as well for a complete platform that enables services, analytics, and dynamic interactions for your users. 

###### Do I have to use your server for the plugins that require server side support?

No. While there is a highly available, scalable platform-as-a-service at [api.pilotfish.io](http://api.pilotfish.io). You can also download/install the api code and host yourself. See [alternate hosting options](#alternate-hosting-options).

###### Does it work with jQuery, Prototype, Backbone, Underscore, jQuery UI, YUI, mooTools, dojo, etc.? 

Pilotfish currently requires jQuery. We plan on supporting other frameworks soon. Let us know if you are interested in other frameworks, that will guide our priorities. The best way to do this is to [file an issue](https://github.com/pilotfish/pilotfish/issues/new).

###### That looks like a lot of plugins. Isn't the file huge?
 
Pilotfish uses a plugin driven architecture, so you only get the plugins you need. The base framework file is only XX when minified/gzipped. TODO: How big.

###### Why the name pilotfish?
A pilot fish is one of those little fish that hover around sharks and eat the parasites, creating a mutually beneficial relationship with the shark. Similarly, Pilotfish aims to work alongside your application to make it better.


## Demo
To see a working sample site, head over to our demo site TODO: Link, where we show off what features we can add to your site.

## Getting started

To use pilotfish, first include the base framework:

`<script src="//cdn.pilotfish.io/client/latest/pilotfish.min.js"></script>`

Then you include the javascript for which plugins you may want to use:

`<script src="//cdn.pilotfish.io/client/plugins/tracker/pilotfish-tracker.js"></script>`

Depending on the plugin, some additional configuration may be required. 

For the Asynchronous version, see: http://jsfiddle.net/Y4dbB/

## Plugins
Several core plugins are included with the platform, and there is also a community of developers that create plugins as they are needed.

### Existing plugins
* [Tracker](https://github.com/pilotfish/pilotfish/tree/master/plugins/tracker) - reports on user events to the analytics backend of your choosing
* [Unstuck](https://github.com/pilotfish/pilotfish/tree/master/plugins/unstuck) - Automagically finds usability problems

### Ideas for plugins

* New User Tutorial
* Javascript Error Handling
* Online Help
* Form Helpers
* Auto Login
* Mouse Tracking
* Session management/timeout
* Auto Focus Call to Action
* Bounce Interception
* Content Personalization Engine
* Breadcrumbs
* Keyboard Shortcuts
* Signup Lightbox
* Ratings
* Highlight referred keywords
* Workflow Engine
* Client Side Pagination
* Tabs 
* Low impact surveys
* Application Error Handling
* Application Persona
* Infinite Scroll
* Captcha Reworked
* Auto Complete
* External Link Notification
* Progress Bar
* Manage Copy 
* Date Picker
* Easter Eggs 
* File Upload
* Auto Translate This Page 
* Lazy Load Images
* Customer Chat 
* Social Sharing Tools
* Feedback
* Funnel Analysis
* Feature Flipping/Bucket Testing
* Browser upgrade notice for unsupported browsers

**Have an idea for a plugin? We'd love to hear it.** Please [file an issue](https://github.com/pilotfish/pilotfish/issues/new) describing your idea.

## Browser Compatibility

Pilotfish accepts the burden of browser compatiblity testing, and we aim to make reasonable trade offs for compatibility versus complexity/bloat. 

We currently to support all browsers that support [querySelectorAll](http://caniuse.com/queryselector), which as of Aug 26, 2012, that's 93% of the browsing population:

* Chrome >= 4
* Firefox >= 3.5
* Internet Explorer >= 8
* Safari (including iOS) >= 5

For older browsers that don't support required functionality, we aim to gracefully degrade - silently disabled without causing problems for the user.

<small>Developer note: The reason why we don't inclue IE 7 is because it doesn't support querySelectorAll, which means we would
have had to include a library like [sizzle](http://sizzlejs.com/) to implement this functionality. If the community pushes for IE 7 support,
we could implement this via a shim, keeping the library lightweight for the other browsers but having IE 7 download
an additional js file, but we are hoping no one notices. :)</small>

## Alternate Hosting Options

### Picking a specific version
While it is recommend you use the [latest stable minified release](http://cdn.pilotfish.io/client/latest/pilotfish.min.js) of the javascript, you may also pick a different release state or lock to a specific version number. Examples:

* [/client/0.1.0/pilotfish.min.js](http://cdn.pilotfish.io/client/0.1.0/pilotfish.min.js) # this exact version only
* [/client/0.1/pilotfish.min.js](http://cdn.pilotfish.io/client/0.1/pilotfish.min.js) # anything in the 0.1.x series
* [/client/0/pilotfish.js](http://cdn.pilotfish.io/client/0/pilotfish.js) # anything in the 0.x.x series, non minifed

* [https://raw.github.com/pilotfish/pilotfish/master/pilotfish.js](https://raw.github.com/pilotfish/pilotfish/master/pilotfish.js) # Pull latest commit from github (not for production)

### Self hosting
You may host the javascript files yourself if you like. Simply download them from any of these sources and put them on your servers.

Note that the [server side api](https://github.com/pilotfish/pilotfish-api), and  [web console](https://github.com/pilotfish/pilotfish-console) are open source, you are free to download/install them and run them on your own server instead of using the Pilotfish hosted solution.

#### Github CDN
[http://pilotfish.github.com/client/latest/pilotfish.min.js](http://pilotfish.github.com/client/latest/pilotfish.min.js)

#### Google CDN
TODO

#### Yahoo CDN
TODO

## License
We aim for you to use this inside your application, so we picked the leased restrictive license we could find. MIT License - see [LICENSE](https://github.com/pilotfish/pilotfish/blob/master/LICENSE)

##  Who is using Pilotfish?
See [USING](https://github.com/pilotfish/pilotfish/blob/master/USING.md). 

## Contributing

Would you like to help out? We need:

* Plugins created
* Features added
* [Bugs fixed](https://github.com/pilotfish/pilotfish/issues)
* [Tests](https://github.com/pilotfish/pilotfish/tree/master/test) written
* [Documentation](https://github.com/pilotfish/pilotfish/tree/master/doc) written

See [doc/helping](https://github.com/pilotfish/pilotfish/blob/master/doc/helping.md) to get started. See [doc/development](https://github.com/pilotfish/pilotfish/blob/master/doc/development.md) for guidelines on how to write code that gets included in the production release.


## Issues/Requests/Support
We want you to have a good experience, too. :)

Please check out [the existing issues](https://github.com/pilotfish/pilotfish/issues), and if you don't see that your problem is already being worked on, please [file an issue](https://github.com/pilotfish/pilotfish/issues/new)

## More information
* The [wiki](https://github.com/pilotfish/pilotfish/wiki) (TODO)
* The Pilotfish Discussion Group (TODO)
