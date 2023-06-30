/* eslint-disable react/no-unknown-property */
import React, { Fragment } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MarkerProps } from "./type";
import L from "leaflet";
import { Text } from "@nextui-org/react";
import { useRouter } from "next/navigation";

/**
 * Returns a Leaflet icon based on the type of marker specified in the parameter.
 *
 * @param {MarkerProps["type"]} type - The type of marker to get an icon for.
 * @return {L.Icon} The Leaflet icon object for the specified marker type.
 */
function getIcon(type: MarkerProps["type"]) {
  let marker;
  switch (type) {
    case "Data Centre":
    case "Battery Factory":
      marker = "marker-green";
      break;
    case "Pre-Cast Factory":
    case "Paper Mill":
      marker = "marker-yellow";
      break;
    case "Apartments":
    case "Museum":
    case "Shopping Centre":
      marker = "marker-bordeaux";
      break;
    case "Hospital":
    case "School":
      marker = "marker-blue";
      break;
    default:
      marker = "marker-red";
      break;
  }
  return L.icon({
    iconUrl: "/svg/Icon/Marker/" + marker + ".svg",
    iconSize: [20, 20],
  });
}


/**
 * Renders a map with markers on it.
 *
 * @param {MarkerProps[]} marker - An array of markers to display on the map.
 * @param {boolean} centerMarker - If true, the first marker in the array will be centered on the map.
 * @return {JSX.Element} A MapContainer component displaying the map with markers.
 */
export default function Map({
  marker,
  centerMarker,
}: {
  marker?: MarkerProps[];
  centerMarker?: boolean;
}) {
  const router = useRouter();
  return (
    <Fragment>
      <style jsx global>{`
        .leaflet-c-popover {
          border: 1px solid var(--nextui-colors-border);
          border-radius: 14px;
        }
        .leaflet-c-popover :first-child {
          background: black;
          color: white;
        }
        .leaflet-popup-content {
          margin: 0 !important;
        }
        .leaflet-popup-close-button {
          display: none;
        }
        .leaflet-container {
          width: 100% !important;
          height: 100% !important;
        }
        .leaflet-control {
          display: none !important;
        }
      `}</style>
      <MapContainer
        center={
          centerMarker && marker
            ? {
                ...{
                  lat: marker[0].address.lat as unknown as number,
                  lng: marker[0].address.lng as unknown as number,
                },
              }
            : { lat: 53.36512, lng: 10.27083 }
        }
        zoom={4}
      >
        <TileLayer
          attribution=""
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        {marker &&
          marker.map((marker, idx) => (
            <Marker
              position={[
                marker.address.lat as unknown as number,
                marker.address.lng as unknown as number,
              ]}
              key={idx}
              icon={getIcon(marker.type)}
            >
              <Popup className="leaflet-c-popover">
                <Text
                  css={{
                    m: "5px 15px !important",
                    lh: 1.2,
                    transition: "$default",
                  }}
                >
                  <strong
                    style={{
                      cursor: "pointer",
                      transition: "var(--nextui-transitions-default)",
                    }}
                    onMouseEnter={(e) => {
                      const eleme = e.target as HTMLElement;
                      eleme.style.color = "var(--nextui-colors-gray800)";
                    }}
                    onMouseLeave={(e) => {
                      const eleme = e.target as HTMLElement;
                      eleme.style.color = "white";
                    }}
                    onClick={() => {
                      if (marker.id) {
                        router.push("/sb/project/" + marker.id);
                      }
                    }}
                  >
                    {marker.name}
                  </strong>
                  <br />
                  <i>{marker.type}</i>
                  <br />
                  {marker.company && <small>by {marker.company}</small>}
                </Text>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </Fragment>
  );
}
