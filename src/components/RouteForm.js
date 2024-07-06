import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function RouteForm({ onRouteCalculated }) {
  const [startCity, setStartCity] = useState('');
  const [endCity, setEndCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const geocodeAddress = async (address) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
    );
    const data = await response.json();
    if (data.length > 0) {
      return data[0];
    } else {
      throw new Error(`No results found for address: ${address}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const startCoords = await geocodeAddress(startCity);
      const endCoords = await geocodeAddress(endCity);

      const route = {
        start: [parseFloat(startCoords.lat), parseFloat(startCoords.lon)],
        end: [parseFloat(endCoords.lat), parseFloat(endCoords.lon)],
      };

      onRouteCalculated(route);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Enter Route Details</Typography>
      <TextField
        label="Start City"
        value={startCity}
        onChange={(e) => setStartCity(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <TextField
        label="End City"
        value={endCity}
        onChange={(e) => setEndCity(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
        Calculate Route
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
}

export default RouteForm;
