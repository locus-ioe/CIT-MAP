import * as React from "react";
import L from "leaflet";

const MOBILE_BREAKPOINT = 500;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(true);

  React.useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Initialize the state and set up the event listener
    onResize();
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isMobile;
}
