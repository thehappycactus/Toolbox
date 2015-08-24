angular
	.module('DCToolbox')
	.controller('TemplateControl', ['EmailTemplate', TemplateControl]);

function TemplateControl (ETemplate) {
	var vm = this;
	vm.subjectList = null;
	vm.salutationList = null;
	vm.introList = null;
	vm.bodyList = null;
	vm.signOffList = null;

	vm.listIdx = 0;

	vm.upload = function () {
		// Check for the various File API support.
		if (window.File && window.FileReader && window.FileList && window.Blob) {
		  // Great success! All the File APIs are supported.
		} else {
		  alert('The File APIs are not fully supported in this browser.');
		}

		var subjectFile = document.getElementById('subjectFile').files[0];
		var saluFile = document.getElementById('saluFile').files[0];
		var introFile = document.getElementById('introFile').files[0];
		var bodyFile = document.getElementById('bodyFile').files[0];
		var signOffFile = document.getElementById('signOffFile').files[0];
		var uploadArr = [ subjectFile, saluFile, introFile, bodyFile, signOffFile ];

		var j = 0;
		for (var i = 0; i < uploadArr.length; i++) {
			var fr = new FileReader();
			switch (i) {
				case 0:
					fr.onloadend = function (e) { vm.subjectList = e.target.result.split('\n'); };
					break;
				case 1:
					fr.onloadend = function(e) { vm.salutationList = e.target.result.split('\n'); };
					break;
				case 2:
					fr.onloadend = function (e) { vm.introList = e.target.result.split('\n'); };
					break;
				case 3:
					fr.onloadend = function (e) { vm.bodyList = e.target.result.split('\n'); };
					break;
				case 4:
					fr.onloadend = function (e) { vm.signOffList = e.target.result.split('\n'); };
					break;
				default:
					alert('something went wrong assigning onloadend events');
			}

			fr.readAsText(uploadArr[i]);
		}
	};

	vm.createTemplates = function () {
		var emailArr = new Array();

		for (var i = 0; i < vm.subjectList.length; i++) {
			for (var j = 0; j < vm.salutationList.length; j++) {
				for (var k = 0; k < vm.introList.length; k++) {
					for (var l = 0; l < vm.bodyList.length; l ++) {
						for (var m = 0; m < vm.signOffList.length; m++) {
							var newEmail = new EmailTemplate({
								subject: i,
								salutation: j,
								intro: k,
								body: l,
								signOff: m
							});

							emailArr.push(newEmail);
						}
					}
				}
			}
		}

		console.log(emailArr.length + ' templates were created.');
	}

}