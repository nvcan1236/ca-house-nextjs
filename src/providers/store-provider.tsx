import React, { PropsWithChildren } from "react";
import { AuthStoreProvider } from "./auth-store-provider";

const StoreProvider = ({ children }: PropsWithChildren) => {
  return <AuthStoreProvider>{children}</AuthStoreProvider>;
};

export default StoreProvider;
