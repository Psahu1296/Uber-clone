import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInfo,
} from "../reducer/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_KEY } from "@env";

const OriginalMap = () => {
  const origin = useSelector(selectOrigin);
  const desination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !desination) return;
    // Zoom & fir markers

    setTimeout(() => {
      mapRef.current.fitToSuppliedMarkers(["origin", "desination"], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
    }, 300);
  }, [origin, desination]);

  useEffect(() => {
    if (!origin || !desination) return;
    const getTravelTime = async () => {
      console.log("getTravelTime", desination.description, origin.description);
      try {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.description}&destinations=${desination.description}&key=${GOOGLE_MAPS_KEY}`
        );
        const data = await res.json();
        dispatch(setTravelTimeInfo(data.rows[0].elements[0]));
      } catch (err) {
        console.log("Error fetching", err);
      }
    };

    getTravelTime();
  }, [desination, origin, GOOGLE_MAPS_KEY]);
  return (
    <MapView
      ref={mapRef}
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      style={{
        flex: 1,
      }}
      mapType="mutedStandard"
    >
      {origin && desination && (
        <MapViewDirections
          origin={origin.description}
          destination={desination.description}
          apikey={GOOGLE_MAPS_KEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}

      {desination?.location && (
        <Marker
          coordinate={{
            latitude: desination.location.lat,
            longitude: desination.location.lng,
          }}
          title="Desination"
          description={desination.description}
          identifier="desination"
        />
      )}
    </MapView>
  );
};

export default OriginalMap;
