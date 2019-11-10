var sass = require('node-sass');
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat:{
            options:{
                separator: '\n/******* KiMiA Js file seperator *******/\n'
            },
            js: {
                src: [
                    'node_modules/vue/dist/vue.js',
                    'app/js/*.js'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify:{
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist:{
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
                }
            }
        },
        jshint: {
            files: [
                'Gruntfile.js',
                'app/js/*.js'
            ],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        sass:{
            dist:{
                options:{
                    implementation: sass,
                    sourcemap: 'none'
                },
                files:{
                    'dist/<%= pkg.name %>.css': 'app/sass/main.sass'
                }
            }
        },
        watch: {
            sass:   {
                files: ['app/sass/**.sass'],
                tasks: ['sass']
            },
            js:{
                files: ['app/js/*.js'],
                tasks: ['js']
            },
            gruntFile:{
                files: ['Gruntfile.js'],
                tasks: ['do']
            }
        },
        // Connect to local server
        connect: {
            server: {
                options: {
                    base:       './',
                    port:       5008,
                    debug:      true,
                    open:       true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('js', ['concat','jshint','uglify']);
    grunt.registerTask('start', ['js','sass','connect','watch']);
};