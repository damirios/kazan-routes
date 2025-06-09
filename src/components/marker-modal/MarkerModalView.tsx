import { FC, MouseEvent, useContext, useEffect, useRef, useState } from "react";

import { downloadImage, getBiologyById } from "../../supabaseUtils";
import { IBiology, INullable, IRoute, RouteDataUnitEnum } from "../../types";
import { RouteContext } from "../../contexts";

import "./style.route.css";

const { COMMON, BIOLOGY } = RouteDataUnitEnum;
// const { COMMON, BIOLOGY, GEOGRAPHY, HISTORY } = RouteDataUnitEnum;

type AllRouteData = Pick<IRoute, "id" | "description" | "image"> & {
  biology: IBiology;
};

type Images = {
  common: INullable<string>;
  biology: INullable<string>;
};

export const MarkerModalView: FC = () => {
  const backdropRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allRouteData, setAllRouteData] =
    useState<INullable<AllRouteData>>(null);
  const [images, setImages] = useState<Images>({ common: null, biology: null });

  const { clickedRoute: route, setClickedRoute: setRoute } =
    useContext(RouteContext) ?? {};

  useEffect(() => {
    if (!route) {
      return;
    }

    setIsLoading(true);

    const { biology_id, id, description, image } = route;

    const fetchRouteAllData = async () => {
      const biology = await getBiologyById(biology_id);

      if (biology) {
        setAllRouteData({ biology, id, description, image });

        const [commonImage, biologyImage] = await Promise.all([
          downloadImage(image),
          downloadImage(biology.image),
        ]);

        setImages({ common: commonImage, biology: biologyImage });
      }

      setIsLoading(false);
    };

    fetchRouteAllData();
  }, []);

  const handleClickBackdrop = ({ target }: MouseEvent<HTMLDivElement>) => {
    if (target instanceof Node && target === backdropRef.current) {
      setRoute?.(null);
    }
  };

  if (isLoading) {
    return (
      <div
        className="new-marker"
        onClick={handleClickBackdrop}
        ref={backdropRef}
      >
        Загрузка...
      </div>
    );
  }

  if (!allRouteData) {
    return (
      <div
        className="new-marker"
        onClick={handleClickBackdrop}
        ref={backdropRef}
      >
        Не удалось загрузить данные маршрута
      </div>
    );
  }

  return (
    <div
      className="route-modal"
      onClick={handleClickBackdrop}
      ref={backdropRef}
    >
      <div className="route-modal__form">
        <div className="route-modal__title">Маршрут №{route?.id}</div>

        <div className="route-modal__block block-route">
          <div className="block-route__description">
            {allRouteData.description}
          </div>
          {!!images.common && (
            <div className="block-route__image">
              <img src={images.common} alt="Общая картинка" />
            </div>
          )}
        </div>

        <div className="route-modal__block block-route">
          <div className="block-route__description">
            {allRouteData.biology.text}
          </div>
          {!!images.biology && (
            <div className="block-route__image">
              <img src={images.biology} alt="Общая картинка" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
