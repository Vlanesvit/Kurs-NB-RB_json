// Объект с курсами
const rates = [
  {
    currency: 'USD',
  },
  {
    currency: 'EUR',
  },
  {
    currency: 'RUB',
  },
  {
    currency: 'PLN',
  },
  {
    currency: 'UAH',
  },
  {
    currency: 'GBP',
  },
];

getCurrencied();

// Функция получения курса валют
async function getCurrencied() {
  const responce = await fetch(
    'https://www.nbrb.by/api/exrates/rates?periodicity=0'
  );
  const data = await responce.json();
  const result = await data;

  console.log(result);

  getRates(result);
}

// Функция для отображения курса валют на странице
function getRates(result) {
  // Вывод определенных валют из массива
  rates[0].currency = result[5];
  rates[1].currency = result[6];
  rates[2].currency = result[17];
  rates[3].currency = result[7];
  rates[4].currency = result[3];
  rates[5].currency = result[23];

  createItemList();

  // Обновить страницу
  document.querySelector('.update-btn').addEventListener('click', () => {
    window.location.reload();
  });

  // Копирование строки в буфер обмена
  const copyBtns = document.querySelectorAll('button[data-type="copy"]');

  copyBtns.forEach(function (button) {
    button.addEventListener('click', function () {
      const tableTd = this.parentNode.querySelectorAll('td');
      let tdText = '';
      for (let index = 0; index < tableTd.length; index++) {
        const tmp = document.createElement('textarea');
        console.log(tableTd.innerHTML);
        tdText += tableTd[index].innerHTML + ' ';
        tmp.value = tdText;
        document.body.appendChild(tmp);
        tmp.select();
        document.execCommand('copy');
        document.body.removeChild(tmp);
      }
    });
  });
}

// Функция для создания элемента tr в table и ввода в них значения валюты
function createItemList() {
  const mainTableBody = document.querySelector('.default-table tbody');

  for (let i = 0; i < rates.length; i++) {
    const currencyItem = document.createElement('tr');
    currencyItem.classList.add('row');
    mainTableBody.appendChild(currencyItem);

    currencyItem.innerHTML = `
      <td>${rates[i].currency.Cur_Scale + ' ' + rates[i].currency.Cur_Name}</td>
      <td>${rates[i].currency.Cur_OfficialRate.toFixed(2)}</td>
      <td>${rates[i].currency.Cur_Abbreviation}</td>
      <td>${rates[i].currency.Date}</td>
      <button data-type="copy" title="Скопировать в буфер обмена" class="btn">
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512">
          <rect x="128" y="128" width="336" height="336" rx="57" ry="57" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/>
          <path d="M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>
        </svg>
      </button>
    `;
  }
}
