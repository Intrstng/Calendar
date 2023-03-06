const monthsArrForInputSelect = ['Выбрать месяц', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const monthsArrForInputSelectValues = ['select', 'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const yearsArrForInputSelect = ['Выбрать год', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];

function createLabelForSelectInput(name, content) {
  const selectInputLabel = document.createElement('label');
  selectInputLabel.setAttribute('for', name);
  selectInputLabel.textContent = content;
  return selectInputLabel;
}

function createSelectInput(name, optionsArr) {
  const selectInput = document.createElement('select');
  selectInput.id = name;
  optionsArr.forEach((option, i) => {
    const selectOption = document.createElement('option');
    if (name === 'month') {
      selectOption.value = monthsArrForInputSelectValues[i];
    } else if ((name === 'year')) {
      selectOption.value = option;
    }
    selectOption.textContent = option;
    selectInput.append(selectOption);
  })
  return selectInput;
}

function createCalendarButton(name, classBtn) {
  const createNewCalendarBtn = document.createElement('button');
  createNewCalendarBtn.setAttribute('type', 'button');
  createNewCalendarBtn.textContent = name;
  createNewCalendarBtn.className = classBtn;
  return createNewCalendarBtn;
}

function createHeaderSelect() {
  const divHeader = document.createElement('div');
  divHeader.className = 'header';
  divHeader.append(createLabelForSelectInput('month', 'Месяц'));
  divHeader.append(createSelectInput('month', monthsArrForInputSelect));
  document.body.prepend(divHeader);

    divHeader.append(createLabelForSelectInput('year', 'Год'));
    divHeader.append(createSelectInput('year', yearsArrForInputSelect));
    document.body.prepend(divHeader);
    document.querySelector('#year').firstElementChild.value = 'select';
      
      divHeader.append(createCalendarButton('Создать', 'create-btn'));
}
createHeaderSelect()

function disableCreateCalendarBtn() {
  if (document.getElementById('month').value === 'select' || document.getElementById('year').value === 'select') {
    document.querySelector('.create-btn').disabled = true;
  } else if (document.getElementById('month').value !== 'select' && document.getElementById('year').value !== 'select') {
    document.querySelector('.create-btn').disabled = false;
  }
}
disableCreateCalendarBtn();

document.getElementById('month').addEventListener('change', disableCreateCalendarBtn);
document.getElementById('year').addEventListener('change', disableCreateCalendarBtn);

function getDataFromSelectIputs() {
  month = parseInt(document.getElementById('month').selectedIndex - 1);
  year = parseInt(document.getElementById('year').value);
  document.getElementById('month').selectedIndex = 0;
  document.getElementById('year').selectedIndex = 0;
  document.querySelector('.delete-btn').disabled = false;
  disableCreateCalendarBtn();
}

function addDelCalendarBtn() {
  document.querySelector('div').append(createCalendarButton('Удалить', 'delete-btn'));
  document.querySelector('.delete-btn').addEventListener('click', removeFirstAddedCalendar);
}
document.querySelector('.create-btn').addEventListener('click', addDelCalendarBtn, { once: true });
document.querySelector('.create-btn').addEventListener('click', getDataFromSelectIputs);
document.querySelector('.create-btn').addEventListener('click', function() { createCalendar(document.body, 'append', month, year) });

function removeFirstAddedCalendar() {
  const calendars = document.querySelectorAll('.calendar-container');
  calendars[0].remove();
  if (calendars.length === 1) {
    document.querySelector('.delete-btn').disabled = true;
  }
}

function createCalendar(location, action, monthInp, yearInp) {
  let month = monthInp;
  let year = yearInp;
  let table = null;
  const monthsArray = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const weekArray = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  let date = new Date(year, month); 
  
  function createTable() {
    const tableDiv = document.createElement('div');
    tableDiv.className = 'calendar-container';
    const title = `${monthsArray[date.getMonth()]} ${date.getFullYear()} года`;
    table = document.createElement('table');
    table.className = 'calendar';
    table.innerHTML = `<caption>${title}</caption>`;
    tableDiv.append(table);
    if (action === 'append') {
      location.append(tableDiv);
    } else if (action === 'after') {
      location.after(tableDiv);
    }
            
    //CreateCalendarArrows
    const leftArrowMonth = document.createElement('i');
    const rightArrowMonth = document.createElement('i');
    const leftArrowYear = document.createElement('i');
    const rightArrowYear = document.createElement('i');

    leftArrowMonth.classList.add('fa', 'fa-angle-left');
    rightArrowMonth.classList.add('fa', 'fa-angle-right');
    leftArrowYear.classList.add('fa', 'fa-angle-double-left');
    rightArrowYear.classList.add('fa', 'fa-angle-double-right');
    leftArrowMonth.classList.add('prevBtnMonth');
    rightArrowMonth.classList.add('nextBtnMonth');
    leftArrowYear.classList.add('prevBtnYear');
    rightArrowYear.classList.add('nextBtnYear');
    tableDiv.append(leftArrowYear, leftArrowMonth, rightArrowMonth,rightArrowYear);
    
    const showNextMonthInCalendarScoped = showNextMonthInCalendar(month);
    const showPrevMonthInCalendarScoped = showPrevMonthInCalendar(month);
    const showNextYearInCalendarScoped = showNextYearInCalendar(year);
    const showPrevYearInCalendarScoped = showPrevYearInCalendar(year);

    //AddHandlersCalendarArrows
    tableDiv.querySelector('.nextBtnMonth').addEventListener('click', showNextMonthInCalendarScoped);
    tableDiv.querySelector('.prevBtnMonth').addEventListener('click', showPrevMonthInCalendarScoped);
    tableDiv.querySelector('.nextBtnYear').addEventListener('click', showNextYearInCalendarScoped);
    tableDiv.querySelector('.prevBtnYear').addEventListener('click', showPrevYearInCalendarScoped);
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
    const tableBody = document.createElement('tbody');
    tableBody.classList.add('calendar-tbody');
    table.lastElementChild.after(tableBody);
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
    let dateNow = new Date();
    setNextDay(day);
    if (table.children[2].lastElementChild.children.length < 7) {
      nextDay = document.createElement('td');
      nextDay.textContent = day.getDate();
      if (month === dateNow.getMonth() && (year === dateNow.getFullYear()) && (day.getDate() === dateNow.getDate())) {
        nextDay.classList.add('today');
      }
      table.children[2].lastElementChild.append(nextDay);
    } else if (table.children[2].lastElementChild.children.length === 7) {
      table.children[2].lastElementChild.after(document.createElement('tr'));
      nextDay = document.createElement('td');
      nextDay.textContent = day.getDate();
      table.children[2].lastElementChild.append(nextDay);
      if (month === dateNow.getMonth() && (year === dateNow.getFullYear()) && (day.getDate() === dateNow.getDate())) {
        nextDay.classList.add('today');
      }
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

  function showNextMonthInCalendar(monthInp) {
    let month = monthInp;
    return function() {
      month++;
      createCalendar(this.closest('.calendar-container'), 'after', month, year);
      addHoverCalendarDateCellHandlers();
      this.closest('.calendar-container').remove();
    } 
  }

  function showPrevMonthInCalendar(monthInp) {
    let month = monthInp;
    return function() {
      month--;
      createCalendar(this.closest('.calendar-container'), 'after', month, year);
      addHoverCalendarDateCellHandlers();
      this.closest('.calendar-container').remove();
    }                                          
  }
  
  function showNextYearInCalendar(yearInp) {
    let year = yearInp;
    return function() {
      year++;
      createCalendar(this.closest('.calendar-container'), 'after', month, year);
      addHoverCalendarDateCellHandlers();
      this.closest('.calendar-container').remove();
    }                                         
  }
  
  function showPrevYearInCalendar(yearInp) {
    let year = yearInp;
    return function() {
      year--;
      createCalendar(this.closest('.calendar-container'), 'after', month, year);
      addHoverCalendarDateCellHandlers();
      this.closest('.calendar-container').remove();
    }
  }
  addHoverCalendarDateCellHandlers();
}

function addHoverCalendarDateCellHandlers() {
    [...document.querySelectorAll('.calendar-tbody')].forEach(tbody => tbody.removeEventListener('mouseover', hoverCalendarDateCell));
    [...document.querySelectorAll('.calendar-tbody')].forEach(tbody => tbody.removeEventListener('mouseout', hoverCalendarDateCell));
    [...document.querySelectorAll('.calendar-tbody')].forEach(tbody => tbody.removeEventListener('click', markSelectedCalendarDateCell));
    [...document.querySelectorAll('.calendar-tbody')].forEach(tbody => tbody.addEventListener('mouseover', hoverCalendarDateCell));
    [...document.querySelectorAll('.calendar-tbody')].forEach(tbody => tbody.addEventListener('mouseout', hoverCalendarDateCell));
    [...document.querySelectorAll('.calendar-tbody')].forEach(tbody => tbody.addEventListener('click', markSelectedCalendarDateCell));
}

function hoverCalendarDateCell(e) {
  const dataInCalendarArr = e.target.closest('.calendar').firstElementChild.textContent.split(' ');
  const monthInCalendar = monthsArrForInputSelect.indexOf(dataInCalendarArr[0]) - 1;
  const yearInCalendar = parseInt(dataInCalendarArr[1]);

  const today = new Date();
  if (e.target.closest('td')) {
    if (e.type === 'mouseover') {
      if (e.target.classList.contains('today')) {
        e.target.classList.remove('today');
      }
      e.target.classList.add('hovered-cell');
    } else if (e.type === 'mouseout') {
      e.target.classList.remove('hovered-cell');
        if ((yearInCalendar === today.getFullYear()) && (monthInCalendar === today.getMonth()) && (parseInt(e.target.textContent) === today.getDate()) && !e.target.classList.contains('another-month')) {
          e.target.classList.add('today');
        }
          if ((yearInCalendar === today.getFullYear()) && (monthInCalendar === today.getMonth()) && (parseInt(e.target.textContent) === today.getDate() && e.target.classList.contains('selected-cell'))) {
            e.target.classList.remove('today');
        }
    }
  }
}
/* или вместо функции выше в styles.css добавить:
  // td:hover {
  //   background-color: yellowgreen;
  // }
*/

function markSelectedCalendarDateCell(e) {
  if (e.target.closest('td')) {
    delMarkSelectedCalendarDateCell(e);
    checkForTodayToReturnTodaySelectionInCalendar(e);
    if (e.target.classList.contains('today')) {
      e.target.classList.remove('today');
    }
    e.target.classList.add('selected-cell');
  }
}

function delMarkSelectedCalendarDateCell(e) {
  [...e.target.closest('.calendar-tbody').querySelectorAll('td')].forEach(day => day.classList.remove('selected-cell'));
}

function checkForTodayToReturnTodaySelectionInCalendar(e) {
  const dataInCalendarArr = e.target.closest('.calendar').firstElementChild.textContent.split(' ');
  const monthInCalendar = monthsArrForInputSelect.indexOf(dataInCalendarArr[0]) - 1;
  const yearInCalendar = parseInt(dataInCalendarArr[1]);
  const today = new Date();
  if ((yearInCalendar === today.getFullYear()) && (monthInCalendar === today.getMonth()) && (parseInt(e.target.textContent) !== today.getDate())) {
    [...e.target.closest('.calendar-tbody').querySelectorAll('td')].forEach(day => {
      if ((yearInCalendar === today.getFullYear()) && (monthInCalendar === today.getMonth()) && (parseInt(day.textContent) === today.getDate()) && !day.classList.contains('another-month')) {
        day.classList.add('today');
      }
    });
  }
}