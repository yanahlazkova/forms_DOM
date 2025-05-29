import * as getFake from './dataFake';
// import * as Book from './book';

// require('dotenv').config();git push --force



// const globalUrl = 'https://github.com/yanahlazkova/forms_DOM/blob/main/vite-project/src/readers.json'
// const globalUrl = './d/Записные книжки OneNote/Мои документы/Olexandr_js/Library_system_DOM/vite-project/src/readers.json';
// отримаємо форму
const formAddReader = document.querySelector('#addReader')//document.forms['addReader'];

// данні форми
let reader = {};

// данні json-файлу (список читачів)
let dataJSON = undefined;

// отримаємо кнопку автозаповнення форми
const autoFill = document.querySelector('#autoreader');
autoFill.onclick = autoData;

// кнопка заповнення з JSON
const readJSON = document.querySelector('#readjson');
readJSON.onclick = toReadJSON;

// отримаємо кнопку Submit
const submit = document.querySelector('#writeReader');
submit.onclick = toSendJSON;

// список обов'язкових полів
const listData = [];
const id = document.getElementById('idreader');
listData.push(id);
const firstName = document.getElementById('fname');
listData.push(firstName);
const lastName = document.getElementById('lname');
listData.push(lastName);
const email = document.getElementById('email');
listData.push(email);
const address = document.getElementById('address');
listData.push(address);
console.log('listData', listData);

// встановлення ID-читача
const buttonID = document.getElementById('buttonid');
const inputID = document.getElementById('idreader');
buttonID.onclick = () => inputID.value = getFake.createID();

// пошук по ID
const selectID = document.getElementById('idreaders');
const divIsFindID = document.querySelector('#findreader');
const checkboxSearchID = document.querySelector('#issearchid');
checkboxSearchID.addEventListener('change', getListIDReaders);
checkboxSearchID.onclick = displaySearchID;

function displaySearchID() {
    divIsFindID.hidden = !checkboxSearchID.checked;
}

const buttonFindID = document.getElementById('findid');
buttonFindID.onclick = findReaderID;

// кодирования в base64 с Unicode (кирилиця)
function encodeToBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function decodeToUnicode(encodedStr) {
    return decodeURIComponent(escape(atob(encodedStr)))
}

// отримання списка ID читачів
async function getListIDReaders(event) {
    if (!event.target.checked) {
        // Очистити список ID читачів
       selectID.innerHTML = '';
       return;
    }
    const githubUsername = import.meta.env.VITE_GITHUB_USERNAME;
    const repo = "forms_DOM";
    const filePath = "vite-project/src/readers.json";
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    const apiUrl = `https://api.github.com/repos/${githubUsername}/${repo}/contents/${filePath}`;

    try {
    // Получаем текущую версию файла
    const getResponse = await fetch(apiUrl, {
        headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json"
        }
    });

    if (!getResponse.ok) throw new Error("Файл не найден или ошибка доступа");

    const fileData = await getResponse.json();
    const content = decodeToUnicode(fileData.content);// atob(fileData.content);
    dataJSON = JSON.parse(content);


    
    // console.log(data);
    createOptionIDReaders(dataJSON);

    } catch (error) {
    alert("Произошла ошибка: " + error.message);
    console.error(error);
    }

}

// заповнення списку читачів з їх ID 
function createOptionIDReaders(listReaders) {
    listReaders.forEach((reader) => {
        const optionID = document.createElement("option");
        // console.log(reader);
        optionID.innerHTML = `${reader.firstname} ${reader.lastname} - ${reader.id}`, 
        selectID.append(optionID)});
    if (selectID.length) {
        console.log('Заповнюємо список');
    } else console.log('Список пустий');
}

function findReaderID() {
    // з'ясовуємо який id треба знайти
    const dataReader = selectID.value.split(' ');
    const idfind = dataReader[dataReader.length - 1];
    console.log(idfind);

    // знаходимо id у даних JSON-файлу
    dataJSON.forEach(foundReader => foundReader.id == idfind ? toFillData(foundReader) : null)
    // console.log(dataJSON);
}


// автозаповнення форми читача
function autoData() {
    reader = getFake.fakerUser();
    toFillData();
}

function toFillData(newReader = reader) {
    console.log(newReader);
    id.value = newReader.id;
    firstName.value = newReader.firstname;
    lastName.value = newReader.lastname;
    email.value = newReader.email;
    address.value = newReader.address; 
}

// зчитування даних з файлу на GitHub
async function getFileFromGitHub() {
    const githubUsername = import.meta.env.VITE_GITHUB_USERNAME;
    const repo = "forms_DOM";
    const filePath = "vite-project/src/readers.json";
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    const apiUrl = `https://api.github.com/repos/${githubUsername}/${repo}/contents/${filePath}`;
    
    return await fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json"
            }
    })
    .then(respons =>  respons.json()) 
    // запишемо дані з файлу у змінну dataJSON
    .then(users => decodeToUnicode(users.content))
    // .then( content => dataJSON = JSON.parse(content))
}

// відправка на сервевер
function toSendJSON(event) {
    event.preventDefault();
    getFileFromGitHub()
    .then(content => {
        dataJSON = JSON.parse(content);
        console.log('dataJSON', dataJSON);

    })


    // // валідація даних
    // validateForm()
    // .then(result => async function() {
    //     console.log('validating form: ', result);

    //     // подготовка даних для відправки
    //     const formData = new FormData(formAddReader);
    //     const data = Object.fromEntries(formData.entries());
    //     data.id = inputID.value;
    //     // console.log(data);

    //     const githubUsername = import.meta.env.VITE_GITHUB_USERNAME;
    //     const repo = "forms_DOM";
    //     const filePath = "vite-project/src/readers.json";
    //     const token = import.meta.env.VITE_GITHUB_TOKEN;

    //     const apiUrl = `https://api.github.com/repos/${githubUsername}/${repo}/contents/${filePath}`;

    //     try {
    //         // Получаем текущую версию файла
    //         const getResponse = await fetch(apiUrl, {
    //             headers: {
    //             Authorization: `Bearer ${token}`,
    //             Accept: "application/vnd.github+json"
    //             }
    //         });

    //     if (!getResponse.ok) throw new Error("Файл не найден или ошибка доступа");

    //     const fileData = await getResponse.json();
    //     // const content = atob(fileData.content);
    //     const content = decodeToUnicode(fileData.content);
    //     // console.log('content', content);
    //     const dataJSON = JSON.parse(content);
    //     // console.log(dataJSON);
        
    //     validateID()
    //     .then(result => {
    //         console.log('validateID: ', result);
    //         dataJSON.push(data);
    //     // const updatedContent = encodeToBase64(JSON.stringify(dataJSON, null, 2));
    //     // // Обновляем файл
    //     // const updateResponse = await fetch(apiUrl, {
    //     //     method: "PUT",
    //     //     headers: {
    //     //     Authorization: `Bearer ${token}`,
    //     //     Accept: "application/vnd.github+json",
    //     //     },
    //     //     body: JSON.stringify({
    //     //     message: "Update readers.json via form submission",
    //     //     content: updatedContent,
    //     //     sha: fileData.sha,
    //     //     })
    //     // });
    //     // const result = await updateResponse.json();
    //     // alert("Файл обновлён!");
    //     // // console.log('result', result);
    //     })
    //     .catch(alert);

        
    //     } catch (error) {
    //         alert("Произошла ошибка: " + error.message);
    //         console.error(error);
    //     }
    // })
    // .catch(alert); 
    // console.log('Validating..');
    // return
}

function validateID() {
    console.log(dataJSON);
    return new Promise((resolve, reject) => {
        dataJSON.forEach(person => person.id == id.value ? reject('Читач з таким ID вже існує'): resolve())

    })
}

// валідація на пусті значення, та на вже існуючий id
function validateForm() {
    console.log(dataJSON);
    return new Promise((resolve, reject) => {
        let errors = 0;
        listData.forEach(elem => elem.value ? null : errors++);
        if (errors > 0) {
            reject ('Не всі поля заповнені: ' + errors);
        }
        resolve('Валідація успішна..')

    })
}

// прочитати з JSON
function toReadJSON() {
    const idReader = prompt('Enter the id..');
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(respons => respons.json())
    .then(users => users[idReader])
    .then(user => new Promise((resolve, reject) =>
        {
            reader.firstname = user.name.split(' ')[0]; 
            reader.lastname = user.name.split(' ')[1];
            reader.email = user.email;
            reader.address = user.address.street + " street, " + user.address.city + " city";
            resolve(user)
        }))
    // .then(user => toFillData())
    .catch(err => alert(err.message))
    // setTimeout(() => (console.log(reader.firstName)), 1000);
    // setTimeout(() => toFillData(), 1000);
    .then(toFillData());
}
