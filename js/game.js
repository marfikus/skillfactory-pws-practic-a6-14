// const numDivs = 36;
const maxHits = 10;

let hits = 0;
let miss = 0;
let firstHitTime = 0;

function startGame() {
  // обнуляем счётчик зелёных квадратов
  hits = 0;
  // обнуляем счётчик промахов
  miss = 0;
  // убираем таргеты
  $('.game-field').removeClass('target');
  // закрашиваем случайный квадрат зелёным и счётчик на нём выводим (добавляем класс цели) 
  const divSelector = randomDivId();
  $(divSelector).addClass('target');
  // запускаем таймер
  firstHitTime = getTimestamp();
}

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером

  // FIXME: тут надо определять при первом клике firstHitTime

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function gameFieldClick(event) {
  // если он зелёный, то:
  const $eventTarget = $(event.target);
  if ($eventTarget.hasClass('target')) {
    // увеличиваем счётчик зелёных квадратов
    hits += 1;
    // возвращаем этому квадрату обычный вид (убираем класс цели)
    $($eventTarget).removeClass('target');
    // если счётчик равен 10, то:
    if (hits === maxHits) {
      // останавливаем таймер
      let totalPlayedMillis = getTimestamp() - firstHitTime;
      let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);

      // выводим результат
      $("#total-time-played").text(totalPlayedSeconds);
      $("#win-message").removeClass("d-none");     
      // ...
    } else {
      // иначе закрашиваем другой случайный квадрат зелёным
      // и счётчик на нём выводим (добавляем класс цели)
      const divSelector = randomDivId();
      $(divSelector).addClass('target');
    }
  } else {
    // иначе, если квадрат обычный (промах):
    // увеличиваем счётчик промахов
    miss += 1;
    // (можно моргнуть этим квадратом красным цветом)  

  }

  // FIXME: убирать текст со старых таргетов. Кажется есть .text?

  // if ($(event.target).hasClass("target")) {
  //   hits = hits + 1;
  //   round();
  // }

  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  //round();

  $(".game-field").click(gameFieldClick);
  $("#button-start").click(startGame);
}

$(document).ready(init);
