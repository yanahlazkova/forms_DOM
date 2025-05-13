// COOKIES

// встановлення кукі (зберігає встановлений колір тексту)
export function setCookies(e, cname = "text_color", cvalue = "green") {
  // const
  if (!e) {
    document.cookie =
      cname + "=" + (!document.cookie.length ? cvalue : getCookiesColor(cname));
  } else document.cookie = cname + "=" + e.target.value;
}

// отримання кукі
export function getCookiesColor(cname) {
  const arrayCookies = document.cookie.split(";"); // створимо масив
  if (arrayCookies) {
    const cookie = arrayCookies.filter(
      (value) => value.split("=")[0].trim() == cname
    );
    //   console.log(cookie[0].split('=')[1]);
    console.log("cookie", cookie);
    return cookie.length ? cookie[0].split("=")[1] : NaN;
  }
  return NaN;
}


// Local Storage

export function setLocalStorage(key, data){
  localStorage.setItem(key, JSON.stringify(data));
  console.log(localStorage.getItem(key));
}

export function getLocalStorage(key) {
  return localStorage.getItem(key);
}

export function removeLocalStorage(key) {
  localStorage.removeItem(key);
}