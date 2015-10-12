(function () {
	'use strict';

	angular
		.module('DCToolbox')
		.factory('BatchItem', ['$resource', Batch]);

	function Batch($resource) {
		return $resource(
			'http://dctapi-dev.elasticbeanstalk.com/matrix/batches/:batch_id/items',
			{ batch_id: '@id' },
			{ 	post: {
					method: 'POST',
					isArray: false
				},
				put: {
					method: 'PUT',
					isArray: false
				}
			});
	}

})();