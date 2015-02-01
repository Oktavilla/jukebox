"use strict";

module.exports = function(grunt) {
  grunt.file.defaultEncoding = "utf8";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    env: {
      development: {
        NODE_ENV: "development"
      },
      test: {
        NODE_ENV: "test"
      }
    },

    sass: {
      options: {
        includePaths: ["./sass/"]
      },
      development: {
        files: {
          "./tmp/stylesheets/main.css": "./sass/main.scss"
        }
      },
      production: {
        files: {
          "./public/stylesheets/main.css": "./sass/main.scss"
        }
      }
    },

    express: {
      development: {
        options: {
          port: (process.env.PORT || 3000),
          script: "./app.js"
        }
      }
    },

    watch: {
      scss: {
        files: ["sass/*.scss"],
        tasks: ["sass:development"]
      },
      js: {
        files:  ["modules/**/*.js", "handlers/**/*.js", "Gruntfile.js"],
        tasks:  ["express:development"],
        options: {
          spawn: false
        }
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      watch: {
        tasks: ["watch:scss", "watch:js"]
      }
    },
  });

  grunt.loadNpmTasks("grunt-contrib-requirejs");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-express-server");
  grunt.loadNpmTasks("grunt-env");
  grunt.loadNpmTasks("grunt-shell");
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-concurrent");

  grunt.registerTask("default", ["server"]);

  grunt.registerTask("server", [
    "env:development",
    "express:development",
    "sass:development",
    "concurrent:watch"
  ]);

  grunt.registerTask("heroku", [
    "setup",
    "sass:production"
  ]);
};
