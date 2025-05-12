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

function findCookie(c, cname) {
  return c[0].indexOf(cname) >= 0 ? c[1] : "";
}
