/* vim: set expandtab tabstop=4: */

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
          banner: '/* <%= pkg.description %>, v<%= pkg.version %> <%= pkg.homepage %>\n' + 
                      'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>, MIT license ' + 
                      '<%= pkg.licenses[0].url %> */'
        },

        // run jshint on the files, with the options described below. Different globals defined based on file type
        // 'node' for files that are run by node.js (module, process, etc.)
        // 'browser' for files that are run by a browser (window, document, etc.)
        // 'qunit', ok, equal, etc.
        lint: {
            node: ['grunt.js', 'tasks/*.js'],
            browser: ['pilotfish.js', 'plugins/*/*.js'],
            qunit: ['test/*.js']
        },
        jshint: {
            // Apply to all js fils
            options: {
                camelcase: true,
                curly: true,
                eqeqeq: true,
                expr: true,
                forin: true,
                indent: 2,
                latedef: false,
                newcap: true,
                noarg: true,
                noempty: true, // debatable
                sub: true,
                undef: true, // Really. Leave it
                unused: true
            },
            globals: {},
            // Just for the 'node' src files
            node: {
                globals: {module:true, require: true, __dirname: true}
            },
            // Just for the 'browser' src files
            browser: {
                // Let's be strict here
                options: {expr: true},
                globals: {}
            },
            // Just for 'test' src files
            qunit: {
                options: {browser: true},
                globals: {module:true, ok: true, test: true, equal: true, expect: true}
            }
        },

        // Minify pilotfish src to pilotfish.min.js, prepending a banner
        min: {
            dist: {
                src: ['<banner:meta.banner>', 'pilotfish.js'],
                dest: 'pilotfish.min.js'
            }
        },

        // Run qunit on all the test files, using phantomjs
        qunit: {
            files: ['test/*.html']
        },

        // Every time a js file is changed, run lint and qunit
        watch: {
            files: ['grunt.js', 'tasks/*.js', 'pilotfish.js', 'test/**/*', 'plugins/**/*'],
            tasks: 'lint qunit'
        }
    });

    // Helpful for testing certain tests that don't run via the file:// protocol,
    // such as the tracker tests that use 3rd party providers
    grunt.registerTask('webserver', 'Start a http server to serve the files.', function() {
        var connect = require('connect');
        var done = this.async();
        grunt.log.writeln('Running a static web server on port 8042');
        connect(connect['static'](__dirname)).listen(8042);
    });

    // Load all the tasks inside the tasks/ directory
    grunt.loadTasks('tasks');

    grunt.registerTask('test', 'qunit');

    // This is what gets run when you don't specify an argument for grunt. 
    // Should be non destructive
    grunt.registerTask('default', 'lint qunit');
    grunt.registerTask('release', 'lint qunit build min gitRelease cdnPublish');

};
