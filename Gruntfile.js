
module.exports = function(grunt) {

	grunt.initConfig({
		
		concat: {
			mainjs: {
				src: ['fed-src/js/main/*.js'],
				dest: 'public/javascripts/main.js'
			},
			bootstrapjs: {
				src: ['fed-src/js/bootstrap/*.js'],
				dest: 'public/javascripts/bootstrap.js'
			}
		},

		uglify: {
			options: {
				preserveComments: 'some'
			},
			core: {
				src: '<%= concat.bootstrapjs.dest %>',
				dest: 'public/javascripts/bootstrap.min.js'
			},
			main: {
				src:  '<%= concat.mainjs.dest %>',
				dest: 'public/javascripts/main.min.js'
			}
		},

		jshint: {
			beforerun: ['fed-src/js/main/*.js']
		},

		clean: {
			distcss: 'public/stylesheets',
			distjs: 'public/javascripts',
			images: 'public/images',
			fonts: 'public/fonts'
		},

		copy: {
			images: {
				files: [{ 
					expand: true,
					cwd: 'fed-src/images/', 
					src: ['**/*.{png,jpg,svg,ico}'], 
					dest:'public/images/' 
				}]
			},
			fonts: {
				files: [{ 
					expand: true,
					cwd: 'fed-src/fonts/', 
					src: ['**/*.*'], 
					dest:'public/fonts/' 
				}]
			},
			vendorjs: {
				files: [{ 
					expand: true,
					cwd: 'fed-src/js/vendor/', 
					src: ['**/*.*'], 
					dest:'public/javascripts/vendor' 
				}]
			}
		},

		watch: {
			js: {
				files: ['fed-src/js/**/*.js'],
				tasks: ['runjs'],
			},
			less: {
				files: ['fed-src/less/**/*.less'],
				tasks: ['runcss'],
			},
			customless: {
				files: ['fed-src/less-custom/**/*.less'],
				tasks: ['runcss'],
			},
			data: {
				files: ['fed-src/images/**/*.*', 'fed-src/fonts/**/*.*', 'fed-src/js/vendor/**/*.*'],
				tasks: ['copy']
			}
		},

		less: {
			compileCore: {
				options: {
					strictMath: true,
					sourceMap: true,
					outputSourceFiles: true,
					sourceMapURL: 'bootstrap.css.map',
					sourceMapFilename: 'public/stylesheets/bootstrap.css.map'
				},
				src: 'fed-src/less/bootstrap.less',
				dest: 'public/stylesheets/bootstrap.css'
			},
			compileTheme: {
				options: {
					strictMath: true
				},
				src: ['fed-src/less-custom/*.less'],
				dest: 'public/stylesheets/bootstrap-theme.css'
			}
		},

		autoprefixer: {
			options: {
				browsers: [
				"Android 2.3",
				"Android >= 4",
				"Chrome >= 20",
				"Firefox >= 24",
				"Explorer >= 8",
				"iOS >= 6",
				"Opera >= 12",
				"Safari >= 6"
				]
			},
			core: {
				options: {
					map: true
				},
				src: 'public/stylesheets/bootstrap.css'
			},
			theme: {
				options: {
					map: true
				},
				src: 'public/stylesheets/bootstrap-theme.css'
			},
		},

		csslint: {
			options: {
				csslintrc: 'fed-src/less/.csslintrc'
			},
			dist: [
			'public/stylesheets/bootstrap.css',
			'public/stylesheets/bootstrap-theme.css'
			]
		},

		cssmin: {
			options: {
				compatibility: 'ie8',
				keepSpecialComments: '*',
				advanced: false
			},
			minifyCore: {
				src: 'public/stylesheets/bootstrap.css',
				dest: 'public/stylesheets/bootstrap.min.css'
			},
			minifyTheme: {
				src: 'public/stylesheets/bootstrap-theme.css',
				dest: 'public/stylesheets/bootstrap-theme.min.css'
			}
		},
	});

	// All of the modules
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-autoprefixer');

	// Note: clean has to be used with --force
	// because it works "out of bounds"


	// ---- CSS Task
	// .less compiling & concat > prefixing > lint check > minify
	// Do not rename / Referenced in watch
	grunt.registerTask('runcss', ['less', 'autoprefixer', 'csslint', 'cssmin']);

	// ---- Javascript Task
	// lint check > concatenating > minify
	// Do not rename / Referenced in watch
	grunt.registerTask('runjs', ['jshint', 'concat', 'uglify']);

	// ---- Fresh Task
	// CSS Task > Javascript Task > Copy Fonts, Images and Vendor JS
	grunt.registerTask('fresh', ['runcss', 'runjs', 'copy']);

	// ---- Everything
	// CSS Task > JS Task > Copy > Watch
	grunt.registerTask('default', ['runcss', 'runjs', 'copy', 'watch']);


};