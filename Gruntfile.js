/*global module:false*/
module.exports = function(grunt) {

  var tsSrc = ['**/*.ts', "!node_modules/**/*.ts", "!src/client/lib/**/*.ts"];
  // Project configuration.
  grunt.initConfig({
    watch: {
      ts: {
        files: tsSrc,
        tasks: ['tslint:src', 'ts']
      },
      less: {
        files: ['src/client/styles/**/*.less'],
        tasks: 'less:develop'
      }
    },
    ts: {
      default : {
        src: ["src/typescript-references/references.ts", tsSrc],
        reference: "src/typescript-references/references.ts"
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
        src: ['src/client/styles/app.less'],
        dest: 'src/client/styles/app.css'
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
