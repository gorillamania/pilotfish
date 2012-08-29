module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/* Pilotfish, a toolkit for improving user experience. http://pilotfish.io\n' + 
                  'Copyright (c) <%= grunt.template.today("yyyy") %> Nick Sullivan, MIT license ' + 
                  'https://github.com/pilotfish/pilotfish/blob/master/LICENSE*/'
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', 'pilotfish.js'],
        dest: 'pilotfish.min.js'
      }
    },
    lint: {
      node: ['grunt.js'],
      browser: ['pilotfish.js'],
      test: ['test/**/*.js']
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
        regexp: true,
        sub: true,
        undef: true, // Really. Leave it
        unused: true
      },
      globals: {},
      // Just for the 'node' src files
      node: {
        globals: {module:true}
      },
      // Just for the 'browser' src files
      browser: {
        // Let's be strict here
        globals: {}
      },
      // Just for 'test' src files
      test: {
        options: {browser: true},
        globals: {module:true, ok: true, test: true, equal: true}
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    }
  });

  grunt.registerTask('default', 'lint:browser qunit min');

};
