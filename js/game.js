
const maxHits = 10; // максимальное количество попаданий
const nominalPointsForHit = 10; // количество очков за 1 попадание (номинальное)
const penaltyForMiss = 5; // количество штрафных очков за 1 промах
const nominalSpeed = 1.0; // номинальная скорость попаданий (темп)
let speedBonus = 1.0; // бонус за скорость
let hits = 0; // текущее количество попаданий
let misses = 0; // количество промахов
let firstHitTime = 0; // метка времени в начале игры
let totalPoints = 0; // итоговое количество очков

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

      // расчёт бонусных очков в зависимости от темпа игры:
      // сбрасываем к номинальному значению:
      speedBonus = 1.0;
      // считаем средний темп:
      // время игры делим на максимальное количество попаданий:
      let currentSpeed = totalPlayedSeconds / maxHits;
      // console.log('currentSpeed: ', currentSpeed);
      // если текущий темп выше номинального (число меньше):
      if (currentSpeed < nominalSpeed) {
        // считаем разницу между номинальным и текущим и прибавляем её к номинальному
        speedBonus = nominalSpeed + (nominalSpeed - currentSpeed);
        // console.log('speedBonus: ', speedBonus);
      }

      // считаем общее количество заработанных очков, округляем до целого:
      const pointsForHits = Math.round(hits * nominalPointsForHit * speedBonus);
      // общее количество штрафных:
      const penaltyForMisses = misses * penaltyForMiss;
      // итог:
      totalPoints = pointsForHits - penaltyForMisses;

      // если много промахов, то число может получиться отрицательным
      // не допускаем такого:
      if (totalPoints < 0) {
        totalPoints = 0; 
      }
      $("#total-points").text(totalPoints);

      $("#win-message").removeClass("d-none");

    } else {
      // иначе устанавливаем новую цель:
      setNewTarget();
    }
  } else {
    // иначе, если квадрат обычный (промах):
    // увеличиваем счётчик промахов
    misses += 1;
    // моргаем этим квадратом красным цветом:
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
