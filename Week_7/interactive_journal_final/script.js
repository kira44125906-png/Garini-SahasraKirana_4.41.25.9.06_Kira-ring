sdocument.addEventListener('DOMContentLoaded', function () {

    // Select HTML elements using getElementById().
    const dateInput = document.getElementById('transactionDate');
    const referenceInput = document.getElementById('referenceNumber');
    const descriptionInput = document.getElementById('description');
    const accountInput = document.getElementById('account');
    const debitInput = document.getElementById('debit');
    const creditInput = document.getElementById('credit');

    const addTransactionButton =
        document.getElementById('addTransactionBtn');

    const saveJournalButton =
        document.getElementById('saveJournalBtn');

    const transactionTableBody =
        document.getElementById('transactionTableBody');

    const emptyState =
        document.getElementById('emptyState');

    const entryCount =
        document.getElementById('entryCount');


    // Format transaction amounts as Indonesian Rupiah.
    function formatRupiah(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(amount);
    }


    // Update the number of transaction entries.
    function updateTableStatus() {

        const totalEntries =
            transactionTableBody.querySelectorAll('tr').length;

        emptyState.hidden = totalEntries > 0;

        entryCount.textContent =
            totalEntries +
            (totalEntries === 1 ? ' entry' : ' entries');
    }


    // Clear all input fields after adding a transaction.
    function clearFormInputs() {
        document.getElementById('journalForm').reset();
    }


    // Create a new table cell.
    function createCell(row, value, className) {

        const cell = document.createElement('td');

        cell.textContent = value;

        if (className) {
            cell.classList.add(className);
        }

        row.appendChild(cell);

        return cell;
    }


    // Function to add a transaction row.
    function addTransactionRow() {

        // Get values from all form inputs.
        const transactionDate = dateInput.value;

        const referenceNumber =
            referenceInput.value.trim();

        const description =
            descriptionInput.value.trim();

        const account = accountInput.value;

        const debitValue =
            debitInput.value.trim();

        const creditValue =
            creditInput.value.trim();


        // Validate required information.
        if (
            !transactionDate ||
            !referenceNumber ||
            !description ||
            !account
        ) {
            alert(
                'Please complete the Date, Ref. No., Description, and Account fields.'
            );
            return;
        }


        // Debit and Credit cannot both be empty.
        if (debitValue === '' && creditValue === '') {

            alert(
                'Please enter an amount in either Debit or Credit.'
            );

            return;
        }


        // Debit and Credit cannot both contain amounts.
        if (debitValue !== '' && creditValue !== '') {

            alert(
                'Please enter an amount in Debit or Credit, not both.'
            );

            return;
        }


        // Convert input values into numbers.
        const debitAmount =
            debitValue === '' ? 0 : Number(debitValue);

        const creditAmount =
            creditValue === '' ? 0 : Number(creditValue);


        // Validate transaction amounts.
        if (
            (debitValue !== '' &&
                (!Number.isFinite(debitAmount) || debitAmount <= 0)) ||

            (creditValue !== '' &&
                (!Number.isFinite(creditAmount) || creditAmount <= 0))
        ) {

            alert(
                'The transaction amount must be greater than zero.'
            );

            return;
        }


        // Create a new table row.
        const newRow = document.createElement('tr');

        createCell(newRow, transactionDate);

        createCell(newRow, referenceNumber);

        createCell(newRow, description);

        createCell(newRow, account);

        createCell(
            newRow,
            debitAmount > 0 ? formatRupiah(debitAmount) : '-',
            'number-cell'
        );

        createCell(
            newRow,
            creditAmount > 0 ? formatRupiah(creditAmount) : '-',
            'number-cell'
        );


        // Create a Delete button.
        const actionCell = document.createElement('td');

        actionCell.classList.add('action-cell');

        const deleteButton =
            document.createElement('button');

        deleteButton.type = 'button';

        deleteButton.textContent = 'Delete';

        deleteButton.classList.add('delete-button');

        deleteButton.setAttribute(
            'aria-label',
            'Delete transaction ' + referenceNumber
        );


        // Delete the parent table row.
        deleteButton.addEventListener('click', function () {

            this.parentNode.parentNode.remove();

            updateTableStatus();

        });


        actionCell.appendChild(deleteButton);

        newRow.appendChild(actionCell);


        // Add the new row to the table body.
        transactionTableBody.appendChild(newRow);


        // Clear inputs and update the table.
        clearFormInputs();

        updateTableStatus();

    }


    // Automatically clear Credit when Debit is entered.
    debitInput.addEventListener('input', function () {

        if (debitInput.value !== '') {
            creditInput.value = '';
        }

    });


    // Automatically clear Debit when Credit is entered.
    creditInput.addEventListener('input', function () {

        if (creditInput.value !== '') {
            debitInput.value = '';
        }

    });


    // Add a transaction when the button is clicked.
    addTransactionButton.addEventListener(
        'click',
        addTransactionRow
    );


    // Save Journal (Dummy).
    saveJournalButton.addEventListener('click', function () {

        alert(
            'Journal successfully saved! (Data is not persistent)'
        );

        transactionTableBody.innerHTML = '';

        updateTableStatus();

    });


    // Set the initial table status.
    updateTableStatus();

});
