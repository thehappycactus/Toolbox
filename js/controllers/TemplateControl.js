angular
	.module('DCToolbox')
	.controller('TemplateControl', ['EmailTemplate', TemplateControl]);

function TemplateControl (EmailTemplate) {
	var vm = this;
	vm.subjectList = null;
	vm.salutationList = null;
	vm.introList = null;
	vm.paraAList = null;
	vm.paraBList = null;
	vm.signOffList = null;

	vm.emailArr = new Array();

	vm.listIdx = 0;

	vm.upload = function () {
		// var ladda = Ladda.create(document.querySelector('#btnUpload'));
		// ladda.start();
		// Check for the various File API support.
		if (window.File && window.FileReader && window.FileList && window.Blob) {
		  // Great success! All the File APIs are supported.
		} else {
		  alert('The File APIs are not fully supported in this browser.');
		  // ladda.stop();
		}

		var subjectFile = document.getElementById('subjectFile').files[0];
		var saluFile = document.getElementById('saluFile').files[0];
		var introFile = document.getElementById('introFile').files[0];
		var paraAFile = document.getElementById('paraAFile').files[0];
		var paraBFile = document.getElementById('paraBFile').files[0];
		var signOffFile = document.getElementById('signOffFile').files[0];
		var uploadArr = [ subjectFile, saluFile, introFile, paraAFile, paraBFile, signOffFile ];

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
						vm.paraAList = e.target.result.split('\n'); 
						var tempList = new Array()
						for (var k = 0; k < vm.paraAList.length; k++) {
							tempList[k] = { text: vm.paraAList[k], icon: 'glyphicon glyphicon-play' };
						}	
						$('#paraATree').treeview({ data: tempList });
					};
					break;
				case 4:
					fr.onloadend = function (e) { 
						vm.paraBList = e.target.result.split('\n'); 
						var tempList = new Array()
						for (var k = 0; k < vm.paraBList.length; k++) {
							tempList[k] = { text: vm.paraBList[k], icon: 'glyphicon glyphicon-play' };
						}	
						$('#paraBTree').treeview({ data: tempList });
					};
					break;
				case 5:
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

		// ladda.stop();		// This isn't quite right, but will do for now.
	};

	vm.createTemplates = function () {
		var nodeTree = new Array();
		// var ladda = Ladda.create(document.querySelector('#btnCreate'));
		// ladda.start();

		for (var i = 0; i < vm.subjectList.length; i++) {
			nodeTree.push({
				text: vm.subjectList[i],
				selectedIcon: 'glyphicon glyphicon-ok',
				selectable: true,
				state: { checked: true },
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
					for (var l = 0; l < vm.paraAList.length; l ++) {
						nodeTree[i].nodes[j].nodes[k].nodes.push({
							text: vm.paraAList[l],
							selectedIcon: 'glyphicon glyphicon-ok',
							selectable: true,
							nodes: new Array()
						});
						for (var m = 0; m < vm.paraBList.length; m++) {
							nodeTree[i].nodes[j].nodes[k].nodes[l].nodes.push({
								text: vm.paraBList[m],
								selectedIcon: 'glyphicon glyphicon-ok',
								selectable: true,
								nodes: new Array()
							});
							for (var n = 0; n < vm.signOffList.length; n++) {
								nodeTree[i].nodes[j].nodes[k].nodes[l].nodes[m].nodes.push({
									text: vm.signOffList[m],
									selectedIcon: 'glyphicon glyphicon-ok',
									selectable: true,
								});

								var newEmail = new EmailTemplate(
									i,
									vm.subjectList[i],
									vm.salutationList[j],
									vm.introList[k],
									vm.paraAList[l],
									vm.paraBList[m],
									vm.signOffList[n]
								);

								vm.emailArr.push(newEmail);
							}
						}
					}
				}
			}
		}

		$('#emailTree').treeview({
			data: nodeTree,
			levels: 1,
			multiselect: true,
		});

		// ladda.stop();

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

	vm.downloadSelected = function() {
		var selectedEmails = '';
		var leadNodes = $('#emailTree li');
		var selectedIdx = 0;

		for (var i = 0; i < leadNodes.length; i ++) {
			if ($(leadNodes[i]).hasClass('node-selected')) {
				selectedIdx = i;
				break;			// Right now only 1 item can be selected
			}
		}

		var selectedCounter = 0;
		for (var j = 0; j < vm.emailArr.length; j ++) {
			if (vm.emailArr[j].topLevel === selectedIdx) {
				selectedEmails += vm.emailArr[j].createEmail() + '\n\n';
				selectedCounter++;
			}
		}

		console.log(selectedCounter + ' templates were selected.');

		var emailBlob = new Blob([selectedEmails], { type: 'text/plain' });
		var dlLink = window.URL.createObjectURL(emailBlob);
		window.open(dlLink, '_blank');

	}

}