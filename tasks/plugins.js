/* Tasks for dealing with plugins */

module.exports = function(grunt) {

    grunt.registerTask("buildPlugins", "Create the files in ./dist/plugins/", function() {
        var plugins = ['tracker'];
        for (var i = 0; i < plugins.length; i++) {
            var n = plugins[i];
            grunt.log.subhead("Packaging " + n + " plugin");
            // TODO: Sanity checks
            // TODO: Take the existing banner instead of hard coding

            var banner = "/* Pilotfish " + n + " plugin, see https://github.com/pilotfish/pilotfish/blob/master/plugins/" + n + "\n" +
                         "* Copyright (c) 2012 Nick Sullivan, MIT license https://github.com/pilotfish/pilotfish/blob/master/LICENSE */\n",
                srcfile = 'plugins/' + n + '/pilotfish-' + n + '.js',
                minfile = 'dist/client/plugins/' + n + '/pilotfish-' + n + '.min.js';

            grunt.helper('copyp', srcfile, 'dist/client/' + srcfile);

            var max = grunt.file.read(srcfile);

             // Concat banner + minified source.
            var min = banner + grunt.helper('uglify', max, grunt.config('uglify'));
            grunt.file.write(minfile, min);

            // Fail task if errors were logged.
            if (this.errorCount) { return false; }

            // Otherwise, print a success message....
            grunt.log.writeln('File "' + minfile + '" created.');
            // ...and report some size information.
            grunt.helper('min_max_info', min, max);


        }
        return true;
    });

    grunt.registerTask("initPlugin", "Scaffolding for pilotfish plugins", function(){
        var prompt  = require('prompt'), 
            fs      = require('fs');

        var args    = grunt.utils.toArray(arguments), 
            plugin  = args.shift();

        var taskDone = this.async();

        if ( plugin ) {
            createPlugin(plugin);
        } else {
            grunt.log.writelns(
              'This task will create a set of scaffolding for a new pilotfish plugin',
              'What would you like the plugin to be called?'
            );
            prompt.start();
            prompt.get('plugin name', function(err, results) {
                createPlugin(results['plugin name']);
            });
        } 


        function createPlugin(plugin){
            if (! (/[a-z\-]{2,25}/).test(plugin)) {
                grunt.fatal("Invalid plugin name: " + plugin + ", expecting lower case and dashes, at least two characters, not more than 25");
            }

            var dir = 'plugins/' + plugin + '/';

            // Is it already there?
            if ( fs.existsSync(dir)) {
                grunt.fatal("Directory " + dir + " already exists");
            }

            grunt.file.mkdir(dir);
            grunt.file.mkdir(dir + 'test/');

            function copyAndProcess(from, to) {
                var src = 'tasks/plugin-template/' + from,
                    dest = dir + to;

                var contents = grunt.file.read(src);
                var processed = grunt.template.process(contents, {"pluginName": plugin}, 'init');
                grunt.file.write(dest, processed);

                grunt.verbose.or.write('Writing ' + dir + 'README');
            }

            copyAndProcess('README.md', 'README.md');
            copyAndProcess('pilotfish-rename.js', 'pilotfish-' + plugin + '.js');
            copyAndProcess('test/test-rename.js', 'test/test-' + plugin + '.js');
            copyAndProcess('test/test-rename.html', 'test/test-' + plugin + '.html');


            taskDone();
        }
    });

};
