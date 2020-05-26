const maxHits = 10; // максимальное количество попаданий

let hits = 0; // текущее количество попаданий
let misses = 0; // количество промахов
let firstHitTime = 0; // метка времени в начале игры

function startGame() {
  // обнуляем счётчик попаданий
  hits = 0;
  // обнуляем счётчик промахов
  misses = 0;
  // убираем таргеты
  $('.game-field')
    .removeClass('target')
    .text('');
  // скрываем прошлый результат:
  $("#win-message").addClass("d-none");
  // показываем игровое поле:
  $(".game-row").removeClass("d-none");
  // устанавливаем новую цель:
  setNewTarget();
  // отмечаем время начала игры:
  firstHitTime = getTimestamp();

  $('#button-start').text('Играть снова');
}

function setNewTarget() {
  // закрашиваем случайный квадрат зелёным и счётчик на нём выводим:
  const divSelector = randomDivId();
  $(divSelector)
    .addClass('target')
    .text(hits + 1);
}

function gameFieldClick(event) {
  const $eventTarget = $(event.target);
  // если это цель:
  if ($eventTarget.hasClass('target')) {
    // увеличиваем счётчик попаданий
    hits += 1;
    // возвращаем этому квадрату обычный вид (убираем класс цели)
    $($eventTarget)
      .removeClass('target')
      .text('');
    // если счётчик равен максимальному значению:
    if (hits === maxHits) {
      // останавливаем игру
      // вычисляем прошедшее с начала игры время:
      let totalPlayedMillis = getTimestamp() - firstHitTime;
      let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);

      // скрываем игровое поле:
      $(".game-row").addClass("d-none");
      // выводим результат
      $("#total-time-played").text(totalPlayedSeconds);
      $("#misses").text(misses);
      $("#win-message").removeClass("d-none");

    } else {
      // иначе устанавливаем новую цель:
      setNewTarget();
    }
  } else {
    // иначе, если квадрат обычный (промах):
    // увеличиваем счётчик промахов
    misses += 1;
    // (можно моргнуть этим квадратом красным цветом)  
    $eventTarget.addClass('miss');
    setTimeout(function() {
      $eventTarget.removeClass('miss');
    }, 150);
  }
}

function init() {
  $(".game-field").click(gameFieldClick);
  $("#button-start").click(startGame);
}

$(document).ready(init);
