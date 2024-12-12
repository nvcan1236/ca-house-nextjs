import React, { PropsWithChildren } from "react";
import { AuthStoreProvider } from "./auth-store-provider";
import { CreateMotelStoreProvider } from "./create-motel-provider";

const StoreProvider = ({ children }: PropsWithChildren) => {
  return (
    <AuthStoreProvider>
      <CreateMotelStoreProvider>{children}</CreateMotelStoreProvider>
    </AuthStoreProvider>
  );
};

export default StoreProvider;
