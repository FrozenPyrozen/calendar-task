import React from "react";

import DayView from "../Day/DayView";

const renderDays = ({
  selectedMonth,
  selectedDay,
  select,
  selectedMonthEvents,
  previousSelectedMonth: date
}) => {
  const days = [];

  for (let i = 0; i < 7; i++) {
    let dayHasEvents = false;

    for (let j = 0; j < selectedMonthEvents.length; j++) {
      if (selectedMonthEvents[j].date.isSame(date, "day")) {
        dayHasEvents = true;
      }
    }

    const day = {
      name: date.format("dd").substring(0, 1),
      number: date.date(),
      isCurrentMonth: date.month() === selectedMonth.month(),
      isToday: date.isSame(new Date(), "day"),
      date,
      hasEvents: dayHasEvents
    };

    days.push(<DayView day={day} selected={selectedDay} select={select} />);
    date = date.clone();
    date.add(1, "d");
  }
  return days;
};

const WeekView = ({
  selectedMonth,
  selectedDay,
  select,
  selectedMonthEvents,
  previousSelectedMonth
}) => (
  <div className="row week">
    {renderDays({
      selectedMonth,
      selectedDay,
      select,
      selectedMonthEvents,
      previousSelectedMonth
    })}
  </div>
);

export default WeekView;
