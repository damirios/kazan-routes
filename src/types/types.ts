import { Feature } from "@yandex/ymaps3-types/packages/clusterer";

export type ExpandedFeature = Feature & { id: string };

export type INullable<T> = T | null;

export enum RouteDataUnitEnum {
  COMMON = "common",
  BIOLOGY = "biology",
  // GEOGRAPHY = "geography",
  // HISTORY = "history",
}

/** Данные маршрута */
export type IRouteData = {
  /** Общие */
  [RouteDataUnitEnum.COMMON]: IRouteDataUnit;
  /** Биологические */
  [RouteDataUnitEnum.BIOLOGY]: IRouteDataUnit;
  // /** Географические */
  // [RouteDataUnitEnum.GEOGRAPHY]: IRouteDataUnit;
  // /** Исторические и культурные */
  // [RouteDataUnitEnum.HISTORY]: IRouteDataUnit;
};

/** Один блок (единица) данных в маршруте */
type IRouteDataUnit = {
  /** Текст */
  text: string;
  /** Изображение */
  image: INullable<File>;
};

export enum RouteDataTypeEnum {
  FILE = "FILE",
  TEXT = "TEXT",
}
