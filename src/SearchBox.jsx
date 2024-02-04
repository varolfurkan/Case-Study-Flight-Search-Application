import React, { useState } from 'react';
import './App.css';

const SearchBar = ({ flights, setDepartureFlights, setReturnFlights }) => {
  // State'lerin tanımlanması
  const [departureInput, setDepartureInput] = useState('');
  const [arrivalInput, setArrivalInput] = useState('');
  const [departureSuggestions, setDepartureSuggestions] = useState([]);
  const [arrivalSuggestions, setArrivalSuggestions] = useState([]);
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [oneWay, setOneWay] = useState(false);

// Kalkış havaalanı input'u için değişim işlevi
const handleDepartureInputChange = (event) => {
  const input = event.target.value;
  setDepartureInput(input);

  // flights dizisinin varlığını ve girişin dolu olup olmadığını kontrol edin
  if (flights && input.trim() !== '') {
    // Kalkış havaalanı önerilerini filtrele
    const filteredSuggestions = flights
      .filter((flight, index, self) => 
        flight.departureAirport.toLowerCase().includes(input.toLowerCase()) &&
        self.findIndex(f => f.departureAirport === flight.departureAirport && f.arrivalAirport !== input) === index
      )
      .map(flight => flight.departureAirport);

    setDepartureSuggestions(filteredSuggestions);
  } else {
    setDepartureSuggestions([]);
  }
};

// Varış havaalanı input'u için değişim işlevi
const handleArrivalInputChange = (event) => {
  const input = event.target.value;
  setArrivalInput(input);

  // flights dizisinin varlığını ve girişin dolu olup olmadığını kontrol edin
  if (flights && input.trim() !== '') {
    // Varış havaalanı önerilerini filtrele
    const filteredSuggestions = flights
      .filter((flight, index, self) => 
        flight.arrivalAirport.toLowerCase().includes(input.toLowerCase()) &&
        self.findIndex(f => f.arrivalAirport === flight.arrivalAirport && f.departureAirport !== input) === index
      )
      .map(flight => flight.arrivalAirport);

    setArrivalSuggestions(filteredSuggestions);
  } else {
    setArrivalSuggestions([]);
  }
};

    // Kalkış havaalanını seçme işlevi
    const handleDepartureSelect = (airport) => {
      setDepartureInput(airport);
      setDepartureSuggestions([]);
    };
  
    // Varış havaalanını seçme işlevi
    const handleArrivalSelect = (airport) => {
      setArrivalInput(airport);
      setArrivalSuggestions([]);
    };

 // Form gönderildiğinde yapılacak işlemler
 const handleSubmit = (e) => {
  e.preventDefault();

  const formData = {
    departureAirport: departureInput,
    arrivalAirport: arrivalInput,
    departureDate: departureDate,
    arrivalDate: arrivalDate,
    oneWay: oneWay
  };

   // Gerekli alanların dolu olup olmadığını kontrol etme
   if (!formData.oneWay && !formData.arrivalDate) {
    alert("Lütfen dönüş tarihini seçin.");
    return;
  }
  // Gidiş ve dönüş uçuşlarını ayrı ayrı filtrele
  const departureFlights = flights.filter(flight => {
    let match = true;
    if (formData.departureAirport && flight.departureAirport.toLowerCase() !== formData.departureAirport.toLowerCase()) {
      match = false;
    }
    if (formData.arrivalAirport && flight.arrivalAirport.toLowerCase() !== formData.arrivalAirport.toLowerCase()) {
      match = false;
    }
    if (formData.departureDate && flight.departureDate !== formData.departureDate) {
      match = false;
    }
    if (formData.oneWay && flight.oneWay == formData.oneWay) {
      match = false;
    }
    return match;
  });

  const returnFlights = formData.oneWay ? [] : flights.filter(flight => {
    let match = true;
    if (formData.departureAirport && flight.arrivalAirport.toLowerCase() !== formData.departureAirport.toLowerCase()) {
      match = false;
    }
    if (formData.arrivalAirport && flight.departureAirport.toLowerCase() !== formData.arrivalAirport.toLowerCase()) {
      match = false;
    }
    if (formData.arrivalDate && flight.departureDate !== formData.arrivalDate) {
      match = false;
    }
    if (formData.oneWay && flight.oneWay !== formData.oneWay) {
      match = false;
    }
    return match;
  });

  setDepartureFlights(departureFlights);
  setReturnFlights(returnFlights);
};



  return (
    <>
    <form onSubmit={handleSubmit}>
      <label>
        Kalkış Havaalanı:
        <input 
          type="text" 
          value={departureInput} 
          onChange={handleDepartureInputChange} 
          required 
        />
        <ul>
          {departureInput && departureSuggestions.map((airport, index) => (
            <li key={index} onClick={() => handleDepartureSelect(airport)}>{airport}</li>
          ))}
        </ul>
      </label>
      <label>
        Varış Havaalanı:
        <input 
          type="text" 
          value={arrivalInput} 
          onChange={handleArrivalInputChange} 
          required 
        />
        <ul>
          {arrivalInput && arrivalSuggestions.map((airport, index) => (
            <li key={index} onClick={() => handleArrivalSelect(airport)}>{airport}</li>
          ))}
        </ul>
      </label>

      <label>
        Kalkış Tarihi:
        <input 
          type="date" 
          value={departureDate} 
          onChange={(e) => setDepartureDate(e.target.value)} 
          required 
        />
      </label>

      <label>
        Dönüş Tarihi:
        <input 
          type="date" 
          value={arrivalDate} 
          onChange={(e) => setArrivalDate(e.target.value)} 
          disabled={oneWay} 
        />
      </label>

      <label>
        Tek Yönlü Uçuş:
        <input 
          type="checkbox" 
          checked={oneWay} 
          onChange={(e) => setOneWay(e.target.checked)} 
        />
      </label>

      <button type="submit">Uçuşları Ara</button>
    </form>
    </>
  );
};

export default SearchBar;
