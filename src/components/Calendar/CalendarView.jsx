import React from "react";

import EventsView from "../Events/EventsView";
import WeekView from "../Week/WeekView";
import DayNamesView from "../DayNames/DayNamesView";

const renderMonthLabel = selectedMonth => {
  return (
    <span className="box month-label">{selectedMonth.format("MMMM YYYY")}</span>
  );
};

const renderDayLabel = selectedDay => {
  return (
    <span className="box month-label">
      {selectedDay.format("DD MMMM YYYY")}
    </span>
  );
};

const renderTodayLabel = handlebackToCurrentMonth => {
  return (
    <span className="box today-label" onClick={handlebackToCurrentMonth}>
      Сегодня
    </span>
  );
};

const renderWeeks = ({
  selectedMonth,
  selectedDay,
  selectedMonthEvents,
  selectDay
}) => {
  const weeks = [];
  let isDone = false;
  const previousSelectedMonth = selectedMonth
    .clone()
    .startOf("month")
    .subtract(1, "d")
    .day("Monday");

  let count = 0;
  let monthIndex = previousSelectedMonth.month();

  while (!isDone) {
    weeks.push(
      <WeekView
        previousSelectedMonth={previousSelectedMonth.clone()}
        selectedMonth={selectedMonth}
        selectedMonthEvents={selectedMonthEvents}
        selectedDay={selectedDay}
        select={day => selectDay(day)}
      />
    );
    previousSelectedMonth.add(1, "w");

    const isMoreThenTwo = count++ > 2;
    const isDifferentIdx = monthIndex !== previousSelectedMonth.month();

    isDone = isMoreThenTwo && isDifferentIdx;
    monthIndex = previousSelectedMonth.month();
  }
  return weeks;
};

export default function CalendarView({
  showEventsModal,
  selectedMonth,
  selectedDay,
  selectedMonthEvents,
  handleNextMonth,
  handlePrevMonth,
  handlebackToCurrentMonth,
  selectDay,
  showCalendar,
  addEvent,
  removeEvent
}) {
  return showEventsModal ? (
    <section className="main-calendar">
      <header className="calendar-header">
        <div className="row title-header">{renderDayLabel(selectedDay)}</div>
        <div className="row button-container">
          <span className="box arrow" onClick={showCalendar}>
            Назад
          </span>

          <span className="box event-button" onClick={addEvent}>
            Добавить событие
          </span>
        </div>
      </header>
      <EventsView
        selectedMonth={selectedMonth}
        selectedDay={selectedDay}
        selectedMonthEvents={selectedMonthEvents}
        removeEvent={i => removeEvent(i)}
      />
    </section>
  ) : (
    <section className="main-calendar">
      <header className="calendar-header">
        <div className="row title-header">
          <span className="box arrow" onClick={handlePrevMonth}>
            Назад
          </span>
          <div className="box header-text">
            {renderTodayLabel(handlebackToCurrentMonth)}
            {renderMonthLabel(selectedMonth)}
          </div>
          <span className="box arrow" onClick={handleNextMonth}>
            Вперед
          </span>
        </div>
        <DayNamesView />
      </header>
      <div className="days-container">
        {renderWeeks({
          selectedMonth,
          selectedDay,
          selectedMonthEvents,
          selectDay
        })}
      </div>
    </section>
  );
}
