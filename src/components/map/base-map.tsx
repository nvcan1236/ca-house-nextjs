import React, { PropsWithChildren, useEffect, useState } from "react";
import ReactMapGL, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  ScaleControl,
  ViewStateChangeEvent,
} from "react-map-gl";

const BaseMap = ({
  children,
  onMoveEnd,
}: PropsWithChildren & { onMoveEnd?: (e: ViewStateChangeEvent) => void }) => {
  const MAP_TOKEN = process.env.NEXT_PUBLIC_MAP_TOKEN;
  const [current, setCurrent] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [viewState, setViewState] = useState({
    longitude: current.longitude,
    latitude: current.latitude,
    zoom: 15,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { longitude, latitude } }) => {
        setViewState({
          ...viewState,
          longitude,
          latitude,
        });
        setCurrent({
          ...current,
          longitude,
          latitude,
        });
      }
    );
  }, []);

  return (
    <div className="w-full h-full relative">
      <ReactMapGL
        mapStyle={"mapbox://styles/nvcan1236/cm05einzd00hf01qs8oa59aji"}
        mapboxAccessToken={MAP_TOKEN}
        onMove={(evt) => setViewState(evt.viewState)}
        onDblClick={console.log}
        onMoveEnd={onMoveEnd}
        {...viewState}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        <Marker longitude={current.longitude} latitude={current.latitude}>
          {children}
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default BaseMap;
