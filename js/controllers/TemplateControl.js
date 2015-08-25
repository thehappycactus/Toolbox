angular
	.module('DCToolbox')
	.controller('TemplateControl', ['EmailTemplate', TemplateControl]);

function TemplateControl (EmailTemplate) {
	var vm = this;
	vm.subjectList = null;
	vm.salutationList = null;
	vm.introList = null;
	vm.bodyList = null;
	vm.signOffList = null;

	vm.emailArr = new Array();

	vm.listIdx = 0;

	vm.treeSetup = function () {
		$('.tree').treeview({
			data: []
		});
	}

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
					fr.onloadend = function (e) { 
						vm.subjectList = e.target.result.split('\n');
						var tempList = new Array()
						for (var k = 0; k < vm.subjectList.length; k++) {
							tempList[k] = { text: vm.subjectList[k], icon: 'glyphicon glyphicon-play' };
						}	
						$('#subjectTree').treeview({ data: tempList }); 
					};
					break;
				case 1:
					fr.onloadend = function(e) { 
						vm.salutationList = e.target.result.split('\n');
						var tempList = new Array()
						for (var k = 0; k < vm.salutationList.length; k++) {
							tempList[k] = { text: vm.salutationList[k], icon: 'glyphicon glyphicon-play' };
						}	
						$('#saluTree').treeview({ data: tempList }); 
					};
					break;
				case 2:
					fr.onloadend = function (e) { 
						vm.introList = e.target.result.split('\n'); 
						var tempList = new Array()
						for (var k = 0; k < vm.introList.length; k++) {
							tempList[k] = { text: vm.introList[k], icon: 'glyphicon glyphicon-play' };
						}	
						$('#introTree').treeview({ data: tempList });
					};
					break;
				case 3:
					fr.onloadend = function (e) { 
						vm.bodyList = e.target.result.split('\n'); 
						var tempList = new Array()
						for (var k = 0; k < vm.bodyList.length; k++) {
							tempList[k] = { text: vm.bodyList[k], icon: 'glyphicon glyphicon-play' };
						}	
						$('#bodyTree').treeview({ data: tempList });
					};
					break;
				case 4:
					fr.onloadend = function (e) { 
						vm.signOffList = e.target.result.split('\n'); 
						var tempList = new Array()
						for (var k = 0; k < vm.signOffList.length; k++) {
							tempList[k] = { text: vm.signOffList[k], icon: 'glyphicon glyphicon-play' };
						}	
						$('#signOffTree').treeview({ data: tempList });
					};
					break;
				default:
					alert('something went wrong assigning onloadend events');
			}

			fr.readAsText(uploadArr[i]);
		}
	};

	vm.createTemplates = function () {
		var nodeTree = new Array();

		for (var i = 0; i < vm.subjectList.length; i++) {
			nodeTree.push({
				text: vm.subjectList[i],
				// selectedIcon: 'glyphicon glyphicon-ok',
				selectable: true,
				state: {
					checked: true
				},
				nodes: new Array()
			});
			for (var j = 0; j < vm.salutationList.length; j++) {
				nodeTree[i].nodes.push({
					text: vm.salutationList[j],
					selectedIcon: 'glyphicon glyphicon-ok',
					selectable: true,
					nodes: new Array()
				});
				for (var k = 0; k < vm.introList.length; k++) {
					nodeTree[i].nodes[j].nodes.push({
						text: vm.introList[k],
						selectedIcon: 'glyphicon glyphicon-ok',
						selectable: true,
						nodes: new Array()
					});
					for (var l = 0; l < vm.bodyList.length; l ++) {
						nodeTree[i].nodes[j].nodes[k].nodes.push({
							text: vm.bodyList[l],
							selectedIcon: 'glyphicon glyphicon-ok',
							selectable: true,
							nodes: new Array()
						});
						for (var m = 0; m < vm.signOffList.length; m++) {
							nodeTree[i].nodes[j].nodes[k].nodes[l].nodes.push({
								text: vm.signOffList[m],
								selectedIcon: 'glyphicon glyphicon-ok',
								selectable: true,
							});

							var newEmail = new EmailTemplate(
								vm.subjectList[i],
								vm.salutationList[j],
								vm.introList[k],
								vm.bodyList[l],
								vm.signOffList[m]
							);

							vm.emailArr.push(newEmail);

						}
					}
				}
			}
		}

		$('#emailTree').treeview({
			data: nodeTree,
			multiselect: true,
		});

		console.log(vm.emailArr.length + ' templates were created.');
	}

	vm.downloadAll = function () {
		var allEmails = '';
		for (var i = 0; i < vm.emailArr.length; i ++) {
			allEmails += vm.emailArr[i].createEmail() + '\n\n';
		}

		var emailBlob = new Blob([allEmails], { type: 'text/plain' });
		var dlLink = window.URL.createObjectURL(emailBlob);
		window.open(dlLink, '_blank');
	}

}