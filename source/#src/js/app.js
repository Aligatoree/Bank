import * as jsFunctions from "./modules/functions.js";
import axios from "axios";

jsFunctions.isWebp();

document.addEventListener("DOMContentLoaded", function (e) {
  let swiperLinks = new Swiper(".links__container", {
    navigation: {
      nextEl: ".links__button_next",
      prevEl: ".links__button_prev",
    },
    slidesPerView: 2,
    breakpoints: {
      1000: {
        slidesPerView: 4,
      },
    },
  });
  let swiperNews = new Swiper(".news__container", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    slidesPerView: 4,
    breakpoints: {
      1150: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      756: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 16,
      },
    },
  });

  function onResize() {
    if (window.innerWidth <= 1000) {
      let slides = 0;
      if (window.innerWidth <= 765) {
        slides = (window.innerWidth - 8) / 201;
      } else {
        slides = (window.innerWidth - 42) / 241;
      }
      swiperLinks.params.slidesPerView = slides;
      swiperLinks.update();
      swiperNews.update();
    }
  }

  let resize;
  window.addEventListener("resize", () => {
    clearTimeout(resize);
    resize = setTimeout(onResize, 500);
  });

  let exchange = { date: "0" };
  function getExchange() {
    axios
      .get("https://www.cbr-xml-daily.ru/daily_json.js")
      .then((response) => {
        changeDate(response.data.Date);
        changeExchange(response.data.Valute);
      })
      .catch((error) => console.log(error));
  }
  function changeDate(date) {
    let time = document.querySelectorAll("#date");
    for (let i of time) {
      i.innerHTML = new Date(date)
        .toLocaleString()
        .slice(0, 17)
        .replace(/,/g, "");
    }
  }
  function changeExchange(exchange) {
    document.getElementById("USD_BUY").innerHTML =
      exchange.USD.Value.toFixed(4);
    document.getElementById("USD_SELL").innerHTML = (
      exchange.USD.Value * 1.1
    ).toFixed(4);
    document.getElementById("EUR_BUY").innerHTML =
      exchange.EUR.Value.toFixed(4);
    document.getElementById("EUR_SELL").innerHTML = (
      exchange.EUR.Value * 1.1
    ).toFixed(4);
    document.getElementById("GBP_BUY").innerHTML =
      exchange.GBP.Value.toFixed(4);
    document.getElementById("GBP_SELL").innerHTML = (
      exchange.GBP.Value * 1.1
    ).toFixed(4);
    document.getElementById("JPY_BUY").innerHTML =
      exchange.JPY.Value.toFixed(4);
    document.getElementById("JPY_SELL").innerHTML = (
      exchange.JPY.Value * 1.1
    ).toFixed(4);
    document.getElementById("TRY_BUY").innerHTML =
      exchange.TRY.Value.toFixed(4);
    document.getElementById("TRY_SELL").innerHTML = (
      exchange.TRY.Value * 1.1
    ).toFixed(4);
  }
  getExchange();

  let popup = document.getElementsByClassName("header__popup_background");
  popup[0].addEventListener("click", () => {
    document.getElementById("popup_commercial").classList.add("disabled");
  });
  popup[1].addEventListener("click", () => {
    document.getElementById("popup_personal").classList.add("disabled");
  });
  document
    .getElementById("loginButton_commercial")
    .addEventListener("click", () => {
      document.getElementById("popup_commercial").classList.remove("disabled");
    });
  document
    .getElementById("loginButton_personal")
    .addEventListener("click", () => {
      document.getElementById("popup_personal").classList.remove("disabled");
    });
});
