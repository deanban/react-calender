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

  // const onHoverTooltip = calEvent => {
  //   return (
  //     <div
  //       style={{
  //         backgroundColor: 'rgba(0, 0, 0, 0.85)',
  //         padding: '2px 10px',
  //         color: 'white',
  //         borderRadius: 3
  //       }}
  //     >
  //       <h5>{calEvent.description}</h5>
  //     </div>
  //   );
  // };

  const renderEvent = () => {
    return (
      <div className="container">
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Movie</th>
              <th scope="col">Released</th>
            </tr>
          </thead>
          {events.map(calEvent => {
            return (
              <tbody key={calEvent.id}>
                <tr
                  data-toggle="tooltip"
                  data-placement="right"
                  // onMouseOver={() => onHoverTooltip(calEvent)}
                >
                  <td scope="col">{calEvent.summary}</td>
                  <td scope="col">{calEvent.start.date}</td>
                </tr>
              </tbody>
            );
          })}
          <thead className="thead-dark">
            <tr>
              <th scope="col">Movie</th>
              <th scope="col">Released</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  };

  return <div>{renderEvent()}</div>;
}

export default App;
