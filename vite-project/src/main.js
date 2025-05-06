import * as dataFake from './dataFake';

// Створення h1
const h1 = document.createElement("h1");
h1.innerText = "Library system";
// document.body.append(h1);

// отримаємо елемент по ID
// I - варіант
const table = document.body.querySelectorAll("table")[0]; // firstElementChild.nextElementSibling.firstElementChild;
// console.log(table.tagName);

// розміщення h1 в горі сторінки
const divContainer = document.body.getElementsByClassName("container")[0];
table.before(h1, divContainer);
// console.log(h1.attributes);

// II - варіант
// const table = document.getElementById('table');

// I варіант
// const tableRows = table.rows;
// console.log(tableRows);
// for (tr of tableRows) {
//     const tableCells = tr.cells;
//     for (td of tableCells) {
//         td.innerText = `${td.cellIndex + 1}:${tr.rowIndex + 1}`;
//         console.log(tableCells[td.cellIndex]);
//         if (td.cellIndex == tr.rowIndex)  td.style.backgroundColor = 'red';
//     }

// }

// II варіант
for (let i = 0; i < table.rows.length; i++) {
  const row = table.rows[i];
  row.cells[i].innerText = `${i + 1}:${i + 1}`;
  row.cells[i].style.backgroundColor = "red";
}

// table - ссылка на элемент с id="table"
table.style.backgroundColor = "blue";
table.style.color = "green";

// внутри id="bg-grey" есть дефис, так что такой id не может служить именем переменной
// ...но мы можем обратиться к нему через квадратные скобки: window['bg-grey']
// window['bg-grey'].style.backgroundColor = 'grey';

const links = document.querySelectorAll('[href*="://"]');
links.forEach((link) =>
  link.getAttribute("href").startsWith("http://internal.com")
    ? null
    : (link.style.color = "orange")
);

// список полів, обов'язкових для заповнення
// const listDate = [];

// змінемо данні форми AddBook вручну
divContainer.style.color = "green";

// const formAddBook = document.querySelector('form.AddBook');
const formAddBook = document.forms.addbook;
formAddBook.onsubmit = validateForm;

// Title
const labelBookTitle = formAddBook.querySelector('label[for="bTitle"]');
labelBookTitle.innerHTML = "Book Title:";

const inputBookTitle = formAddBook.querySelector('input[id="bTitle"]');
inputBookTitle.setAttribute("placeholder", "Title of the book..");
inputBookTitle.required = true;
inputBookTitle.onblur = function () {
  if (inputBookTitle.value != "") {
    inputBookTitle.className = "";
  }
};

// listDate.push(inputBookTitle);

// Author
const labelBookAuthor = formAddBook.querySelector('label[for="author"');
labelBookAuthor.innerHTML = "Author:";

const inputBookAuthor = formAddBook.querySelector("#author");
inputBookAuthor.setAttribute("placeholder", "Author..");
inputBookAuthor.required = true;
// listDate.push(inputBookAuthor);

// Видалимо div з тегом area
inputBookAuthor.parentElement.parentElement.nextElementSibling.nextElementSibling.remove(); //setAttribute('hidden', 'true');

// знайдемо Country
// та змінемо його на Gener

const labelBookGenre = formAddBook.querySelector("label[for=country]");
const divBookGenre = labelBookGenre.parentElement.parentElement;
labelBookGenre.setAttribute("for", "genre");
labelBookGenre.innerHTML = "Genre:";

const selectBookGenre = formAddBook.querySelector("#country");
selectBookGenre.id = "genre";
selectBookGenre.name = "genre";
selectBookGenre.required = true;
// listDate.push(selectBookGenre);

const optionBookGenreFantasy = selectBookGenre.firstElementChild;
optionBookGenreFantasy.setAttribute("value", "fantasy");
optionBookGenreFantasy.innerHTML = "Fantasy";

const optionBookGenreDetective = optionBookGenreFantasy.nextElementSibling;
optionBookGenreDetective.setAttribute("value", "detective");
optionBookGenreDetective.innerHTML = "Detective";

const optionBookGenreThriller = optionBookGenreDetective.nextElementSibling;
optionBookGenreThriller.setAttribute("value", "thriller");
optionBookGenreThriller.innerHTML = "Thriller";

const optionBookGenreHorror = document.createElement("option");
optionBookGenreHorror.setAttribute("value", "horror");
optionBookGenreHorror.innerHTML = "Horror";
selectBookGenre.append(optionBookGenreHorror);

const optionBook = document.createElement("option");
optionBook.defaultSelected = true;
optionBook.value = ''; //'empty';
optionBook.innerHTML = "";
selectBookGenre.prepend(optionBook);

// створимо div для Year:
const divBookYear = document.createElement("div");
divBookYear.setAttribute("class", "row");
// divBookYear.style.backgroundColor = 'blue';
// divBookYear.style.height = '50px';
divBookGenre.before(divBookYear);

const labelBookYear = document.createElement("label");
labelBookYear.setAttribute("for", "year");
labelBookYear.innerHTML = "Year:";
divBookYear.appendChild(labelBookYear);

const selectBookYear = document.createElement("select");
selectBookYear.id = "byear";
selectBookYear.name = "byear";
const option = document.createElement("option");
option.value = option.innerHTML = "";
selectBookYear.append(option);
for (let optionYear = 2025; optionYear > 1950; optionYear--) {
  const option = document.createElement("option");
  // option.setAttribute('value', optionYear);
  option.innerHTML = option.value = optionYear;
  selectBookYear.append(option);
}

divBookYear.append(selectBookYear);
inputBookAuthor.parentElement.parentElement.after(divBookYear);
selectBookYear.required = true;
// listDate.push(selectBookYear);

// отримаємо div кнопки Submit та розмістимо внизу форми
// const divButtonSubmit = formAddBook.querySelector('input[type="submit"]').parentElement;

// або:
// const divSubmit = formAddBook.lastElementChild;

// Створення div для книг e-book
const divEbook = document.createElement("div");
divEbook.className = "row-center";
divBookYear.after(divEbook);
// divEbook.onclick = isEBook;

// div для checkbox та label
// const divCheckboxEBook = document.createElement('div');
// divCheckboxEBook.style.display = 'inline';
// divCheckboxEBook.onclick = isEBook;
// divEbook.append(divCheckboxEBook);

const fieldsetEbook = document.createElement("fieldset");
fieldsetEbook.className = "row";
fieldsetEbook.hidden = true;
fieldsetEbook.name = "ebookFieldset";
divEbook.after(fieldsetEbook);

const legendEBook = document.createElement("legend");
legendEBook.innerHTML = "Info e-book:";
fieldsetEbook.append(legendEBook);

const checkboxEbook = document.createElement("input");
checkboxEbook.setAttribute("type", "checkbox");
checkboxEbook.id = "ebook";
checkboxEbook.name = "ebook";
checkboxEbook.checked = false;
checkboxEbook.onclick = isEBook;
// legendEBook.append(checkboxEbook);

const labelEBook = document.createElement("label");
labelEBook.innerHTML = "e-Book";
labelEBook.setAttribute('for', 'ebook');
labelEBook.style.marginLeft = "5px";
labelEBook.style.marginTop = "16px";
// labelEBook.onclick = isEBook;
// divCheckboxEBook.append(checkboxEbook, labelEBook);
divEbook.append(checkboxEbook, labelEBook);

// вибір файлу e-Book
const inputEBookFile = document.createElement("input");
inputEBookFile.id = "ebookfile";
inputEBookFile.name = "ebookfile";
inputEBookFile.type = 'file';
// inputFileEBook.disabled = true;
inputEBookFile.hidden = true;
inputEBookFile.addEventListener("change", dataEBook);
divEbook.append(inputEBookFile);
// listDate.push(inputFileEBook);

const labelOpenFile = document.createElement('label');
labelOpenFile.setAttribute('for', 'ebookfile');
labelOpenFile.className = 'label-button';
labelOpenFile.innerHTML = 'Вибрати файл'
divEbook.append(labelOpenFile);

const preInforEBook = document.createElement("pre");
preInforEBook.required = checkboxEbook.checked;
legendEBook.after(preInforEBook);

// створення div та кнопки для auto-заповнення полів
const divAutoFill = document.createElement('div');
divAutoFill.className = 'row';
formAddBook.prepend(divAutoFill);

// const buttonAuto = formAddBook.querySelector('input[type=submit]').cloneNode(true);// document.createElement('input');
const buttonAuto = document.createElement('button');
buttonAuto.onclick = fillData;
buttonAuto.innerHTML = 'Auto fill';
buttonAuto.setAttribute('type', 'button');
buttonAuto.disabled = true;
divAutoFill.append(buttonAuto);

// checkbox автозаповнення
const divCheckboxAutoFill = document.createElement('div');
// divCheckboxAutoFill.onclick = isAutoFill;
divAutoFill.append(divCheckboxAutoFill);

const checkboxAutoFill = document.createElement('input'); // checkboxEbook.cloneNode(false);
checkboxAutoFill.type = 'checkbox';
checkboxAutoFill.id = 'autofill';
checkboxAutoFill.name = 'autofill';
checkboxAutoFill.onclick = isAutoFill;
checkboxAutoFill.checked = false;
divCheckboxAutoFill.append(checkboxAutoFill);

const labelCheckboxAutoFill = document.createElement('label');
labelCheckboxAutoFill.innerHTML = 'Автоматичне заповнення';
labelCheckboxAutoFill.setAttribute('for', 'autofill');
labelCheckboxAutoFill.style.marginLeft = '10px';
divCheckboxAutoFill.append(labelCheckboxAutoFill);

// кнопка Submit
const submit = formAddBook.querySelector('input[type=submit]');
submit.value = 'Save'

// повідомлення <p>
const pMassage = document.createElement("p");
pMassage.className = "message";
pMassage.value = "** Заповніть обов'язкові поля";
pMassage.innerHTML = "** Заповніть обов'язкові поля";
divAutoFill.append(pMassage);

// для кожного з полів встановити дію при зміні даних та встановити доступною кнопку Save
for (let elem of formAddBook.querySelectorAll('#ebookfile, input[type=text], select')) {
  elem.onchange = () => {
    if (submit.disabled) {
    submit.disabled = !submit.disabled;}
  };
}

// показати/сховати додавання файлу e-Book
function isEBook(e) {
  inputEBookFile.style.display = 'none';
  checkboxEbook.checked = inputEBookFile.hidden;
  inputEBookFile.hidden = !inputEBookFile.hidden;
  preInforEBook.hidden = inputEBookFile.hidden;
  fieldsetEbook.hidden = inputEBookFile.hidden;
  // e.preventDefault();
  
  console.log(e.target);
}

// створення кнопки для вибору файлу
const createButtonOpenFile = () => {
  const buttonOpenFile = document.createElement('input');
  buttonOpenFile.id = 'fileInput';
  buttonOpenFile.type = 'file';
  buttonOpenFile.style.display = 'none';

  const labelOpenFile = document.createAttribute('label');
  labelOpenFile.setAttribute('for', 'fileInput');
  labelOpenFile.className = 'button';
  labelOpenFile.value = 'Вибрати файл';

  divEbook.append(buttonOpenFile, labelOpenFile)
}

// відображення даних (путь до файлу, ім'я, розмір, формат файлу) eBook
function dataEBook() {
  if (this.files.length > 0) {
    fieldsetEbook.hidden = false;
    const currentFile = this.files[0];
    const format = currentFile.type.substring(
      currentFile.type.lastIndexOf("/") + 1
    );

    // показати данні обраного файлу e-Book
    const infoEBook =
      `Path:  <span style='color: lightgrey'>${this.value}</span><br>` +
      `Name:  <span style='color: lightgrey'>${currentFile.name}</span><br>` +
      `Size:  <span style='color: lightgrey'>${currentFile.size}</span> bites<br>` +
      `Format:  <span style='color: lightgrey'>${format}</span>`;

    preInforEBook.innerHTML = infoEBook;
  } else console.log("File NOT");
}

// перевірка заповнення обов'язкових полів

// I - спосіб

// function validateForm(e) {
//   // console.log('validate', e);
  
//   let countInvalidFields = 0;

// // зміна класу незаповнених полів (border color - red)
//   const listDate = formAddBook.querySelectorAll('[required]')
//   // console.log(listDate);
//   listDate.forEach((field) => {
//     // if (field.value == "") {
//     //   field.className = "error";
//     //   countInvalidFields++;
//     // } else {
//     //   field.className = "";
//     // }
    
//     console.log(field.name +': ' + field.checkValidity());
//   });
//   if (checkboxEbook.checked & (inputEBookFile.files.length == 0) & !checkboxAutoFill.checked) {
//     inputEBookFile.className = 'error';
//     countInvalidFields++;
//   } else inputEBookFile.className = "";
//   if (countInvalidFields) {
//     // pMassage.hidden = false;
//     pMassage.setAttribute("class", "error");
//     pMassage.innerHTML = `** Marked fields (${countInvalidFields}) must be filled out`;
//   } else {
//     pMassage.className = "message";
//     pMassage.innerHTML = 'Данні передані';
//     submit.disabled = true;
//     inputEBookFile.className = "";
//   }
//   return false;
// }

// II - спосіб (за допомогою Promic)
function validateForm(event) {
  event.preventDefault(); // заборона стандартної відправки форми 
  
}

// const isAutoFill = () => {}

// автозаповнення
function isAutoFill() {
  buttonAuto.disabled = !buttonAuto.disabled;
  submit.disabled = !buttonAuto.disabled;
  checkboxAutoFill.checked = !buttonAuto.disabled;
  pMassage.className = 'message';
  inputEBookFile.hidden = true;
  // якщо дані в повідомленні були змінені (тобто при авто заповнені було повідомлення що дані відправлені),
  // щоб не було можливості відправити ті самі данні повторно при знятті галочки Автозаповлення - 
  // заблокувати повторне відправлення даних
  if (pMassage.innerHTML != pMassage.value) {
    pMassage.innerHTML = pMassage.value;
    submit.disabled = true;
  }

  for (let elem of formAddBook.querySelectorAll('#ebook, input[type=text], select')) {
    elem.disabled = !elem.disabled;
    elem.className = "";
  }

}

// автозаповнення форми
function fillData() {
  submit.disabled = false;
  pMassage.innerHTML = pMassage.value;
  const dataEBook = dataFake.autoDataFill();
  console.log('📚 Книга:', dataEBook);

  // const cookie = document.cookie;

  inputBookTitle.value = dataEBook['title'];
  inputBookAuthor.value = dataEBook.author;
  selectBookYear.value = dataEBook.year;

  if (dataEBook.ebook) {
    checkboxEbook.checked = true;
    inputEBookFile.hidden = true;
    fieldsetEbook.hidden = false;
    preInforEBook.innerHTML = 
    `Path:  <span style='color: lightgrey'>${dataEBook.ebook.path}</span><br>` +
    `Name:  <span style='color: lightgrey'>${dataEBook.ebook.name}</span><br>` +
    `Size:  <span style='color: lightgrey'>${dataEBook.ebook.size}</span> bites<br>` +
    `Format:  <span style='color: lightgrey'>${dataEBook.ebook.format}</span>`;
    preInforEBook.hidden = false;
    console.log('eBook', dataEBook.ebook.path);

  } else {
    checkboxEbook.checked = false;
    fieldsetEbook.hidden = true;
    preInforEBook.hidden = true;
  }

  // перевірка, чи існує вказаний жанр у списку вибору
  let isGenre = selectBookGenre.querySelector(`[value="${dataEBook.genre.toLowerCase()}"]`) // arrayGenre.indexOf(dataBook.genre);
  console.log(isGenre);
   if (isGenre == null) {
    isGenre = optionBookGenreDetective.cloneNode(false); 
    isGenre.innerHTML = dataEBook.genre;
    isGenre.value = dataEBook.genre.toLocaleLowerCase();
    selectBookGenre.append(isGenre);
  } 
  isGenre.selected = true;
}

// let script = document.createElement('script');

// // мы можем загрузить любой скрипт с любого домена
// script.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js"
// document.head.append(script);

// script.onload = function() {
//   // в скрипте создаётся вспомогательная переменная с именем "_"
//   alert(_.VERSION); // отображает версию библиотеки
//   console.log(_);
// };

// script.onerror = function() {
//   console.log('Error of load: ' + this.src);
// }