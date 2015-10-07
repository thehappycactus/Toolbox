(function () {
	'use strict';

	angular
		.module('DCToolbox')
		.factory('Batch', ['$resource', Batch]);

	function Batch($resource) {
		return $resource(
			'http://dctapi-dev.elasticbeanstalk.com/matrix/batches/:batch_id',
			{ batch_id: '@batch_id' },
			{ get: {
				method: 'GET',
				isArray: true
				},
				post: {
					method: 'POST',
					isArray: false
				}
			});
	}

})();