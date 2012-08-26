# Warning 
**This code is not production ready.**  Pilotfish developers are practicing [README driven development](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html), so this documentation is being written before the code is actually done. :) If the project interests you and you would like to be notified when the first release is ready, let us know. TODO: Link to newsletter signup.

## About
Software should be intuitive, easy, and fun to use. Pilotfish is a user experience platform for web and application developers to build better experiences. 

Instead re-writing these common user experiences for each platform over and over again, pilotfish unifies this effort as a community driven project that pulls together the latest best practices in User Experience. Your users get a better experience, and you save time. See [plugins](#plugins) for a list of the functionality you gain by using a User Experience Platform.

Pilotfish's architecture comes in 3 components:

* A thin javascript toolkit that provides a plugin driven architecture for widgets that improve user experience. 
* A [server side api](https://github.com/pilotfish/pilotfish-api), for data collection, processing, and access, for the plugins that require server side support.
* A [web console](https://github.com/pilotfish/pilotfish-api) to provide allow for configuration of the widgets, analytics, and insights into your users.

More info can be found on the pilotfish.io website. TODO: Link.

### FAQ
###### Can't I just do this on my own? 

Sure, most experienced developers have created experiences like the ones you see here, at least once. Do you want to keep doing that over and over again, or use well tested, high quality interactions?

###### Isn't this what jQueryUI does?

jQuery is client side only. Pilotfish provides a server side component as well for a complete platform that enables services, analytics, and dynamic interactions for your users. 

###### Do I have to use your server for the plugins that require server side support?

No. While there is a highly available, scalable platform-as-a-service at api.pilotfish.io TODO: Link, you can also download/install the api code and host yourself. See [alternate hosting options](#alternate hosting options).

###### Does it work with jQuery, Prototype, Backbone, Underscore, jQuery UI, YUI, mooTools, dojo, etc.? 

Yes, Pilotfish works alongside these popular frameworks.

###### That looks like a lot of plugins. Isn't the file huge?
 
Pilotfish uses a plugin driven architecture, so you only get the plugins you need. The base framework file is only XX when minified/gzipped. TODO: How big.

#### Etymylogical Trivia
Why the name pilotfish? A pilot fish is one of those little fish that hover around sharks and eat the parasites, creating a mutually beneficial relationship with the shark. Similarly, Pilotfish aims to work alongside your application to make it better.


## Demo
To see a working sample site, head over to our demo site TODO: Link, where we show off what features we can add to your site.

## Getting started

To use pilotfish, first include the base framework:

`<script src="//cdn.portfolio.io/client/portfolio-stable-min.js"></script>`

Then you include the javascript for which plugins you may want to use:

`<script src="//cdn.portfolio.io/plugins/new-user-walkthrough/new-user-walkthrough-stable-min.js"></script>`

Depending on the plugin, some additional configuration may be required. 


## Plugins
Several core plugins are included with the platform, and there is also a community of developers that create plugins as they are needed.

### Core

* User Notifications

### Existing plugins
* TODO 

### Ideas for plugins

* New User Tutorial
* Javascript Error Handling
* Online Help
* Auto Detect Stuck Users
* Anaytlics Abstraction layer
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
* Analtyics Abstraction Layer
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

All of the grade A browsers are fully supported.

* Chrome Latest Stable
* Firefox Latest Stable
* Internet Explorer >= 7
* Safari (including iOS) >= 4

For older browsers that don't support required functionality, we aim to gracefully degrade, ie. silently disabled without causing problems for the user.

## Alternate Hosting Options

### Picking a specific version
While it is recommend you use the 'stable', minified release of the javascript, you may also pick a different release state or lock to a specific version number. Examples:

* /client/portfolio/0.1/portfolio.js # non minifed, full comments in source code
* /client/portfolio/0.2/portfolio-min.js # the latest stable version of the 0.2 branch 
* /client/portfolio/1/portfolio-min.js # will automatically upgrade to the latest stable release in the 1.0 series
* /client/portfolio/master/portfolio-min.js # Latest release from github that passes all the tests

### Self hosting
You may host the javascript files yourself if you like. Simply download them from any of these sources and put them on your servers.

Note that the [server side api](https://github.com/pilotfish/pilotfish-api), and  [web console](https://github.com/pilotfish/pilotfish-console) are open source, you are free to download/install them and run them on your own server instead of using the Pilotfish hosted solution.

#### Github CDN
TODO

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
* Bugs fixed
* Tests written
* Documentation written

See [HELPING](https://github.com/pilotfish/pilotfish/blob/master/HELPING.md) to get started. See [DEVELOPMENT](https://github.com/pilotfish/pilotfish/blob/master/DEVELOPMENT.md) for guidelines on how to write code that gets included in the production release.


## Issues/Requests/Support
We want you to have a good experience, too. :)

Please check out [the existing issues](https://github.com/pilotfish/pilotfish/issues), and if you don't see that your problem is already being worked on, please [file an issue](https://github.com/pilotfish/pilotfish/issues/new)

## More information
* The [wiki](https://github.com/pilotfish/pilotfish/wiki) (TODO)
* The Pilotfish Discussion Group (TODO)
