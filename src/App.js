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
              gapi_creds.CALENDAR_ID
            }/events`
          });
        })
        .then(response => {
          console.log(response);
          setEvents(response.result.items);
        });
    }
    window.gapi.load('client', start);
  };

  const renderEvent = () => {
    return events.map(calEvent => {
      return (
        <div>
          <h1>{calEvent.summary}</h1>
        </div>
      );
    });
  };

  return <div className="App">{renderEvent()}</div>;
}

export default App;
