import React, { Fragment, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MarkerProps } from "./type";
import L, { LatLngTuple } from "leaflet";
import { useRouter } from "next/navigation";
import ReactDomServer from "react-dom/server";
import { Text } from "@nextui-org/react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

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
  useEffect(() => {
    var container: any = L.DomUtil.get("map");

    if (container != null) {
      container._leaflet_id = null;
    }
    const center: LatLngTuple =
      centerMarker && marker
        ? [marker[0].address.lat, marker[0].address.lng]
        : [53.36512, 10.27083];
    var map = L.map("map").setView([...center], 4);
    L.tileLayer(
      "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
    ).addTo(map);
    marker &&
      marker.map((marker, idx) => {
        let MARKER = L.marker([marker.address.lat, marker.address.lng], {
          icon: getIcon(marker.type),
        }).addTo(map);
        MARKER.bindPopup(
          ReactDomServer.renderToString(
            <Fragment>
              <div className="leaflet-c-popover">
                <Text
                  css={{
                    m: "5px 15px !important",
                    lh: 1.2,
                    transition: "$default",
                  }}
                >
                  <a
                  className="strong-as-link"
                    href={"/sb/project/" + marker.id}
                    style={{
                      cursor: "pointer",
                      transition: "var(--nextui-transitions-default)",
                    }}
                  >
                    {marker.name}
                  </a>
                  <br />
                  <i>{marker.type}</i>
                  <br />
                  {marker.company && <small>by {marker.company}</small>}
                </Text>
              </div>
            </Fragment>
          )
        );
      });
  });
  const router = useRouter();
  return (
    <Fragment>
      <style jsx global>{`
        .leaflet-c-popover {
          border-radius: 14px;
        }
        .leaflet-c-popover :first-child {
          background: black;
          color: white;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          background: black;
          color: white;
          border-radius: 14px;
        }
        .leaflet-popup-close-button {
          display: none;
        }
        .leaflet-popup-content-wrapper {
          border: 1px solid var(--nextui-colors-border);
          border-radius: 14px;
          background: black;
        }
        .leaflet-popup-tip {
          background: black;
        }
        .leaflet-container {
          width: 100% !important;
          height: 100% !important;
        }
        .leaflet-control {
          display: none !important;
        }

        .strong-as-link {
          all: unset;
          font-weight: bold;
          color: white;
        }
        .strong-as-link:hover {
          all: unset;
          font-weight: bold;
          color: var(--nextui-colors-gray800);
        }
      `}</style>
      <div id="map" style={{ height: "100%", width: "100%" }}></div>;
    </Fragment>
  );
}
