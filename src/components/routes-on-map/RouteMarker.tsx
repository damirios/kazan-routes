import { FC, MouseEvent } from "react";

import "./style.marker.scss";

type Props = {
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
  title?: string;
};

export const RouteMarker: FC<Props> = ({ onClick, title = "" }) => {
  return (
    <div className="route-marker" onClick={onClick} title={title}>
      {title}
    </div>
  );
};
