/** Общие данные маршрута */
export type IRoute = {
  /** Id данных по биологии */
  biology_id: number;
  /** Дата создания */
  created_at: string;
  /** Описание */
  description: string;
  /** Id */
  id: number;
  /** Id изображения */
  image: string;
  /** Широта */
  lat: number;
  /** Долгота */
  lon: number;
};
