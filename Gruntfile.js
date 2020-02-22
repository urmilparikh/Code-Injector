module.exports = function(grunt) {

    const sass = require('node-sass');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            html: {
                files: ['html/*'],
                tasks: ['copy:html'],
            },
            script: {
                files: ['script/**'],
                tasks: ['import:script'],
            },
            style: {
                files: ['style/fonts/**',
                        'style/images/**'],
                tasks: ['copy:style'],
            },
            sass: {
                files: ['style/*'],
                tasks: ['copy:sass', 'sass:dist', 'clean:sass'],
            },
            manifest: {
                files: ['manifest.json'],
                tasks: ['copy:manifest'],
            }
        },

        sass: {
            options: {
                outputStyle: 'compressed' ,
                sourcemap: 'none',
                implementation: sass,
            },
            dist: {
                files:{
                    'dist/style/browser-action.min.css': 'style/browser-action.scss',
                    'dist/style/options-ui.min.css':     'style/options-ui.scss',
                }
            }
        },

        copy: {

            html: {
                expand: true,
                cwd: 'html',
                src: '**',
                dest: 'dist/html',
            },
            style: {
                expand: true,
                cwd: 'style',
                src: ['images/**', 'fonts/**'],
                dest: 'dist/style',
            },
            sass: {
                expand: true,
                cwd: 'style',
                src: '*',
                dest: 'dist/style',
            },
            manifest: {
                expand: true,
                src: 'manifest.json',
                dest: 'dist/',
            },

            polyfill: {
                expand: true,
                cwd: './node_modules/webextension-polyfill/dist',
                src: 'browser-polyfill.min.js',
                dest: 'dist/script',
            },
            monaco: {
                expand: true,
                cwd: './node_modules/monaco-editor/min/vs',
                src: '**',
                dest: 'dist/script/vs',
            },
        },

        import: {
            script: {
                expand: true,
                cwd: 'script/main',
                src: '**',
                dest: 'dist/script',
            },
        },

        zip: {
            'using-cwd': {
                cwd: 'dist/',
                src: ['dist/*'],
                dest: 'code-injector-dist.zip'
            }
        },

        clean: {
        	options: {
                force: true
            },
            dist: ['dist/'],
            sass: ['dist/style/*.scss']
        }
    });

    // Load the npm modules
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-import');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Tasks
    grunt.registerTask('build', ['clean:dist', 'import', 'copy', 'sass:dist', 'clean:sass', 'zip']);
    grunt.registerTask('dev', ['build','watch']);

    // Task default
    grunt.registerTask('default', ['build']);

};

/*
    https://github.com/gruntjs/grunt-contrib-copy
    https://github.com/gruntjs/grunt-contrib-watch
    https://github.com/gruntjs/grunt-contrib-clean
    https://github.com/gruntjs/grunt-sass
*/