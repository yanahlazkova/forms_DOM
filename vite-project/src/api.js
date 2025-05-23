import * as getFake from './dataFake';
// import * as Book from './book';

// require('dotenv').config();git push --force



const globalUrl = 'https://github.com/yanahlazkova/forms_DOM/blob/main/vite-project/src/readers.json'
// const globalUrl = './d/Записные книжки OneNote/Мои документы/Olexandr_js/Library_system_DOM/vite-project/src/readers.json';
// отримаємо форму
const formAddReader = document.querySelector('#addReader')//document.forms['addReader'];

// данні форми
let reader = {};

// отримаємо кнопку автозаповнення форми
const autoFill = document.querySelector('#autoreader');
autoFill.onclick = autoData;

// кнопка заповнення з JSON
const readJSON = document.querySelector('#readjson');
readJSON.onclick = toReadJSON;

// отримаємо кнопку Submit
const submit = document.querySelector('#writeReader');
submit.onclick = toSendServer;

// список обов'язкових полів
const listData = [];
const firstName = document.getElementById('fname');
listData.push(firstName);
const lastName = document.getElementById('lname');
listData.push(lastName);
const email = document.getElementById('email');
listData.push(email);
const address = document.getElementById('adress');
listData.push(address);



// автозаповнення форми читача
function autoData() {
    // тут якась помилка????
    reader = getFake.fakerUser();
    toFillData();
}

function toFillData() {
    firstName.value = reader.firstName;
    lastName.value = reader.lastName;
    email.value = reader.email;
    address.value = reader.address; 
}

// кодирования в base64 с Unicode (кирилиця)
function encodeToBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}


// відправка на сервевер
async function toSendServer(event) {
    event.preventDefault();
    // подготовка даних для відправки
    const formData = new FormData(formAddReader);
    const data = Object.fromEntries(formData.entries());
    console.log(data);


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
    const content = atob(fileData.content);
    const json = JSON.parse(content);
    json.push(data);

    const updatedContent = encodeToBase64(JSON.stringify(json, null, 2));

    // Обновляем файл
    const updateResponse = await fetch(apiUrl, {
        method: "PUT",
        headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        },
        body: JSON.stringify({
        message: "Update readers.json via form submission",
        content: updatedContent,
        sha: fileData.sha,
        })
    });

    const result = await updateResponse.json();
    alert("Файл обновлён!");
    console.log(result);
    } catch (error) {
    alert("Произошла ошибка: " + error.message);
    console.error(error);
    }

    }

    // прочитати з JSON
    function toReadJSON() {
        const idReader = prompt('Enter the id..');
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(respons => respons.json())
        .then(users => users[idReader])
        .then(user => new Promise((resolve, reject) =>
            {
                reader.firstName = user.name.split(' ')[0]; 
                reader.lastName = user.name.split(' ')[1];
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
