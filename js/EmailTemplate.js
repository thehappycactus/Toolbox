angular
	.module('DCToolbox')
	.factory('EmailTemplate', EmailTemplate);

function EmailTemplate () {
	var vm = this;

	vm.EmailTemplate = function (templData) {
		if (templData) {
			vm.subject = templData.subject;
			vm.salutation = templData.salutation;
			vm.intro = templData.intro;
			vm.body = templData.body;
			vm.signOff = templData.signOff;
		}

		vm.setData = function(data) {
			vm.subject = data.subject;
			vm.salutation = data.salutation;
			vm.intro = data.intro;
			vm.body = data.body;
			vm.signOff = data.signOff;
		}

		vm.createEmail = function () {
			var finalEmail = 
				vm.subject + '\n\n' + 
				vm.salutation + '\n\n' + 
				vm.intro + '\n\n' + 
				vm.body + '\n\n' +
				vm.signOff;

			return finalEmail;
		};
	}

	return vm;
}