angular
	.module('DCToolbox')
	.factory('EmailTemplate', EmailTemplate);

function EmailTemplate () {
	var vm = this;

	var EmailTemplate = function (_subject, _salutation, _intro, _body, _signOff) {
		this.subject = _subject;
		this.salutation = _salutation;
		this.intro = _intro;
		this.body= _body;
		this.signOff = _signOff;
	};

	EmailTemplate.prototype.createEmail = function () {
		var finalEmail = 
			this.subject + '\n\n' + 
			this.salutation + '\n\n' + 
			this.intro + '\n\n' + 
			this.body + '\n\n' +
			this.signOff;

		return finalEmail;
	}
	
	return EmailTemplate;
}