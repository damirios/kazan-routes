import { FC, Fragment, MouseEvent } from "react";

import { YMapMarker as YMapMarkerType } from "@yandex/ymaps3-types";
import { SingleRoute } from "./SingleRoute";

type Props = {
  routes: any[];
  YMapMarker: YMapMarkerType;
};

export const RoutesOnMap: FC<Props> = ({ routes, YMapMarker }) => {
  return (
    <Fragment>
      {routes.map((route) => (
        <SingleRoute key={route.id} route={route} YMapMarker={YMapMarker} />
      ))}
    </Fragment>
  );
};
