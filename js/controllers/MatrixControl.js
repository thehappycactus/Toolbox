(function () {
	'use strict';

	angular
		.module('DCToolbox')
		.controller('MatrixControl', ['Batch', MatrixControl]);

	function MatrixControl(Batch) {
		var vm = this;
		vm.curItem = {};
		vm.curBatch = null;

		// Data Functions
		vm.getData = getData();
		vm.createbatch = createBatch;
		vm.addBatchItem = addBatchItem;

		// UI Functions
		//vm.openAddBatchItem = openAddBatchItem();

		function getData() {
			Batch.get().$promise.then(
				function (data) {
					vm.batches = data;
					vm.curBatch = vm.batches[vm.batches.length - 1].Batch_ID;
				}, function (error) {
					console.log(JSON.stringify(error));
				});	
		}

		function addBatchItem() {
			var batchItem = {
				batch_id: vm.curBatch,
				abn: vm.curItem.abn,
				description: vm.curItem.description,
				sentNbr: vm.curItem.sentNbr,
				openNbr: vm.curItem.openNbr,
				clickThroughs: vm.curItem.ctNbr,
				bounceNbr: vm.curItem.bounceNbr
			};

			Batch.post(batchItem).$promise.then(
				function (data) {
					vm.batches.push(data);
				}, function (error) {

				});
		}

		function createBatch() {

		}
	}

})();