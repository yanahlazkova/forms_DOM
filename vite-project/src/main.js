import * as dataFake from './dataFake';
// import dataFake from './dataFake'

// Створення h1
const h1 = document.createElement("h1");
h1.innerText = "Library system";
// document.body.append(h1);

// розміщення h1 в горі сторінки
const divContainer = document.body.getElementsByClassName("container")[0];
document.body.insertBefore(h1, divContainer);
// console.log(h1.attributes);

// отримаємо елемент по ID
// I - варіант
const table = document.body.querySelectorAll("table")[0]; // firstElementChild.nextElementSibling.firstElementChild;
// console.log(table.tagName);

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
const listDate = [];

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
inputBookTitle.onblur = function () {
  if (inputBookTitle.value != "") {
    inputBookTitle.className = "";
  }
};
listDate.push(inputBookTitle);

// Author
const labelBookAuthor = formAddBook.querySelector('label[for="authorname"');
labelBookAuthor.innerHTML = "Author:";

const inputBookAuthor = formAddBook.querySelector("#authorname");
inputBookAuthor.setAttribute("placeholder", "Author..");
listDate.push(inputBookAuthor);

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
listDate.push(selectBookGenre);

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
listDate.push(selectBookYear);

// отримаємо div кнопки Submit та розмістимо внизу форми
// const divButtonSubmit = formAddBook.querySelector('input[type="submit"]').parentElement;

// або:
// const divSubmit = formAddBook.lastElementChild;

// Створення checkbox EBook
const divEbook = document.createElement("div");
divEbook.className = "row";
divBookYear.append(divEbook);

const fieldsetEbook = document.createElement("fieldset");
fieldsetEbook.className = "row";
fieldsetEbook.hidden = true;
fieldsetEbook.name = "ebookFieldset";
divBookYear.after(fieldsetEbook);

const legendEBook = document.createElement("legend");
legendEBook.innerHTML = "Info e-book:";
fieldsetEbook.append(legendEBook);

const checkboxEbook = document.createElement("input");
checkboxEbook.setAttribute("type", "checkbox");
checkboxEbook.id = "ebook";
checkboxEbook.name = "ebook";
checkboxEbook.onclick = isEBook;
// legendEBook.append(checkboxEbook);

const labelEBook = document.createElement("label");
labelEBook.innerHTML = "e-Book";
labelEBook.style.marginLeft = "5px";
labelEBook.style.marginTop = "16px";
labelEBook.onclick = isEBook;
divEbook.append(checkboxEbook, labelEBook);

// вибір файлу e-Book
const inputFileEBook = document.createElement("input");
inputFileEBook.id = "fileebook";
inputFileEBook.name = "fileebook";
inputFileEBook.setAttribute("type", "file");
inputFileEBook.hidden = true;
inputFileEBook.addEventListener("change", dataEBook);
divEbook.append(inputFileEBook);
// listDate.push(inputFileEBook);

const labelInforEBook = document.createElement("pre");
legendEBook.after(labelInforEBook);

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
checkboxAutoFill.checked = false;
checkboxAutoFill.onclick = isAutoFill;
divCheckboxAutoFill.append(checkboxAutoFill);

const labelCheckboxAutoFill = document.createElement('label');
labelCheckboxAutoFill.innerHTML = 'Автоматне заповнення';
labelCheckboxAutoFill.id = 'autofill';
labelCheckboxAutoFill.setAttribute('for', 'autofill');
labelCheckboxAutoFill.onclick = isAutoFill;
labelCheckboxAutoFill.style.marginLeft = '10px';
divCheckboxAutoFill.append(labelCheckboxAutoFill);


// повідомлення <p>
const pMassage = document.createElement("p");
pMassage.className = "message";
pMassage.value = "** Заповніть обов'язкові поля";
pMassage.innerHTML = "** Заповніть обов'язкові поля";
divAutoFill.append(pMassage);

// показати/сховати додавання файлу e-Book
function isEBook() {
  checkboxEbook.checked = inputFileEBook.hidden;
  inputFileEBook.hidden = !inputFileEBook.hidden;
  labelInforEBook.hidden = inputFileEBook.hidden;
  fieldsetEbook.hidden = inputFileEBook.hidden;
}

function dataEBook() {
  if (this.files.length > 0) {
    fieldsetEbook.hidden = false;
    const currentFile = this.files[0];
    const format = currentFile.type.substring(
      currentFile.type.lastIndexOf("/") + 1
    );
    // console.log(`Format: ${format}`);
    // console.log(this.value);
    // показати данні обраного файлу e-Book
    const infoEBook =
      `Path:  <span style='color: lightgrey'>${this.value}</span><br>` +
      `Name:  <span style='color: lightgrey'>${currentFile.name}</span><br>` +
      `Size:  <span style='color: lightgrey'>${currentFile.size}</span> bites<br>` +
      `Format:  <span style='color: lightgrey'>${format}</span>`;

    labelInforEBook.innerHTML = infoEBook;
  } else console.log("File NOT");
}

// перевірка заповнення обов'язкових полів
function validateForm() {
  let countInvalidFields = 0;
  listDate.forEach((field) => {
    if (field.value == "") {
      // field.style.borderColor = 'red';
      field.className = "error";
      countInvalidFields++;
    } else {
      field.className = "";
      // field.style.borderColor = '#ccc';
    }
  });
  if (checkboxEbook.checked & (inputFileEBook.files.length == 0)) {
    // inputFileEBook.style.borderColor = 'red';
    inputFileEBook.className = "error";
    countInvalidFields++;
  } else inputFileEBook.className = "";
  if (countInvalidFields) {
    // pMassage.style.color = 'red';
    pMassage.setAttribute("class", "error");
    pMassage.innerHTML = `** Marked fields (${countInvalidFields}) must be filled out`;
  } else {
    pMassage.className = "message";
    pMassage.innerHTML = pMassage.value;
  }
  return false;
}

// const isAutoFill = () => {
function isAutoFill() {
  buttonAuto.disabled = !buttonAuto.disabled;
  checkboxAutoFill.checked = !buttonAuto.disabled;
  pMassage.hidden = !pMassage.hidden;

  for (let elem of formAddBook.querySelectorAll('input[type=text], select')) {
    elem.disabled = !elem.disabled;
  }
}

function fillData() {
  const dataBook = dataFake.autoDataFill();
  console.log('📚 Книга:', dataBook);

  inputBookTitle.value = dataBook['title'];
  inputBookAuthor.value = dataBook.author;
  selectBookYear.value = dataBook.year;

  // перевірка, чи існує вказаний жанр у списку вибору
  let isGenre = selectBookGenre.querySelector(`[value="${dataBook.genre.toLowerCase()}"]`) // arrayGenre.indexOf(dataBook.genre);
  console.log(isGenre);
   if (isGenre == null) {
    isGenre = optionBookGenreDetective.cloneNode(false); 
    isGenre.innerHTML = dataBook.genre;
    isGenre.value = dataBook.genre.toLocaleLowerCase();
    selectBookGenre.append(isGenre);
  } 
  isGenre.selected = true;
}