import { FC, MouseEvent, useContext } from "react";

import { YMapMarker as YMapMarkerType } from "@yandex/ymaps3-types";
import { RouteContext } from "../../contexts";

type Props = {
  route: any;
  YMapMarker: YMapMarkerType;
};

export const SingleRoute: FC<Props> = ({ route, YMapMarker }) => {
  const { setClickedRoute } = useContext(RouteContext) ?? {};

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setClickedRoute?.(route);
  };

  return (
    <YMapMarker key={route.id} coordinates={[route.lon, route.lat]}>
      <div
        className="marker"
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          backgroundColor: "red",
          opacity: 0.6,
        }}
        onClick={handleClick}
      ></div>
    </YMapMarker>
  );
};
