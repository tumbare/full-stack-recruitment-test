import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import BpkCard from 'bpk-component-card';
import BpkButton from 'bpk-component-button';

import Header from '../Header';
import data from '../../data/flights.json';

import STYLES from './App.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const App = () => (
  <div className={getClassName('App')}>
    <Header />
    <main className={getClassName('App__main')}>
      {data.itineraries.map(flights => {
        let flightInfo = [];
        Moment.globalFormat = 'HH:mm';
        return (
          <BpkCard key={flights.id} style={{ 'margin-bottom': '5px' }}>
            {flights.legs.forEach((item, index) => {
              const allLegs = data.legs.find(leg1 => leg1.id === item);
              const start = moment(allLegs.departure_time);
              const end = moment(allLegs.arrival_time);
              const duration =
                Math.floor(moment(end).diff(start, 'minutes') / 60) +
                'h ' +
                Math.floor(moment(end).diff(start, 'minutes') % 60);

              let stops = '';
              const image = `https://logos.skyscnr.com/images/airlines/favicon/${allLegs.airline_id}.png`;
              if (allLegs.stops === 0) {
                stops = (
                  <span className={getClassName('App__green')}>Direct</span>
                );
              } else {
                stops = (
                  <span className={getClassName('App__red')}>
                    {allLegs.stops} Stop
                  </span>
                );
              }
              flightInfo.push(
                <div
                  className={getClassName('App__time-block')}
                  key={allLegs.airline_id + index}
                >
                  <div className={getClassName('App__flight-logo')}>
                    <img src={image} alt="new" height="30" width="30" />
                  </div>
                  <div className={getClassName('App__flight-time')}>
                    <Moment>{allLegs.departure_time}</Moment>
                    {allLegs.departure_airport}
                  </div>
                  <div className={getClassName('App__flight-time')}>
                    <Moment>{allLegs.arrival_time}</Moment>
                    {allLegs.arrival_airport}
                  </div>
                  <div className={getClassName('App__duration')}>
                    <span style={{ 'color': 'grey', 'font-size': 'smaller' }}>
                      {duration}
                    </span>

                    {stops}
                  </div>
                </div>,
              );
            })}

            {flightInfo}

            <div className={getClassName('App__time-block')}>
              <div className={getClassName('App__price')}>
                <span style={{ 'font-size': 'larger' }}>{flights.price}</span>
                <span style={{ 'color': 'grey', 'font-size': 'medium' }}>
                  {flights.agent}
                </span>
              </div>
              <div className={getClassName('App__duration')}>
                <BpkButton>Select</BpkButton>
              </div>
            </div>
          </BpkCard>
        );
      })}
    </main>
  </div>
);

export default App;
