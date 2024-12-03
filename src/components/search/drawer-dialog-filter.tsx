import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import DialogFilter from "./dialog-filter";
import DrawerFilter from "./drawer-filter";

export function DrawerDialogFilter() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return <DialogFilter />;
  }

  return <DrawerFilter />;
}
