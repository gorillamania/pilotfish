# Pilotfish development guide

You are welcome to fork this repository. We'd love getting pull requests.

## Environment Setup
 Here are some recommendations for setting up your environment so that the code you write smells like the main project.

* [editorconfig](http://editorconfig.org/) so we have the same spacing style
* phantomjs - to automatically run all the qunit tests for you
    * Mac - `brew install phantomjs` is the easiest. [Alternatives](http://ariya.ofilabs.com/2012/02/phantomjs-and-mac-os-x.html)
    * *nix - [Download](http://phantomjs.org/download.html) or [Build from source](http://phantomjs.org/build.html)
* casperjs - 
    * Mac - `brew install casperjs` [Additional instructions](http://casperjs.org/installation.html)

## Testing
We recommend [Test Driven Development](http://en.wikipedia.org/wiki/Test-driven_development) be used, and we aim for 100% coverage. If you use `grunt watch`, you can have it run the tests every time you write a file.

We use travis-ci for automagic testing on every commit. Current test status:

[![Build Status](https://secure.travis-ci.org/pilotfish/pilotfish.png)](http://travis-ci.org/pilotfish/pilotfish)


### Running Tests

`grunt test`

## Coding Philosophy
In order to ensure high quality code, we ask that contributors follow some coding standards. 

Our overarching principals are **simplicity, readability, and maintainability.** We'll also borrow some ideas from [Python](http://www.python.org/dev/peps/pep-0020/)

    Beautiful is better than ugly.
    Explicit is better than implicit.
    Simple is better than complex.
    Complex is better than complicated.
    Flat is better than nested.
    Sparse is better than dense.
    Readability counts.
    Special cases aren't special enough to break the rules.
    Although practicality beats purity.
    Errors should never pass silently.
    Unless explicitly silenced.
    In the face of ambiguity, refuse the temptation to guess.
    There should be one-- and preferably only one --obvious way to do it.
    Although that way may not be obvious at first unless you're Dutch.
    Now is better than never.
    Although never is often better than *right* now.
    If the implementation is hard to explain, it's a bad idea.
    If the implementation is easy to explain, it may be a good idea.
    Namespaces are one honking great idea -- let's do more of those!

And we think that pretty much covers it.

### Pedantic coding standards
Most of the suggestions below apply to Javascript in specific, since most of the project is written in javascript. For the most part, we follow the [jQuery Core Style Guidelines](http://docs.jquery.com/JQuery_Core_Style_Guidelines), but we'd like to call out the following additional points:

* Spaces, not tabs. 4 of them. Pro tip: Use an editor that supports [editorconfig](http://editorconfig.org/), and this will be handled for you.
* Minification is the computer's job, not yours. Use explicit variable names.
* Braces on the same line, or I am afraid this won't work out.
* Cleverness is seldom required. When it is, comment it.
* Be considerate of other contributors. Will someone that reads your code later understand what you've done?
* Names matter. Use names that make sense for clarity.
* Minimized assume globals, explicitly reference `window` when you need to.
* Always use semicolons;
* Always use braces, no one-line shortcuts.
* Triple equals where it is a good idea. Don't leave type to chance.

Have a suggestion? Fork this page and issue a pull request! :)

## External resources
Here are a few interesting resources:

* http://neil.rashbrook.org/JS.htm
* https://developer.mozilla.org/En/Mozilla_Coding_Style_Guide
* http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml
* https://developers.google.com/closure/compiler/docs/js-for-compiler
* http://substack.net/posts/b96642
