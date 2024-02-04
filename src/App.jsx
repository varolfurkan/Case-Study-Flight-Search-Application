import React, { useState, useEffect } from 'react';
import SearchBar from './searchBox';
import FlightList from './flightList';
import './App.css';

const App = () => {
  const [flights, setFlights] = useState([]);
  const [departureFlights, setDepartureFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/flights')
      .then(response => response.json())
      .then(data => {
        setFlights(data); 
        setDepartureFlights([]);
        setReturnFlights([]);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching flights:', error));
  }, []);

  return (
    <div className="App">
      <h1>Uçuş Arama Uygulaması</h1>
      <SearchBar flights={flights} setDepartureFlights={setDepartureFlights} setReturnFlights={setReturnFlights} />
      {loading ? (<p>Veriler yükleniyor...</p>) 
      : (
        <>
        <h2>Gidiş Uçuşları</h2>
        <FlightList flights={departureFlights} />
        <h2>Dönüş Uçuşları</h2>
        <FlightList flights={returnFlights} />
        </>
       )}
      
    </div>
  );
};

export default App;
