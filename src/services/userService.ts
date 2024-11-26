import { caHouseEndpoint } from "@/configs/api-config";
import { authAxios } from "./axios";
import { User } from "@/utils/types";

export const getUserInfor = (): Promise<User> => {
  const user = authAxios
    .get(caHouseEndpoint.getMyInfor)
    .then((data) => {
      if (data.status === 200) {
        return data.data.result;
      }
    })
    .catch((error) => console.log(error?.response?.data?.message));

  return user;
};
