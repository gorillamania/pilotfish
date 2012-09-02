/* Grunt task for building/releasing the javascript */
module.exports = function(grunt) {

  var fs = require('fs'),
      Seq = require('seq'),
      exec = require('child_process').exec;


  grunt.registerTask("_release", "perform a release of the javascript", function() {

    // Setup (make these args?)
    var historyFile = 'HISTORY.md',
        packageFile = 'package.json',
        minFile = 'pilotfish.min.js',
        srcFile = 'pilotfish.js';

    // Read the version from the pacakge.json. 
    var packageConfig = grunt.file.readJSON(packageFile),
        version = packageConfig.version;

    grunt.log.subhead("Running sanity checks on files");
    // Split the version up into major/minor/patch
    var versionMatch = ("" + version).match(/([0-9]{1,2})\.([0-9]{1,3})\.([0-9]{1,3})/);
    if (!versionMatch) {
      grunt.fatal("Invalid version number - x.x.x: " + version);
      return false;
    }
    var major = versionMatch[1], minor = versionMatch[2], patch = versionMatch[3];
    grunt.verbose.or.writeln('Major: ' + major + ', minor: ' + minor + ', patch:' + patch);

    // Check to make sure that the pilotfish.min.js looks ok.
    // Check that the versions match across the package, the file, and the release notes
    var versionRegexp = new RegExp(("" + version).replace(/([.?*+\^$\[\]\\(){}|\-])/g, "\\$1")),
        files  = [historyFile, srcFile, minFile];
    for (var i = 0; i < files.length; i++) {
      grunt.log.ok("Checking " + files[i]);
      if ( ! fs.existsSync(files[i])) { 
        grunt.fatal(files[i] + " does not exist");
        return false;
      }
      var contents = grunt.file.read(files[i]);
      if (! versionRegexp.test(contents)) {
        grunt.fatal("The contents of " + files[i] + " does not contain version (" + version + ")");
        return false;
      }
      grunt.verbose.writeln("Found in " + version + " in " + files[i]);

      // TODO: Check the js files with jshint, should compile
    }

    // Based on the version, walk through and create the appropriate directories/files.

    grunt.log.subhead("Writing files");
    function writePilotfish(dir) {
      grunt.helper('copyp', srcFile, dir + '/' + srcFile);
      grunt.helper('copyp', minFile, dir + '/' + minFile);
    }

    writePilotfish('dist/client/' + major);
    writePilotfish('dist/client/' + major + '.' + minor);
    writePilotfish('dist/client/' + major + '.' + minor + '.' + patch);

    grunt.log.subhead("Commiting to git");

    function run(cmd) {
      return function (callback){
        grunt.verbose.or.ok("Executing " + cmd);
        exec(cmd, function (error, stdout, stderr) {
          if (error) {
            grunt.fatal("'" + cmd + "' failed with :" + stderr);
          } else {
            grunt.verbose.writeln("Result of " + cmd + ':\n' + stdout);
            callback();
          }
        });
      };
    }

    var taskDone = this.async();

    grunt.utils.async.series([
      run('git pull'),
      run('git add dist'),
      run('git commit -m "Release. version ' + version + '"'),
      // Tagging
      run('git tag -f -a release/' + version + ' -m "version ' + version + '"'),
      run('git push --tags')
    ], function (error, results) {
      if (error) {
         grunt.fatal(error);
      } else {
        grunt.log.ok("git work done");
        taskDone();
      }
    });

    // TODO: Publish to pilotfish.github.com
    return true;
  });

  // Copy file from src to dest, making directories if necessary
  grunt.registerHelper('copyp', function(src, dest) {
    if (fs.existsSync(dest)) {
      grunt.warn("Destination file exists: " + dest);
    }

    var destDir = grunt.helper('basename', dest);
    if ( ! fs.existsSync(destDir)) { 
      grunt.verbose.writeln("Creating directory" + destDir);
      grunt.file.mkdir(destDir);
    }
    grunt.verbose.or.ok("Copying "+ src + " to " + dest);
    grunt.file.copy(src, dest);
  });

  grunt.registerHelper('basename', function(filename) {
    if (filename[filename.length-1] === "/") {
      return filename;
    } else {
      return filename.replace(/[^\/]+$/, '');
    }
  });
};
