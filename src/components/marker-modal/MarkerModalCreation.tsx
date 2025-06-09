import { ChangeEvent, FC, MouseEvent, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./style.marker.css";
import { RouteUnitBlock } from "./RouteUnitBlock";
import {
  createNewBiology,
  createNewRoute,
  uploadImage,
} from "../../supabaseUtils";
import { IRouteData, RouteDataUnitEnum } from "../../types";

const { COMMON, BIOLOGY } = RouteDataUnitEnum;
// const { COMMON, BIOLOGY, GEOGRAPHY, HISTORY } = RouteDataUnitEnum;

type Props = {
  onClose: VoidFunction;
  onCreateMarker: VoidFunction;
  coordinates: [number, number];
};

export const MarkerModalCreation: FC<Props> = ({
  onClose,
  onCreateMarker,
  coordinates,
}) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  const [routeData, setRouteData] = useState<IRouteData>({
    [COMMON]: {
      text: "",
      image: null,
    },
    [BIOLOGY]: {
      text: "",
      image: null,
    },
    // [GEOGRAPHY]: {
    //   text: "",
    //   image: null,
    // },
    // [HISTORY]: {
    //   text: "",
    //   image: null,
    // },
  });

  const handleChangeText =
    (routeUnit: RouteDataUnitEnum) =>
    ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
      if (target instanceof HTMLTextAreaElement) {
        const text: string = target.value;
        setRouteData((prev) => ({
          ...prev,
          [routeUnit]: { ...prev[routeUnit], text },
        }));
      }
    };

  const handleChangeImage =
    (routeUnit: RouteDataUnitEnum) =>
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      if (target instanceof HTMLInputElement && target.files?.[0]) {
        const image = target.files[0];
        setRouteData((prev) => ({
          ...prev,
          [routeUnit]: { ...prev[routeUnit], image },
        }));
      }
    };

  const handleClickBackdrop = ({ target }: MouseEvent<HTMLDivElement>) => {
    if (target instanceof Node && target === backdropRef.current) {
      onClose();
    }
  };

  const handleClickCreate = async () => {
    const commonImage = routeData[COMMON].image;
    const biologyImage = routeData[BIOLOGY].image;

    if (commonImage && biologyImage) {
      const commonImageFileName = uuidv4();
      const commonImageResult = await uploadImage({
        fileName: commonImageFileName,
        image: commonImage,
      });

      const biologyImageFileName = uuidv4();
      const biologyImageResult = await uploadImage({
        fileName: biologyImageFileName,
        image: biologyImage,
      });

      const biologyRecordId = await createNewBiology({
        image: biologyImageFileName,
        text: routeData[BIOLOGY].text,
      });

      if (biologyRecordId !== null) {
        await createNewRoute({
          biology_id: biologyRecordId,
          description: routeData[COMMON].text,
          image: commonImageFileName,
          lon: coordinates[0],
          lat: coordinates[1],
        });
      }
    }

    onCreateMarker();
    console.log("routeData: ", routeData);
  };

  const { common, biology } = routeData ?? {};
  // const { common, biology, geography, history } = routeData ?? {};

  return (
    <div className="new-marker" onClick={handleClickBackdrop} ref={backdropRef}>
      <div className="new-marker__form">
        <div className="new-marker__title">Создание нового маршрута</div>

        <RouteUnitBlock
          onChangeImage={handleChangeImage(COMMON)}
          onChangeText={handleChangeText(COMMON)}
          text={common?.text ?? ""}
        />

        <RouteUnitBlock
          onChangeImage={handleChangeImage(BIOLOGY)}
          onChangeText={handleChangeText(BIOLOGY)}
          text={biology?.text ?? ""}
        />

        {/* <RouteUnitBlock
          onChangeImage={handleChangeImage(GEOGRAPHY)}
          onChangeText={handleChangeText(GEOGRAPHY)}
          text={geography?.text ?? ""}
        />

        <RouteUnitBlock
          onChangeImage={handleChangeImage(HISTORY)}
          onChangeText={handleChangeText(HISTORY)}
          text={history?.text ?? ""}
        /> */}

        <div className="new-marker__buttons">
          <button className="new-marker__create" onClick={handleClickCreate}>
            Создать маркер
          </button>
          <button className="new-marker__cancel" onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};
