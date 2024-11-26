import { useEffect, useState } from "react";
import ReactMapGL, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import MotelMarker from "./MotelMarker";
const MapInCreate = () => {
  const [current, setCurrent] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setViewState({
        ...viewState,
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
      setCurrent({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude,
      });
    });
  }, []);

  const MAP_TOKEN =
    "pk.eyJ1IjoibnZjYW4xMjM2IiwiYSI6ImNtMDVlNXc0cjBrNzUycXF4cHNlb3BoMjEifQ.KYmYtAQpsmkeZClpeujuNA";

  const [viewState, setViewState] = useState({
    longitude: current.longitude,
    latitude: current.latitude,
    zoom: 15,
  });

  return (
    <div className="w-full h-full relative">
      <ReactMapGL
        mapStyle={"mapbox://styles/nvcan1236/cm05einzd00hf01qs8oa59aji"}
        mapboxAccessToken={MAP_TOKEN}
        onMove={(evt) => setViewState(evt.viewState)}
        onDblClick={console.log}
        {...viewState}
      >
        {/* <GeocoderControl mapboxAccessToken={MAP_TOKEN} position="top-left" /> */}
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />
        <Marker longitude={current.longitude} latitude={current.latitude}>
          <MotelMarker
            motel={{
              area: 20,
              availableDate: "",
              city: "Hồ Chí Minh",
              createdAt: "",
              id: "",
              latitude: 1,
              longitude: 1,
              name: "Tên trọ của bạn",
              price: 2000000,
              status: "AVAILABLE",
              type: "Phòng đơn",
              images: [],
              district: "Nhà Bè",
            }}
          ></MotelMarker>
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default MapInCreate;

