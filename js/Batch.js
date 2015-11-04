(function () {
	'use strict';

	angular
		.module('DCToolbox')
		.factory('Batch', ['$resource', Batch]);

	function Batch($resource) {
		return $resource(
			'http://dctapi-dev.elasticbeanstalk.com/matrix/batches/:batch_id',
			{ batch_id: '@id' },
			{ 	get: {
					method: 'GET',
					isArray: true,
					transformResponse: function (data, headersGetter) {
						var dataArr = JSON.parse(data);

						return dataArr.sort(function (a, b) {
							if (a.Batch_ID < b.Batch_ID)
								return 1;
							if (a.Batch_ID > b.Batch_ID)
								return -1;

							return 0;
						});
					}
				},
				post: {
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