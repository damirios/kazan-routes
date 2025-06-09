import React, { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";

import { YMapMarker } from "@yandex/ymaps3-types";

export const useInitYMaps = () => {
  const [ymapsReact, setYmapsReact] = useState<{
    YMap: any;
    YMapDefaultSchemeLayer: any;
    YMapMarker: YMapMarker;
  } | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    document.body.appendChild(script);
    script.type = "text/javascript";
    script.src = `https://api-maps.yandex.ru/v3/?apikey=${process.env.REACT_APP_YANDEX_API_KEY}&lang=ru-RU`;
    script.onload = async () => {
      const ymaps = window.ymaps3;
      console.log("window.ymaps3: ", window.ymaps3);
      const [ymaps3React] = await Promise.all([
        ymaps.import("@yandex/ymaps3-reactify"),
        ymaps.ready,
      ]);

      const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
      const yampsReact = reactify.module(ymaps);

      setYmapsReact(yampsReact);
    };
  }, []);

  return { ymapsReact, setYmapsReact };
};
