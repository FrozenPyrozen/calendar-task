import React, { Component } from "react";
import moment from "moment";

import CalendarView from "./CalendarView";

const INITIAL_STATE = {
  selectedMonth: moment(),
  selectedDay: moment().startOf("day"),
  selectedMonthEvents: [],
  showEventsModal: false
};

export default class CalendarContainer extends Component {
  state = { ...INITIAL_STATE };

  handleNextMonth = () =>
    this.setState(prevState => ({
      selectedMonth: prevState.selectedMonth.add(1, "month")
    }));

  handlePrevMonth = () =>
    this.setState(prevState => ({
      selectedMonth: prevState.selectedMonth.subtract(1, "month")
    }));

  handlebackToCurrentMonth = () => this.setState({ selectedMonth: moment() });

  selectDay = day =>
    this.setState({
      selectedMonth: day.date,
      selectedDay: day.date.clone(),
      showEventsModal: true
    });

  showCalendar = () =>
    this.setState({
      showEventsModal: false
    });

  handleAdd = () => {
    const { selectedMonthEvents, selectedDay } = this.state;

    const newEvents = [];

    const eventTitle = prompt("Введите название вашего события: ");

    switch (eventTitle) {
      case "":
        alert("Имя события не может быть пустым!");
        break;
      case null:
        alert("Передумали? Вы всегда можете добавить событие позже!");
        break;
      default:
        const newEvent = {
          title: eventTitle,
          date: selectedDay,
          dynamic: true
        };

        newEvents.push(newEvent);

        for (let i = 0; i < newEvents.length; i++) {
          selectedMonthEvents.push(newEvents[i]);
        }

        this.setState({
          selectedMonthEvents
        });
        break;
    }
  };

  addEvent = () => {
    const { selectedDay } = this.state;

    const isAfterDay = moment()
      .startOf("day")
      .subtract(1, "d");

    if (selectedDay.isAfter(isAfterDay)) {
      this.handleAdd();
    } else {
      // eslint-disable-next-line no-restricted-globals
      const isConfirmed = confirm(
        "Вы уверены что хотите добавить событие в прошлое?"
      );
      if (isConfirmed) {
        this.handleAdd();
      } else {
        alert("Правильно! Не нужно пытаться изменить прошлое");
      }
    }
  };

  removeEvent = index => {
    const monthEvents = this.state.selectedMonthEvents.slice();
    // eslint-disable-next-line no-restricted-globals
    const isConfirmed = confirm("Вы уверены что хотите удалить событие");
    if (isConfirmed) {
      if (index !== -1) {
        monthEvents.splice(index, 1);
      } else {
        alert("Нет событий для удаления в этот день!");
      }

      this.setState({
        selectedMonthEvents: monthEvents
      });
    }
  };

  render() {
    return (
      <CalendarView
        {...this.state}
        handleNextMonth={this.handleNextMonth}
        handlePrevMonth={this.handlePrevMonth}
        handlebackToCurrentMonth={this.handlebackToCurrentMonth}
        selectDay={this.selectDay}
        showCalendar={this.showCalendar}
        handleAdd={this.handleAdd}
        addEvent={this.addEvent}
        removeEvent={this.removeEvent}
      />
    );
  }
}
