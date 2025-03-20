import { useMediaQuery } from "react-responsive";

export function useWindowSize() {
  const isDesktopSize = useMediaQuery({ minWidth: 1024 });
  return isDesktopSize;
}
