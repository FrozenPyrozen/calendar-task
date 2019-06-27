import React from "react";

const renderDayEvents = ({ selectedDay, selectedMonthEvents, removeEvent }) => {
  const monthEventsRendered = selectedMonthEvents.map((event, i) => {
    return (
      <div
        key={event.title}
        className="event-container"
        onClick={() => removeEvent(i)}
      >
        <div className="event-time event-attribute">
          {event.date.format("HH:mm")}
        </div>

        <div className="event-title event-attribute">{event.title}</div>
      </div>
    );
  });

  const dayEventsRendered = [];

  for (let i = 0; i < monthEventsRendered.length; i++) {
    if (selectedMonthEvents[i].date.isSame(selectedDay, "day")) {
      dayEventsRendered.push(monthEventsRendered[i]);
    }
  }

  return dayEventsRendered;
};

const EventsView = ({ selectedDay, selectedMonthEvents, removeEvent }) => (
  <div className="day-events">
    {renderDayEvents({ selectedDay, selectedMonthEvents, removeEvent })}
  </div>
);

export default EventsView;
