var dark = true;

var a = document.body;
var p = document.getElementById("theme")

function darkLight() {
    const currentTheme = document.body.className;
    if (!dark) {
          document.body.className = 'dark-theme';
          p.innerHTML = "светлая тема";
    } else {
          document.body.className = 'light-theme';
          p.innerHTML = "тёмная тема";
    }

    dark = !dark
  };