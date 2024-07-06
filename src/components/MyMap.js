import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point, LineString } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Stroke from 'ol/style/Stroke';

// Import React Bootstrap components
import Toast from 'react-bootstrap/Toast';
import Button from 'react-bootstrap/Button';

// Map icon URL (sample icon from a CDN)
const mapIconUrl = 'https://cdn.mapmarker.io/api/v1/pin?text=Airport&size=50&hoffset=1';

const haversineDistance = (coords1, coords2) => {
  const toRad = (x) => x * Math.PI / 180;

  const lat1 = coords1[1];
  const lon1 = coords1[0];
  const lat2 = coords2[1];
  const lon2 = coords2[0];

  const R = 6371; // Radius of the Earth in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const MyMap = ({ route, airports }) => {
  const mapRef = useRef();
  const [distance, setDistance] = useState(null);
  const [flightTime, setFlightTime] = useState(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!route || !airports || airports.length === 0) {
      setShowError(true);
      return;
    }

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    const routeStart = fromLonLat(route.start);
    const routeEnd = fromLonLat(route.end);

    // Calculate distance and flight time using Haversine formula
    const dist = haversineDistance(route.start, route.end);
    const avgFlightSpeed = 800; // Average flight speed in km/h
    const time = dist / avgFlightSpeed; // Time in hours

    setDistance(dist.toFixed(2)); // Set distance with 2 decimal places
    setFlightTime(time.toFixed(2)); // Set flight time with 2 decimal places

    // Route line feature
    const routeLine = new Feature({
      geometry: new LineString([routeStart, routeEnd]),
    });

    const routeLayer = new VectorLayer({
      source: new VectorSource({
        features: [routeLine],
      }),
      style: new Style({
        stroke: new Stroke({
          color: 'red',
          width: 3,
        }),
      }),
    });

    const startPoint = new Feature({
      geometry: new Point(routeStart),
    });

    const endPoint = new Feature({
      geometry: new Point(routeEnd),
    });

    const startPointLayer = new VectorLayer({
      source: new VectorSource({
        features: [startPoint],
      }),
      style: new Style({
        image: new Icon({
          src: mapIconUrl, // Use the map icon URL
          scale: 0.5, // Adjust the scale of the icon
        }),
      }),
    });

    const endPointLayer = new VectorLayer({
      source: new VectorSource({
        features: [endPoint],
      }),
      style: new Style({
        image: new Icon({
          src: mapIconUrl, // Use the map icon URL
          scale: 0.5, // Adjust the scale of the icon
        }),
      }),
    });

    map.addLayer(routeLayer);
    map.addLayer(startPointLayer);
    map.addLayer(endPointLayer);

    // Add markers for all airports
    airports.forEach((airport) => {
      const airportPoint = new Feature({
        geometry: new Point(fromLonLat(airport.coords)),
      });

      const airportLayer = new VectorLayer({
        source: new VectorSource({
          features: [airportPoint],
        }),
        style: new Style({
          image: new Icon({
            src: mapIconUrl, // Use the map icon URL
            scale: 0.8, // Adjust the scale of the icon for airports
          }),
        }),
      });

      map.addLayer(airportLayer);
    });

    try {
      map.getView().fit(routeLine.getGeometry().getExtent(), { padding: [50, 50, 50, 50] });
    } catch (error) {
      console.error('Error fitting view:', error);
      setShowError(true); // Show error notification
    }

    return () => map.setTarget(null);
  }, [route, airports]);

  const handleCloseError = () => setShowError(false);

  return (
    <div style={{ height: '75vh', width: '100%' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
      {distance && flightTime && (
        <div>
          <p>Distance: {distance} km</p>
          <p>Estimated Flight Time: {flightTime} hours</p>
        </div>
      )}

      {/* Error notification */}
      <Toast show={showError} onClose={handleCloseError} style={{ position: 'absolute', top: 20, right: 20 }}>
        <Toast.Header>
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>
          Cannot fit empty extent provided as geometry.
        </Toast.Body>
        <Button onClick={handleCloseError} variant="secondary" size="sm" style={{ marginTop: '0.5rem' }}>
          Close
        </Button>
      </Toast>
    </div>
  );
};

export default MyMap;
