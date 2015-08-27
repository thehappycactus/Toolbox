angular
	.module('DCToolbox')
	.factory('EmailTemplate', EmailTemplate);

function EmailTemplate () {
	var vm = this;

	var EmailTemplate = function (_subject, _salutation, _intro, _paraA, _paraB, _signOff) {
		this.subject = _subject;
		this.salutation = _salutation;
		this.intro = _intro;
		this.paraA = _paraA;
		this.paraB = _paraB
		this.signOff = _signOff;
	};

	EmailTemplate.prototype.createEmail = function () {
		var finalEmail = 
			this.subject + '\n\n' + 
			this.salutation + '\n\n' + 
			this.intro + '\n\n' + 
			this.paraA + '\n\n' +
			this.paraB + '\n\n' +
			this.signOff + '\n' +
			'-----';

		return finalEmail;
	}
	
	return EmailTemplate;
}