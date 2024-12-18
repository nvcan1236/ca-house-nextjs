import MotelMarker from "../common/motel-marker";
import BaseMap from "./base-map";
const MapInCreate = () => {
  return (
    <BaseMap>
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
          approved: true,
        }}
      ></MotelMarker>
    </BaseMap>
  );
};

export default MapInCreate;
