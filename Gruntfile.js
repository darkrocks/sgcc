/*global module:false*/
module.exports = function(grunt) {

  var tsSrc = ['**/*.ts', "!node_modules/**/*.ts"];
  // Project configuration.
  grunt.initConfig({
    watch: {
      ts: {
        files: tsSrc,
        tasks: ['ts', 'tslint:src']
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
      src: [
        tsSrc
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks('grunt-tslint');

  // Default task.
  grunt.registerTask('default', ["ts"]);

};
