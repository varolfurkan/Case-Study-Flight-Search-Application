import React from 'react';
import './App.css';

const FlightList = ({ flights }) => {
  return (
    <div className="flight-list">
      <h2>Uçuş Sonuçları</h2>
      <ul className='flight-item'>
        {flights.map(flight => (
          <li key={flight.id}>
            <div>Kalkış Havaalanı: {flight.departureAirport}</div>
            <div>Varış Havaalanı: {flight.arrivalAirport}</div>
            <div>Uçuş Tarihi: {flight.departureDate}</div>
            <div>Uçuş süresi: {flight.duration}</div>
            <div>Fiyat: {flight.price} $</div>
            <div>Havayolu: {flight.airline}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightList;
