import { useEffect, useState } from "react";
import { getAllRoutes } from "../supabaseUtils";
import { IRoute } from "../types";

export const useFetchRoutes = (
  needFetch: boolean,
  resetNeedFetch: VoidFunction
): IRoute[] => {
  const [routes, setRoutes] = useState<IRoute[]>([]);

  useEffect(() => {
    if (!needFetch) {
      return;
    }

    async function fetchRoutes() {
      const { data, error } = await getAllRoutes();
      setRoutes(data);
      resetNeedFetch();
    }

    fetchRoutes();
  }, [needFetch]);

  return routes;
};
