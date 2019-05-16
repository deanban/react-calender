import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import gapi_creds from './gapi-creds';

function App() {
  // const [gapiRdy, setGapiRdy] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = () => {
    function start() {
      window.gapi.client
        .init({
          apiKey: gapi_creds.GOOGLE_API_KEY
        })
        .then(function() {
          return window.gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${
              gapi_creds.CALENDAR_ID2
            }/events?timeMin=2019-05-01T00:00:00Z&timeMax=2020-12-30T23:59:59Z`
          });
        })
        .then(response => {
          console.log(response);
          // let reversedResp = response.result.items.reverse();
          setEvents(response.result.items);
        });
    }
    window.gapi.load('client', start);
  };

  const renderEvent = () => {
    return events.map(calEvent => {
      return (
        <div className="container" key={calEvent.id}>
          <div className="row">
            <div className="col-md">
              <h3>{calEvent.summary}</h3>
            </div>

            <div className="col-sm">
              <h4>{calEvent.start.date}</h4>
            </div>
          </div>
        </div>
      );
    });
  };

  return <div>{renderEvent()}</div>;
}

export default App;
