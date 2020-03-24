import React from "react";
import moment from "moment";
// import _ from "lodash";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";

import "./styles.css";

// must manually import the stylesheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

var cntr = 0;


export default class Resize extends React.Component<{}, {}> {
  calendarComponentRef = React.createRef();

  eventsArr = [
    // initial event data
    {
      id: "1",
      resourceId: "r1",
      title: "Event Now",
      start: moment()
        .hour(7)
        .minute(0)
        .second(0)
        .toDate(),
      end: moment()
        .hour(9)
        .minute(0)
        .second(0)
        .toDate()
    }
  ];

  fixIssue = false;

  getEventsArr = () => {
    return this.eventsArr.map(obj => {
      // set fixIssue to true and that will update cntr field in event
      // this will get detected as change in deepEquals fucntion
      // and hence calendar will get updated
      if (this.fixIssue) {
        cntr = cntr + 1;
      }

      return {
        ...obj,
        cntr: cntr
      };
    });
  };

  constructor(props:any) {
    super(props);

    this.state = {
      calendarEvents: this.getEventsArr()
    };
  }

  handleItemResize = () => {
    this.setState({
      calendarEvents: this.getEventsArr()
    });
  };

  render() {
    return (
      <div className="demo-app">
        <div className="demo-app-calendar">
          <FullCalendar
            defaultView="resourceTimeGridDay"
            plugins={[resourceTimeGridPlugin, interactionPlugin]}
            // events={this.state.calendarEvents}
            resources={[
              {
                id: "r1",
                title: "room 1"
              }
            ]}
            editable
          />
        </div>
      </div>
    );
  }
}
