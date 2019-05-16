import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // const [gapiRdy, setGapiRdy] = useState(false);
  const [events, setEvents] = useState([]);

  const GOOGLE_API_KEY = 'AIzaSyBjvvNhVuFHqn2xahUw7cELBXlItsjvcu4';
  const CALENDAR_ID = 'gpoeuf4afk2plvmpbkc9r184rk@group.calendar.google.com';

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = () => {
    function start() {
      window.gapi.client
        .init({
          apiKey: GOOGLE_API_KEY
        })
        .then(function() {
          return window.gapi.client.request({
            path: `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events`
          });
        })
        .then(response => {
          console.log(response);
          setEvents(response.result.items);
        });
    }
    window.gapi.load('client', start);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
