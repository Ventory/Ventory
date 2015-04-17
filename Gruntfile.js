var fs = require('fs');
var path = require('path');


module.exports = function(grunt) {

	grunt.registerTask('docmaker', '', function() {

	    var readmeFile = fs.openSync("./docs/models/readme.md", 'w');
	    fs.writeSync(readmeFile, "Model Documentation\n---\n");

	    var modelFiles = fs.readdirSync('./models');
	    modelFiles.forEach(function(file) {
	      var fileContent = fs.readFileSync("./models/" + file, {encoding: 'utf8'});
	      // Array containing objects: {property, type, comment, default}
	      var modelfile = [];
	      var lines = fileContent.split('\n');
	      for (var i = 0; i < lines.length; i++) {
	        var line = lines[i];
	        if (line.indexOf('new Schema') != -1) {
	          var inSchema = true;
	        }
	        else if (inSchema) {
	          var hasComment = line.indexOf("//")
	          if (line.indexOf("});") > -1) {
	            inSchema = false;
	            break;
	          }
	          else if (hasComment > -1) {
	            var currentComment = line.substring(hasComment + 2);
	          }
	          else {
	          	// Perform RegEx search (property: {type: type, default: default})
	            var matches = line.match("^.*?([a-z]+): { type: ([a-z]+), (?:default: ([a-z.]+))*.*}/i");
	            if (matches.length) {
	              var matchbox = {property: matches[0], type: matches[1], comment: "", default: ""};
	              if (matches. length > 2) {
	                matchbox.default = matches[2];
	              }
	              if (currentComment) {
	                  matchbox.comment = currentComment;
	                  currentComment = null;
	              }
	              modelfile.push(matchbox);
	            }
	          }
	        }
	        var modelname = path.basename(file, ".js");
	        var fd = fs.openSync("./docs/models/" + modelname + ".md", 'w');
	        fs.writeSync(fd, modelname + " Model\n---\nProperty | Description | Type | Default\n--- | --- | --- | ---\n");
	        for (var j = 0; j < modelfile.length; j++) {
	          var fobj = modelfile[j];
	          fs.writeSync(fd, fobj.property + " | " + fobj.comment + " | " + fobj.type + " | " + fobj.default);
	        }
	        fs.closeSync(fd);
	        fs.writeSync(readmeFile, " - " + modelname + " Model [Doc](" + modelname + ".md) -- [Script](../../models/" + modelname + ".js)\n");
	      }
	    });
	    fs.closeSync(readmeFile);
  	});

	grunt.initConfig({
		
		concat: {
			mainjs: {
				src: ['fed-src/js/main/*.js'],
				dest: 'public/javascripts/main.js'
			},
			bootstrapjs: {
				src: [
				'fed-src/js/bootstrap/transition.js',
				'fed-src/js/bootstrap/alert.js',
				'fed-src/js/bootstrap/button.js',
				'fed-src/js/bootstrap/carousel.js',
				'fed-src/js/bootstrap/collapse.js',
				'fed-src/js/bootstrap/dropdown.js',
				'fed-src/js/bootstrap/modal.js',
				'fed-src/js/bootstrap/tooltip.js',
				'fed-src/js/bootstrap/popover.js',
				'fed-src/js/bootstrap/scrollspy.js',
				'fed-src/js/bootstrap/tab.js',
				'fed-src/js/bootstrap/affix.js'
				],
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
			fonts: 'public/fonts',
			npm: 'node_modules/'
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
			},
			modulejs: {
				files: [{ 
					expand: true,
					cwd: 'fed-src/js/modules/', 
					src: ['**/*.*'], 
					dest:'public/javascripts/modules' 
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
			fileContent: {
				files: ['fed-src/images/**/*.*', 'fed-src/fonts/**/*.*', 'fed-src/js/vendor/**/*.*', 'fed-src/js/modules/**/*.*'],
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

		docmaker: {
			options: {
				folder: './models'
			}
		}
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
	grunt.registerTask('runjs', ['jshint', 'concat', 'copy:modulejs', 'uglify']);

	// ---- Fresh Task
	// CSS Task > Javascript Task > Copy Fonts, Images and Vendor JS
	grunt.registerTask('fresh', ['runcss', 'runjs', 'copy']);

	// ---- CleanP Task
	// Clean Public Folder
	grunt.registerTask('cleanp', ['clean:distcss', 'clean:distjs', 'clean:images', 'clean:fonts']);
	
	// ---- CleanN Task
	// Clean Node_Modules Folder
	grunt.registerTask('cleann', ['clean:npm']);

	// ---- Everything
	// CSS Task > JS Task > Copy > Watch
	grunt.registerTask('default', ['runcss', 'runjs', 'copy', 'watch']);
};