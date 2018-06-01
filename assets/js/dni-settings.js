window.addEventListener('load', function () {
    var addNewButton = document.querySelector('.add-row');

    addNewButton.addEventListener('click', function () {
        var dniForm = document.querySelector('.rowLnbSettingContainer');
        var dniFormRows = document.querySelectorAll('.rowLnbSetting');
        var indexArray = [];

        dniFormRows.forEach(function (formRow) {
            indexArray.push(parseInt(formRow.getAttribute('data-index')));
        });

        dniFormIndex = Math.max(...indexArray);
        dniFormIndex++;
        console.log(dniFormIndex);
        var rowNode = document.createElement('div');

        rowNode.className = 'rowLnbSetting';
        rowNode.setAttribute('data-index', dniFormIndex);
        rowNode.innerHTML = `<div class="lnbSetting setting-left">
				<input required="" class="lnbSetting__field lnbSetting__field--text" name="option[${dniFormIndex}][phone-number]" type="tel">
				<label class="lnbSetting__label">Tracking Number</label>
				<span class="lnbSetting__highlight"></span>
			</div>
			<div class="lnbSetting setting-right">
				<select form="dni-form" class="lnbSetting__select lnbSetting__select--text" name="option[${dniFormIndex}][source-select]">
					<option value="google.com">Google Organic</option>
					<option value="bing.com">Bing Organic</option>
					<option value="direct">Direct</option>
					<option value="ppc">PPC</option>
					<option value="ma">Marketing Automation</option>
					<option value="facebook.com">Facebook</option>
					<option value="yelp.com">Yelp</option>
				<select>
			</div>`;

        var dniForm = document.querySelector('.rowLnbSettingContainer');
        dniForm.appendChild(rowNode);
    });

    var deleteIcons = document.querySelectorAll('.dni-delete');
    deleteIcons.forEach(function (deleteIcon) {
        deleteIcon.addEventListener('click', function () {
            deleteIcon.parentNode.remove();
        });
    });

});
