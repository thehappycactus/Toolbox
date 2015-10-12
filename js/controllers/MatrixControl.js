(function () {
	'use strict';

	angular
		.module('DCToolbox')
		.controller('MatrixControl', ['Batch', 'BatchItem', MatrixControl]);

	function MatrixControl(Batch, BatchItem) {
		var vm = this;
		vm.batches = null;
		vm.addItem = {};
		vm.addBatch = {};
		vm.curIdx = 0;

		// Data Functions
		vm.getData = getData();
		vm.createBatch = createBatch;
		vm.editBatch = editBatch;
		vm.addBatchItem = addBatchItem;

		// UI Functions
		vm.openBatchView = openBatchView;

		function openBatchView(batch) {
			var displayDate = '.batchRow' + batch.Batch_ID + ' #displayDate';
			var editDate = '.batchRow' + batch.Batch_ID + ' #editDate';
			var displayDesc = '.batchRow' + batch.Batch_ID + ' #displayDescription';
			var editDesc = '.batchRow' + batch.Batch_ID + ' #editDescription';
			var displayNotes = '.batchRow' + batch.Batch_ID + ' #displayNotes';
			var editNotes = '.batchRow' + batch.Batch_ID + ' #editNotes';

			if ($(displayDate).hasClass('hidden')) {
				vm.editBatch(batch);

				$(displayDate).removeClass('hidden').addClass('show');
				$(editDate).removeClass('show').addClass('hidden');

				$(displayDesc).removeClass('hidden').addClass('show');
				$(editDesc).removeClass('show').addClass('hidden');

				$(displayNotes).removeClass('hidden').addClass('show');
				$(editNotes).removeClass('show').addClass('hidden');

			} else {
				$(displayDate).removeClass('show').addClass('hidden');
				$(editDate).removeClass('hidden').addClass('show');

				$(displayDesc).removeClass('show').addClass('hidden');
				$(editDesc).removeClass('hidden').addClass('show');

				$(displayNotes).removeClass('show').addClass('hidden');
				$(editNotes).removeClass('hidden').addClass('show');
			}
		}

		function getData() {
			Batch.get().$promise.then(
				function (data) {
					vm.batches = data;
				}, function (error) {
					console.log(JSON.stringify(error));
				});	
		}

		function addBatchItem() {
			var batchItem = {
				id: vm.batches[curIdx].Batch_ID,			// By default, add to the most recent/topmost batch
				abn: vm.addItem.abn,
				description: vm.addItem.description,
				sentNbr: vm.addItem.sentNbr,
				openNbr: vm.addItem.openNbr,
				clickThroughs: vm.addItem.ctNbr,
				bounceNbr: vm.addItem.bounceNbr
			};

			BatchItem.add(batchItem).$promise.then(
				function (data) {
					vm.batches[curIdx].Tests.push(data);
				}, function (error) { });
		}

		function createBatch() {
			var formattedDate = moment(vm.addBatch.date).format('YYYY-MM-DD');

			var batch = {
				id: vm.batches.length,
				date: formattedDate,
				testComponent: vm.addBatch.testComponent
			};

			Batch.put(batch).$promise.then(
				function (data){
					vm.batches.push(data);
				}, function (error) { });
		}

		function editBatch(batch) {
			var formattedDate = moment(batch.Date).format('YYYY-MM-DD');

			var batch = {
				id: batch.Batch_ID,
				date: formattedDate,
				testComponent: batch.Test_Component,
				description: batch.Description
			};

			Batch.post(batch).$promise.then(
				function (data){
					vm.batches.push(data);
				}, function (error) { });
		}
	}

})();