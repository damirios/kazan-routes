import { createContext, Dispatch, SetStateAction } from "react";
import { INullable, IRoute } from "../types";

export const RouteContext = createContext<
  INullable<{
    clickedRoute: INullable<IRoute>;
    setClickedRoute: Dispatch<SetStateAction<INullable<IRoute>>>;
  }>
>(null);
