/*global module:false*/
module.exports = function(grunt) {

  var tsSrc = ['**/*.ts', "!node_modules/**/*.ts", "!src/lib/**/*.ts"];
  // Project configuration.
  grunt.initConfig({
    watch: {
      ts: {
        files: tsSrc,
        tasks: ['ts', 'tslint:src']
      },
      less: {
        files: ['src/styles/**/*.less'],
        tasks: 'less:develop'
      }
    },
    ts: {
      default : {
        src: tsSrc
      }
    },
    tslint: {
      options: {
        configuration: grunt.file.readJSON("tslint.json")
      },
      src: tsSrc
    },
    less: {
      develop:{
        options: {
          strictMath: true,
          sourceMap: false,
          ieCompat: false,
          relativeUrls: true
        },
        src: ['src/styles/app.less'],
        dest: 'src/styles/app.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks('grunt-tslint');

  // Default task.
  grunt.registerTask('default', ["ts", "less:develop"]);

};
