//Спрашиваем у пользователя месяц (номер месяца) и год через prompt();
//Используя свойства и методы объекта Date строим таблицу-календарь для
//этого месяца и года, с названиями дней недели, где понедельник – начало недели.
//Выводим эту таблицу-календарь в html, можно со стилями.

//*Желательно всю верстку построить с помощью javascript методов работы с DOM.
  let month = 1, year = 2023;
// do {
//   month = parseInt(prompt('Введите номер месяца', '1') - 1); 
// } while (month > 11 || month < 0 || isNaN(month));

// do {
//   year = parseInt(prompt('Введите год (четыре цифры)', '2023'));
// } while (year <= 1000 || year >= 9999 || isNaN(year));

const createCalendar = () => {
  let /* year = '', month = '',  */table = null;
  const monthsArray = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const weekArray = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  // const enterMonth = () => {
  //   do {
  //     month = parseInt(prompt('Введите номер месяца', '1') - 1); 
  //   } while (month > 11 || month < 0 || isNaN(month));
  //   return month;
  // }
  // enterMonth();

  // const enterYear = () => {
  //   do {
  //     year = parseInt(prompt('Введите год (четыре цифры)', '2023'));
  //   } while (year <= 1000 || year >= 9999 || isNaN(year));
  //   return year;
  // }
  // enterYear();

  let date = new Date(year, month);

  const createTable = () => {
    const title = `${monthsArray[date.getMonth()]} ${date.getFullYear()} года`;
    table = document.createElement('table');
    table.className = 'calendar';
    table.innerHTML = `<caption>${title}</caption>`;
    document.body.append(table);
  }
  createTable();

  const createHeadOfTable = () => {
    table.lastElementChild.after(document.createElement('thead'));
    table.lastElementChild.append(document.createElement('tr'));
  }
  createHeadOfTable();

  const fillTheHeadOfTable = () => {
    weekArray.forEach(day => {
      let weekDay = document.createElement('th');
      weekDay.textContent = day;
      table.children[1].firstElementChild.append(weekDay);
    });
  }
  fillTheHeadOfTable();
 
  const createBodyOfTable = () => {
    table.lastElementChild.after(document.createElement('tbody'));
  }
  createBodyOfTable();

  const showFirstDayOfTheMonth = (day) => {
    day === 0 && (day = 7);
    table.children[2].append(document.createElement('tr'));

    for (let i = 0; i < day - 1; i++) {
      table.children[2].lastElementChild.append(document.createElement('td'));
    }
    const firstDayOfTheMonth = document.createElement('td');
    firstDayOfTheMonth.textContent = 1;
    table.children[2].lastElementChild.append(firstDayOfTheMonth);
  } 
  showFirstDayOfTheMonth(date.getDay());

  const setNextDay = (day) => {
    day.setDate(day.getDate() + 1);
  }

  const mapTheCalendarWithDays = (day) => {
    let nextDay = null;
    setNextDay(day);
    if (table.children[2].lastElementChild.children.length < 7) {
      nextDay = document.createElement('td');
      nextDay.textContent = day.getDate();
      table.children[2].lastElementChild.append(nextDay);
    } else if (table.children[2].lastElementChild.children.length === 7) {
      table.children[2].lastElementChild.after(document.createElement('tr'));
      nextDay = document.createElement('td');
      nextDay.textContent = day.getDate();
      table.children[2].lastElementChild.append(nextDay);
    }
  }

  const getDaysInMonth = (month, year) => {
    return 33 - new Date(year, month, 33).getDate(); // или new Date(year, month, 0).getDate()
  }

  const fillTheCalendarWithDays = (day) => {
    let daysInMonth = getDaysInMonth(month, year);
    while (daysInMonth > 1) {
      mapTheCalendarWithDays(day);
      daysInMonth--;
    }
  }
  fillTheCalendarWithDays(date);
}
//window.onload = 
createCalendar();

// setInterval(()=> {
//   month++;
//   document.querySelector('.calendar').remove();
//   createCalendar()
// }, 1000)


