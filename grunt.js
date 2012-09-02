module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/* Pilotfish, a toolkit for improving user experience. http://pilotfish.io\n' + 
                  'Copyright (c) <%= grunt.template.today("yyyy") %> Nick Sullivan, MIT license ' + 
                  'https://github.com/pilotfish/pilotfish/blob/master/LICENSE */'
    },

    // run jshint on the files, with the options described below. Different globals defined based on file type
    // 'node' for files that are run by node.js (module, process, etc.)
    // 'browser' for files that are run by a browser (window, document, etc.)
    // 'qunit', ok, equal, etc.
    lint: {
      node: ['grunt.js', 'tasks/**/*.js'],
      browser: ['pilotfish.js'],
      qunit: ['test/**/*.js']
    },
    jshint: {
      // Apply to all js fils
      options: {
        camelcase: true,
        curly: true,
        eqeqeq: true,
        forin: true,
        indent: 2,
        latedef: true,
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
        globals: {module:true, require: true}
      },
      // Just for the 'browser' src files
      browser: {
        // Let's be strict here
        globals: {}
      },
      // Just for 'test' src files
      qunit: {
        options: {browser: true},
        globals: {module:true, ok: true, test: true, equal: true}
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
      files: ['test/**/*.html']
    },

    // Every time a js file is changed, run lint and qunit
    watch: {
      files: ['**/*.js'],
      tasks: 'lint qunit'
    }
  });

  // Load all the tasks inside the tasks/ directory
  grunt.loadTasks('tasks');

  // This is what gets run when you don't specify an argument for grunt. 
  // Should be non destructive
  grunt.registerTask('default', 'lint qunit');
  grunt.registerTask('release', 'lint qunit _release');

};
