window.addEventListener('load', function() {
    // Get the Add New Button Node
    var addNewButton = document.querySelector('.add-row');

    // When the Add New Button is Clicked, Create Row Node and Input HTML -- Creates New Row
    addNewButton.addEventListener('click', function() {
        var dniForm = document.querySelector('.rowLnbSettingContainer');
        var dniFormRows = document.querySelectorAll('.rowLnbSetting');
        var indexArray = [];
        if (dniFormRows) {
            dniFormRows.forEach(function(formRow) {
                indexArray.push(parseInt(formRow.getAttribute('data-index')));
            });
        }
        // dniFormIndex = isNaN(Math.max(...indexArray)) ? 1 : Math.max(...indexArray);

        if (isNaN(Math.max(...indexArray))) {
            dniFormIndex = 0;
        } else {
            dniFormIndex = Math.max(...indexArray);
        }

        dniFormIndex++;
        var rowNode = document.createElement('div');

        rowNode.className = 'rowLnbSetting';
        rowNode.setAttribute('data-index', dniFormIndex);
        rowNode.innerHTML = `<div class="willbeX"></div>
            <div class="lnbSetting setting-class">
                <input required="" class="lnbSetting__field lnbSetting__field--text" name="option[${dniFormIndex}][class]" type="text">
                <label class="lnbSetting__label">Class</label>
                <span class="lnbSetting__highlight"></span>
            </div>
            <div class="lnbSetting setting-left">
				<input required="" class="lnbSetting__field lnbSetting__field--text" name="option[${dniFormIndex}][phone-number]" type="tel">
				<label class="lnbSetting__label">Tracking Number</label>
				<span class="lnbSetting__highlight"></span>
			</div>
			<div class="lnbSetting setting-right">
				<select form="dni-form" class="lnbSetting__select lnbSetting__select--text" name="option[${dniFormIndex}][source-select]">
					<option value="www.google.com">Google Organic</option>
					<option value="www.bing.com/">Bing Organic</option>
					<option value="direct">Direct</option>
					<option value="ppc">Google Adwords</option>
					<option value="ma">Marketing Automation</option>
					<option value="www.facebook.com">Facebook</option>
					<option value="www.yelp.com">Yelp</option>
                    <option class="dni-custom-select" value="custom">Custom</option>
				<select>
			</div>`;

        // Get the Settings Container and Append the New Row
        var dniForm = document.querySelector('.rowLnbSettingContainer');
        dniForm.appendChild(rowNode);

        // Bind the Custom Referrer Field Function for New Rows
        var currentRow = rowNode.querySelector('.lnbSetting__select');
        currentRow.addEventListener('change', function() {
            if (
                currentRow.options[currentRow.selectedIndex].value == 'custom' &&
                !currentRow.querySelector('.setting-custom')
            ) {
                dniAddCustomField(currentRow);
            } else if (currentRow.parentNode.parentNode.querySelector('.setting-custom-row')) {
                currentRow.parentNode.parentNode.querySelector('.setting-custom-row').remove();
                return;
            }
        });
    });

    // Bind Click Function to Delete Rows
    var deleteIcons = document.querySelectorAll('.dni-delete');
    deleteIcons.forEach(function(deleteIcon) {
        deleteIcon.addEventListener('click', function() {
            deleteIcon.parentNode.remove();
        });
    });

    // Function to Add Custom Referrer Field
    var dniAddCustomField = function(dniSelect) {
        dniCustomInputField = document.createElement('div');
        //console.log(dniFormIndex);
        var dniFormIndex = dniSelect.parentNode.parentNode.getAttribute('data-index');
        dniCustomInputField.innerHTML = `<div class="lnbSetting setting-custom-row">
                <input required="" class="lnbSetting__field lnbSetting__field--text custom-referrer-field" name="option[${dniFormIndex}][custom-referrer]" type="tel">
                    <label class="lnbSetting__label">Custom Referrer / Parameter</label>
                    <span class="lnbSetting__highlight"></span>
                    </div>`;
        dniSelect.parentNode.parentNode.append(dniCustomInputField);
        return dniCustomInputField;
    };

    // Bind Custom Referrer Field Function to Change Event on Source Select
    dniSettingSelect = document.querySelectorAll('.lnbSetting__select');
    dniSettingSelect.forEach(function(dniSelect) {
        dniSelect.addEventListener('change', function() {
            if (
                dniSelect.options[dniSelect.selectedIndex].value == 'custom' &&
                !dniSelect.querySelector('.setting-custom')
            ) {
                dniAddCustomField(dniSelect);
            } else {
                dniSelect.parentNode.parentNode.querySelector('.setting-custom-row').remove();
            }
        });
    });
});
