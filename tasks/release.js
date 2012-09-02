/* Grunt task for building/releasing the javascript */
module.exports = function(grunt) {

  var fs = require('fs'),
      Seq = require('seq'),
      exec = require('child_process').exec;

  // Setup (make these args?)
  var historyFile = 'HISTORY.md',
      packageFile = 'package.json',
      minFile = 'pilotfish.min.js',
      srcFile = 'pilotfish.js',
      cdnDir = '../pilotfish.github.com';


  // Helper function for shell commands (to be used by grunt.utils.async lib)
  function run(cmd) {
    return function (callback, options){
      grunt.verbose.or.ok("Executing " + cmd);
      exec(cmd, options || {}, function (error, stdout, stderr) {
        if (error) {
          grunt.fatal("'" + cmd + "' failed with :" + stderr);
        } else {
          grunt.verbose.writeln("Result of " + cmd + ':\n' + stdout);
          callback();
        }
      });
    };
  }

  grunt.registerTask("build", "Create the files in ./dist/", function() {

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

    writePilotfish('dist/client/latest');
    writePilotfish('dist/client/' + major);
    writePilotfish('dist/client/' + major + '.' + minor);
    writePilotfish('dist/client/' + major + '.' + minor + '.' + patch);
    return true;
  });

  grunt.registerTask("gitRelease", "git commit/tag/push the files in ./dist/", function() {

    // Read the version from the pacakge.json. 
    var packageConfig = grunt.file.readJSON(packageFile),
        version = packageConfig.version;

    // Tell grunt this task is asynchronous
    var taskDone = this.async();

    grunt.utils.async.series([
      run('git pull'),
      run('git add dist'),
      run('git commit -m "Release. version ' + version + '"'),
      run('git push'),
      // Tagging
      run('git tag -f -a release/' + version + ' -m "version ' + version + '"'),
      run('git push --tags')
    ], function (error, results) {
      if (error) {
        grunt.fatal(error);
      } else {
        grunt.log.ok("./dist/ committed, tag added, results pushed");
        // Mark this task as done
        taskDone();
      }
    });

    return true;
  });

  grunt.registerTask("cdnPublish", "Push files to cdn.pilotfish.io (pilotfish.github.com)", function() {
    if (! fs.existsSync(cdnDir)) {
      grunt.fatal(cdnDir + " does not exist");
    }

    // Read the version from the pacakge.json. 
    var packageConfig = grunt.file.readJSON(packageFile),
        version = packageConfig.version;

    var taskDone = this.async();

    grunt.utils.async.series([
      run('rsync -av --delete ./dist/client/ ' + cdnDir + '/client/'),
      run('cd ' + cdnDir + ' && git pull'),
      run('cd ' + cdnDir + ' && git add client', {'cwd': cdnDir}),
      run('cd ' + cdnDir + ' && git commit -m "Release. version ' + version + '"', {'cwd': cdnDir}),
      run('cd ' + cdnDir + ' && git push'),
      // Tagging
      run('cd ' + cdnDir + ' && git tag -f -a release/' + version + ' -m "version ' + version + '"', {'cwd': cdnDir}),
      run('cd ' + cdnDir + ' && git push --tags', {'cwd': cdnDir})
    ], function (error, results) {
      if (error) {
        grunt.fatal(error);
      } else {
        grunt.log.ok("Files copied to " + cdnDir + " , tag added, results pushed");
        // Mark this task as done
        taskDone();
      }
    });
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

  // Get the filename only from a full path
  grunt.registerHelper('basename', function(filename) {
    if (filename[filename.length-1] === "/") {
      return filename;
    } else {
      return filename.replace(/[^\/]+$/, '');
    }
  });
};
