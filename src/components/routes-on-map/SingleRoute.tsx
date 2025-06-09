import { FC, MouseEvent, useContext } from "react";

import { YMapMarker as YMapMarkerType } from "@yandex/ymaps3-types";

import { RouteMarker } from "./RouteMarker";

import { RouteContext } from "../../contexts";
import { IRoute } from "../../types";

type Props = {
  route: IRoute;
  YMapMarker: YMapMarkerType;
};

export const SingleRoute: FC<Props> = ({ route, YMapMarker }) => {
  const { description, id, lat, lon } = route;

  const { setClickedRoute } = useContext(RouteContext) ?? {};
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setClickedRoute?.(route);
  };

  return (
    // @ts-ignore
    <YMapMarker key={id} coordinates={[lon, lat]}>
      {/* <RouteMarker onClick={handleClick} title={description} /> */}
      <RouteMarker onClick={handleClick} />
    </YMapMarker>
  );
};
