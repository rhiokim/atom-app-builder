module.exports = function(grunt) {

  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');

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

    grunt.config.set('bp', bp);
    grunt.config.set('newappname', appname);

    grunt.task.run('copy:newapp');
  });

  grunt.registerTask('default', [ ]);
};