/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/* Pilotfish, a toolkit for improving user experience. http://pilotfish.io\n' + 
                  'Copyright (c) 2012 Nick Sullivan, MIT license ' + 
                  'https://github.com/pilotfish/pilotfish/blob/master/LICENSE*/'
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', 'pilotfish.js'],
        dest: 'pilotfish.min.js'
      }
    },
    qunit: {
      files: ['test/**/*.html']
    }
  });

};
