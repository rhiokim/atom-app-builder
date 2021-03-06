module.exports = function(grunt) {

  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-download-atom-shell');

  grunt.initConfig({
    atomv: '0.15.7',
    os: process.platform,
    arch: process.arch,
    atom: 'atoms/atom-shell-v<%= atomv %>-<%= os %>-<%= arch %>',

    exec: process.platform === 'darwin' ? '<%= atom %>/Atom.app/Contents/MacOS/Atom' : '<%= atom %>/atom',

    clean: {},
    // jshint: {},
    // cssmin: {},
    // concat: {},
    // uglify: {},
    copy: {

      newapp: {
        files: [
          { expand: true, dot:true, cwd: 'boilerplate/<%= bp %>', src: ['**'], dest: 'apps/<%= newappname %>' }
        ]
      }

    },

    'download-atom-shell': {
      version: '<%= atomv %>',
      outputDir: '<%= atom %>'
    },

    requirejs: {},
    replace: {},
    shell: {
      run: {
        command: [
          '<%= exec %> ./apps/<%= app %>'
        ].join(';')
      },
      debug: {
        command: [
          '<%= exec %> ./apps/<%= app %> --debug'
        ].join(';')
      }
    }

  });

  grunt.registerTask('run', function() {
    var appname = grunt.option('app') || '.default';
    
    grunt.config.set('app', appname);

    if (process.platform === 'win32') {
      exec = exec.replace(/\//g, '\\');
      grunt.config.set('exec', exec);
    }

    grunt.task.run('shell:run');

  });

  grunt.registerTask('new', function() {
    var appname = grunt.option('app');
    var bp = grunt.option('bp') || '.default';

    if (grunt.file.isDir('./apps/'+appname)) {
      grunt.fail.warn('\nCan not create new app. \n"'+ appname +'" app is already exist.\n\n');
      return;
    }

    grunt.config.set('bp', bp);
    grunt.config.set('newappname', appname);

    grunt.task.run('copy:newapp');
  });


  grunt.registerTask('down', function() {
    var version = grunt.option('atom') || grunt.config.get('atomv');
    grunt.config.set('atomv', version);

    grunt.file.mkdir(grunt.config.get('atom'));

    grunt.task.run('download-atom-shell');
  });

  grunt.registerTask('default', [ ]);
};