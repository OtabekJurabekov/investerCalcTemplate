document.getElementById('add-month').addEventListener('click', () => {
    const tbody = document.getElementById('investment-body');
    const rowCount = tbody.rows.length;
    const newRow = tbody.insertRow(rowCount);

    newRow.innerHTML = `
        <td>${rowCount + 1}</td>
        <td><input type="number" placeholder="Enter money" required></td>
        <td class="total-per-month">$0.00</td>
    `;
});

document.getElementById('calculate').addEventListener('click', () => {
    let percentIncrease = parseFloat(document.getElementById('percent-increase').value) / 100;
    const timeForCalculating = parseInt(document.getElementById('time-for-calculating').value);
    const npl = parseFloat(document.getElementById('npl').value) / 100;
    const tax = parseFloat(document.getElementById('tax').value) / 100;
    const otherSpending = parseFloat(document.getElementById('other-spending').value) / 100;

    const table = document.getElementById('investment-table');
    const rows = table.rows;

    let totalMoney = 0;
    let smspend = npl + tax + otherSpending;

    for (let i = 1; i < rows.length; i++) {
        const investedMoney = parseFloat(rows[i].cells[1].querySelector('input').value);
        let moneyAfterExpenses = investedMoney;
        totalMoney += moneyAfterExpenses;

        let profit = totalMoney / 12 * (1 + percentIncrease);
        totalMoney += profit - profit * smspend;
        rows[i].cells[2].innerText = `$${totalMoney.toFixed(2)}`; 
    }

    for (let i = 0; i < timeForCalculating; i++) {
        let profit = totalMoney / 12 * (1 + percentIncrease);
        totalMoney += profit - profit * smspend;    
    }

    document.getElementById('result').innerText = `\$${totalMoney.toFixed(2)}`;
});