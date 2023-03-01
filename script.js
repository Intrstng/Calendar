//Спрашиваем у пользователя месяц (номер месяца) и год через prompt();
//Используя свойства и методы объекта Date строим таблицу-календарь для
//этого месяца и года, с названиями дней недели, где понедельник – начало недели.
//Выводим эту таблицу-календарь в html, можно со стилями.

//*Желательно всю верстку построить с помощью javascript методов работы с DOM.
let year = '', month = '';
  do {
    month = parseInt(prompt('Введите номер месяца', '1') - 1); 
  } while (month > 11 || month < 0 || isNaN(month));

  do {
    year = parseInt(prompt('Введите год (четыре цифры)', '2023'));
  } while (year <= 1000 || year >= 9999 || isNaN(year));

function createCalendar() {
  let table = null;
  const monthsArray = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const weekArray = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  let date = new Date(year, month);

  function createTable() {
    const title = `${monthsArray[date.getMonth()]} ${date.getFullYear()} года`;
    table = document.createElement('table');
    table.className = 'calendar';
    table.innerHTML = `<caption>${title}</caption>`;
    document.body.append(table);
  }
  createTable();

  function createHeadOfTable() {
    table.lastElementChild.after(document.createElement('thead'));
    table.lastElementChild.append(document.createElement('tr'));
  }
  createHeadOfTable();

  function fillTheHeadOfTable() {
    weekArray.forEach(day => {
      let weekDay = document.createElement('th');
      weekDay.textContent = day;
      table.children[1].firstElementChild.append(weekDay);
    });
  }
  fillTheHeadOfTable();
 
  function createBodyOfTable() {
    table.lastElementChild.after(document.createElement('tbody'));
  }
  createBodyOfTable();

  function getDaysInMonth(month, year) {
    return 33 - new Date(year, month, 33).getDate();
  }

  function showFirstDayOfTheMonth(day, month) {
    day === 0 && (day = 7);
    const previousMonth = month - 1;
    table.children[2].append(document.createElement('tr'));
    let counterLastDaysOfPrevMonth = getDaysInMonth(previousMonth, year) - (day - 2);

    for (let i = 0; i < day - 1; i++) {
      const lastDaysOfPrevMonth = document.createElement('td');
      lastDaysOfPrevMonth.classList.add('another-month');
      lastDaysOfPrevMonth.textContent = counterLastDaysOfPrevMonth;
      table.children[2].lastElementChild.append(lastDaysOfPrevMonth);
      counterLastDaysOfPrevMonth++;
    }
    const firstDayOfTheMonth = document.createElement('td');
    firstDayOfTheMonth.textContent = 1;
    let dateNow = new Date();
    if ((month === dateNow.getMonth()) && (year === dateNow.getFullYear()) && (dateNow.getDate() === 1)) {
      firstDayOfTheMonth.classList.add('today');
    }
    table.children[2].lastElementChild.append(firstDayOfTheMonth);
  } 
  showFirstDayOfTheMonth(date.getDay(), month);

  function setNextDay(day) {
    day.setDate(day.getDate() + 1);
  }

  function mapTheCalendarWithDays(day) {
    let nextDay = null;
                                      let today = day;
    setNextDay(day);
    if (table.children[2].lastElementChild.children.length < 7) {
      nextDay = document.createElement('td');
      nextDay.textContent = day.getDate();
      let dateNow = new Date();
      if (month === dateNow.getMonth() && (year === dateNow.getFullYear()) && (day.getDate() === dateNow.getDate())) {
        nextDay.classList.add('today');
      }
      table.children[2].lastElementChild.append(nextDay);
    } else if (table.children[2].lastElementChild.children.length === 7) {
      table.children[2].lastElementChild.after(document.createElement('tr'));
      nextDay = document.createElement('td');
      nextDay.textContent = day.getDate();
      table.children[2].lastElementChild.append(nextDay);
    }
  }

  function fillTheCalendarWithDays(day) {
    let daysInMonth = getDaysInMonth(month, year);
    while (daysInMonth > 1) {
      mapTheCalendarWithDays(day);
      daysInMonth--;
    }
  }
  fillTheCalendarWithDays(date);

  function fillTheCalendarWithDaysOfTheNextMonth() {
    let counterFirstDaysOfNextMonth = 1;
      while (table.children[2].lastElementChild.children.length < 7) {
        const firstDaysOfNextMonth = document.createElement('td');
        firstDaysOfNextMonth.classList.add('another-month');
        firstDaysOfNextMonth.textContent = counterFirstDaysOfNextMonth;
        table.children[2].lastElementChild.append(firstDaysOfNextMonth);
        counterFirstDaysOfNextMonth++;
      }
  }
  fillTheCalendarWithDaysOfTheNextMonth();
  createCalendarArrows();
}
window.onload = createCalendar();


function createCalendarArrows() {
  const leftArrowMonth = document.createElement('i');
  const rightArrowMonth = document.createElement('i');
  const leftArrowYear = document.createElement('i');
  const rightArrowYear = document.createElement('i');

  leftArrowMonth.classList.add('fa', 'fa-angle-left');
  rightArrowMonth.classList.add('fa', 'fa-angle-right');
  leftArrowYear.classList.add('fa', 'fa-angle-double-left');
  rightArrowYear.classList.add('fa', 'fa-angle-double-right');
  leftArrowMonth.id = 'prevBtnMonth';
  rightArrowMonth.id = 'nextBtnMonth';
  leftArrowYear.id = 'prevBtnYear';
  rightArrowYear.id = 'nextBtnYear';
  document.body.append(leftArrowMonth, rightArrowMonth, leftArrowYear, rightArrowYear);
  addHandlersCalendarArrows();
}

function showNextMonthInCalendar() {
  document.querySelector('.calendar').remove();
  month++;
  createCalendar();
  reloadHandlers();
  changeBackgroundImg(backgroundImages[randomNumber(0, backgroundImages.length)]);
}

function showPrevMonthInCalendar() {
  document.querySelector('.calendar').remove();                                                  
  month--;
  createCalendar();
  reloadHandlers();
  changeBackgroundImg(backgroundImages[randomNumber(0, backgroundImages.length)]);
}

function showNextYearInCalendar() {
  document.querySelector('.calendar').remove();                                                  
  year++;
  createCalendar();
  reloadHandlers();
  changeBackgroundImg(backgroundImages[randomNumber(0, backgroundImages.length)]);
}

function showPrevYearInCalendar() {
  document.querySelector('.calendar').remove();                                                  
  year--;
  createCalendar();
  reloadHandlers();
  changeBackgroundImg(backgroundImages[randomNumber(0, backgroundImages.length)]);
}

function addHandlersCalendarArrows() {
  document.getElementById('nextBtnMonth').addEventListener('click', showNextMonthInCalendar);
  document.getElementById('prevBtnMonth').addEventListener('click', showPrevMonthInCalendar);
  document.getElementById('nextBtnYear').addEventListener('click', showNextYearInCalendar);
  document.getElementById('prevBtnYear').addEventListener('click', showPrevYearInCalendar);
}

function reloadHandlers() {
  document.getElementById('nextBtnMonth').remove();
  document.getElementById('prevBtnMonth').remove();
  document.getElementById('nextBtnYear').remove();
  document.getElementById('prevBtnYear').remove();
  document.getElementById('nextBtnMonth').removeEventListener('click', showNextMonthInCalendar);
  document.getElementById('prevBtnMonth').removeEventListener('click', showPrevMonthInCalendar);
  document.getElementById('nextBtnYear').removeEventListener('click', showNextYearInCalendar);
  document.getElementById('prevBtnYear').removeEventListener('click', showPrevYearInCalendar);
  addHandlersCalendarArrows();
}

function randomNumber(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function changeBackgroundImg(link) {
  console.log(link)
  document.body.style.backgroundImage = `url(${link})`;
}

// setInterval(()=> {
//   month++;
//   document.querySelector('.calendar').remove();
//   createCalendar(month, year)
// }, 1000)

const backgroundImages = [
  // 'https://images.unsplash.com/photo-1469122312224-c5846569feb1?crop=entropy\u0026cs=tinysrgb\u0026fm=jpg\u0026ixid=MnwzOTgwMDV8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Nzc2MDcxNzE\u0026ixlib=rb-4.0.3\u0026q=80',
  'https://live.staticflickr.com/65535/52718087358_831de67d59_k.jpg',
  'https://live.staticflickr.com/65535/52717411851_7b22181091_k.jpg',
  'https://live.staticflickr.com/65535/52717378616_2bc9d9e9de_k.jpg',
  'https://live.staticflickr.com/65535/52716769514_b5ffb9890a_k.jpg',
  'https://live.staticflickr.com/65535/52709728893_d5084006c6_k.jpg',
  'https://live.staticflickr.com/65535/52716650453_7d4c08515d_k.jpg',
  'https://live.staticflickr.com/65535/52715631431_718d6a1988_k.jpg',
  'https://live.staticflickr.com/65535/52716974282_86259a7f12_k.jpg',
  'https://live.staticflickr.com/65535/52717134092_72c8519459_k.jpg',
  'https://live.staticflickr.com/65535/52718136868_28a6f3b4c1_k.jpg',
  'https://live.staticflickr.com/65535/52716737045_86121798f5_k.jpg',
  'https://live.staticflickr.com/65535/52717345324_c4a4573364_k.jpg',
  'https://live.staticflickr.com/65535/52711417771_19167d393c_k.jpg',
  'https://live.staticflickr.com/65535/52713372785_be57edb99d_k.jpg',
  'https://live.staticflickr.com/65535/52717419398_031f8097fe_k.jpg',
  'https://live.staticflickr.com/65535/52717248303_6f6df1866b_k.jpg',
  'https://live.staticflickr.com/65535/52717508633_638c83f427_k.jpg',
  'https://live.staticflickr.com/65535/52706671664_43a086b7a9_k.jpg',
  'https://live.staticflickr.com/65535/52718032669_1e28c61ee6_k.jpg',
  'https://live.staticflickr.com//65535//52718161945_fe7eef0f30_k.jpg',
  'https://live.staticflickr.com/65535/52718121690_9cac9788d2_k.jpg',
  'https://live.staticflickr.com/65535/52717554341_4c1c5d9f27_k.jpg',
]