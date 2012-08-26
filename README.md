# Warning #
I'm practicing [README driven development](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html), so this documentation is being written before the code is actually done. :)

## About ##
We think websites should be intuitive, easy, and fun to use. Pilotfish is a user experience platform for web and application developers to build better experiences. 

Pilotfish itself is a thin javascript framework that provides a plugin driven architecture for widgets that improve user experience. 

Instead re-writing these common user experiences for each platform over and over again, pilotfish unifies this effort as a community driven project that pulls together the best practices in User Experience. Your users get a better experience, and you save time.

Combined with a [server side api](https://github.com/pilotfish/pilotfish-api), we provide an integrated platform for user experience related support. See plugins for a list of the functionality you gain by using a User Experience Platform like Pilotfish.

Quality is a top goal of the interactions produced here. You can trust that stable version of plugins available here are well tested, thought through, and proven.

More info can be found on the pilotfish.io website. TODO: Link.

### FAQ ###
Q\. Can't I just do this on my own? 

A\. Sure, most developers have created experiences like the ones you see here. Do you want to keep doing that over and over again, or use well tested, high quality interactions?

Q\. Isn't this what jQueryUI does?

A\. jQuery is client side only. We provide a server side component as well for a total platform that provides services, analytics, and dynamic interactions for your users. 

Q\. Do I have to use your server for the plugins that require server side support?

A\. No. We provide a platform-as-a-service at api.pilotfish.io TODO: Link, but you can also download/install the api code and host yourself.

### Etymylogical Trivia ###
Why the name pilotfish? A pilot fish is one of those little fish that hover around sharks and eat the parasites, creating a mutually beneficial relationship with the shark. Similarly, Pilotfish aims to work alongside your application to make it better.

## Plugins ##
Several core plugins are included with the platform, and there is also a community of developers that create plugins as they are needed.

### Existing plugins ###
* TODO 

### Ideas for plugins ###

* New User Tutorial
* User Notifications
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

**Have an idea for a plugin? We'd love to hear it.** Please [file an issue](https://github.com/pilotfish/pilotfish/issues/new) describing your idea.

## Dependencies ##
jQuery >= 1.4

Interested in running this on a site that doesn't have jQuery? Please [file an issue](https://github.com/pilotfish/pilotfish/issues/new) so we can guage demand.

## Using ##

To use pilotfish, first include the base framework:

`<script src="http://cdn.portfolio.io/client/portfolio-stable-min.js"></script>`

Then you include the javascript for which plugins you may want to use:

`<script src="http://cdn.portfolio.io/plugins/new-user-walkthrough/new-user-walkthrough-stable-min.js"></script>`

#### Alternate Hosting Options ####
You may host these files yourself if you like. You may also use the Google CDN (TODO) or the Yahoo! CDN (TODO).

While it is recommend you use the 'stable', minified release of the javascript, you may also pick a different release state or lock to a specific version number. Examples:

* /client/portfolio/0.1/portfolio.js # non minifed, full comments in source code
* /client/portfolio/0.2/portfolio-min.js
* /client/portfolio/1/portfolio-min.js # will automatically upgrade to the latest stable release in the 1.0 series
* /client/portfolio/alpha/portfolio-min.js
* /client/portfolio/beta/portfolio-min.js