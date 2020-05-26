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
      $('#button-start').text('Играть снова');

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
}

function init() {
  $(".game-field").click(gameFieldClick);
  $("#button-start").click(startGame);
}

$(document).ready(init);
