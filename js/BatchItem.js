(function() {
	'use strict';

	angular
		.module('DCToolbox')
		.factory('BatchItem', ['$resource', BatchItem]);

	function BatchItem($resource) {
		$resource(
			'http://dctapi-dev.elasticbeanstalk.com/matrix/batches/:batch_id',
			{ batch_id: Constants.merchant_id },
			{ post: {
					method: 'POST',
					isArray: false
				}
			})
	}
})();