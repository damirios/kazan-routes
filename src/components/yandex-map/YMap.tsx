import { useContext, useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { type YMapLocationRequest } from "@yandex/ymaps3-types";
import { useFetchRoutes, useInitYMaps } from "../../hooks";
import { MarkerModalCreation, MarkerModalView } from "../marker-modal";
import { RoutesOnMap } from "../routes-on-map";
import { INullable, IRoute } from "../../types";
import { RouteContext } from "../../contexts";

const DEFAULT_LOCATION: YMapLocationRequest = {
  center: [49.106414, 55.796127], // starting position [lng, lat]
  zoom: 9, // starting zoom
};

export const YMapComponent = () => {
  const [newMarker, setNewMarker] = useState<[number, number] | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [needFetchRoutes, setNeedFetchRoutes] = useState<boolean>(true);

  const [clickedRoute, setClickedRoute] = useState<INullable<IRoute>>(null);

  useEffect(() => {
    setShowViewModal(!!clickedRoute);
    const modalsContainer = document.getElementById("modals")!;

    if (clickedRoute) {
      modalsContainer.classList.add("active");
    } else {
      modalsContainer.classList.remove("active");
    }
  }, [clickedRoute]);

  const { ymapsReact, setYmapsReact } = useInitYMaps();

  const routes = useFetchRoutes(
    needFetchRoutes,
    setNeedFetchRoutes.bind(null, false)
  );

  const closeModal = () => {
    setShowModal(false);
    const modalsContainer = document.getElementById("modals")!;
    modalsContainer.classList.remove("active");
  };

  // @ts-ignore
  const handleClick = (a, { coordinates }, c) => {
    setNewMarker(coordinates);
    setShowModal(true);

    const modalsContainer = document.getElementById("modals")!;
    modalsContainer.classList.add("active");
  };

  const handleCloseModal = () => {
    setNewMarker(null);

    closeModal();
  };

  const handleAddMarker = () => {
    if (newMarker) {
      setNewMarker(null);
    }

    setNeedFetchRoutes(true);
    closeModal();
  };

  if (!ymapsReact) {
    console.log("no y maps: ", ymapsReact);
    return null;
  }

  const {
    YMap,
    YMapMarker,
    YMapDefaultSchemeLayer,
    // @ts-ignore
    YMapDefaultFeaturesLayer,
    // @ts-ignore
    YMapListener,
  } = ymapsReact;

  return (
    <RouteContext.Provider value={{ clickedRoute, setClickedRoute }}>
      <div id="map">
        <YMap location={DEFAULT_LOCATION} showScaleInCopyrights={true}>
          <YMapDefaultSchemeLayer />
          <YMapDefaultFeaturesLayer />

          {routes.length > 0 && (
            <RoutesOnMap routes={routes} YMapMarker={YMapMarker} />
          )}

          <YMapListener onClick={handleClick} />
        </YMap>

        {showModal &&
          ReactDOM.createPortal(
            <MarkerModalCreation
              coordinates={newMarker!}
              onClose={handleCloseModal}
              onCreateMarker={handleAddMarker}
            />,
            document.getElementById("modals")!
          )}

        {showViewModal &&
          ReactDOM.createPortal(
            <MarkerModalView />,
            document.getElementById("modals")!
          )}
      </div>
    </RouteContext.Provider>
  );
};
