import { ReactNode, useEffect, useMemo, useState } from "react";
import ReactMapGL, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  ScaleControl,
  ViewState,
} from "react-map-gl";
import { MapPinIcon } from "lucide-react";
import MotelMarker from "./MotelMarker";
import { useGetNearestMotelsQuery } from "@/stores/api/motelApi";
const Map = ({ children }: { children?: ReactNode }) => {
  const [current, setCurrent] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [viewState, setViewState] = useState({
    longitude: current.longitude,
    latitude: current.latitude,
    zoom: 15,
  });

  const [filter, setFilter] = useState({
    longitude: current.longitude,
    latitude: current.latitude,
    radius: 5000,
  });

  const updateFilter = (viewState: ViewState) => {
    let radius = 5000;
    if (viewState.zoom < 11) {
      radius = 10000;
    }
    if (viewState.zoom < 10) {
      radius = 30000;
    }
    if (viewState.zoom < 9) {
      radius = 40000;
    }
    if (viewState.zoom < 8) {
      radius = 80000;
    }

    setFilter((prev) => ({
      ...prev,
      longitude: viewState.longitude,
      latitude: viewState.latitude,
      radius: radius,
    }));
  };

  const { data } = useGetNearestMotelsQuery({
    lon: filter.longitude,
    lat: filter.latitude,
    radius: filter.radius,
  });

  const motels = data?.result;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setViewState({
        ...viewState,
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
      setCurrent({
        ...current,
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
    });
  }, []);

  const MAP_TOKEN =
    "pk.eyJ1IjoibnZjYW4xMjM2IiwiYSI6ImNtMDVlNXc0cjBrNzUycXF4cHNlb3BoMjEifQ.KYmYtAQpsmkeZClpeujuNA";

  const motelMarkers = useMemo(
    () =>
      motels?.map((motel, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={motel.longitude}
          latitude={motel.latitude}
          anchor="bottom"
        >
          <MotelMarker motel={motel}></MotelMarker>
          {children}
        </Marker>
      )),
    [JSON.stringify(motels)]
  );

  // const motels = useMemo(
  //   () => (
  //     <>
  //       <Marker longitude={106.71} latitude={10.699}>
  //         <MotelMarker></MotelMarker>
  //       </Marker>
  //       <Marker longitude={106.72} latitude={10.7}>
  //         <MotelMarker></MotelMarker>
  //       </Marker>
  //       <Marker longitude={106.73} latitude={10.68}>
  //         <MotelMarker></MotelMarker>
  //       </Marker>
  //     </>
  //   ),
  //   [JSON.stringify(current)]
  // );

  return (
    <div className="w-full h-full relative">
      <div className="absolute bottom-0 p-3 bg-background z-30">
        Lon: ${viewState.longitude} - Lat: {viewState.latitude} - Radius:{" "}
        {viewState.zoom}
      </div>
      <ReactMapGL
        mapStyle={"mapbox://styles/nvcan1236/cm05einzd00hf01qs8oa59aji"}
        mapboxAccessToken={MAP_TOKEN}
        onMove={(evt) => setViewState(evt.viewState)}
        onMoveEnd={({ viewState }) => updateFilter(viewState)}
        {...viewState}
      >
        {/* <GeocoderControl mapboxAccessToken={MAP_TOKEN} position="top-left" /> */}
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        {motelMarkers}
        <Marker longitude={current.longitude} latitude={current.latitude}>
          <MapPinIcon size={32} fill="#ea4e2c" strokeWidth={1} />
        </Marker>
        {/* <Marker longitude={viewState.longitude} latitude={viewState.latitude}>
          <MapPinIcon size={32} fill="#ea4e2c" strokeWidth={1} />
        </Marker> */}
      </ReactMapGL>
    </div>
  );
};

export default Map;
