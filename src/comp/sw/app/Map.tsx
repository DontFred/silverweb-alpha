import React, { Fragment } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";


export default function Map() {
  return (
    <Fragment>
      <style jsx global>{`
        .leaflet-container {
          width: 100% !important;
          height: 100% !important;
        }
        .leaflet-control {
          display: none !important;
        }
      `}</style>
      <MapContainer center={{ lat: 53.36512, lng: 10.27083 }} zoom={4}>
        <TileLayer
          attribution=""
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
      </MapContainer>
    </Fragment>
  );
}
