import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useContext, useEffect, useRef, useState } from "react";
import { ScreenContext } from "../provder/Screen.tsx";
import { loadMapScreen, unloadMapScreen } from "./LoadMapScreen.tsx";
import { LineOverlay } from "./LineOverlay.tsx";

export default function Map() {
	const { screen, data } = useContext(ScreenContext);
	const [map, setMap] = useState<maplibregl.Map | null>(null);

	const mapContainer = useRef<HTMLDivElement>(null);

	// initialise map
	useEffect(() => {
		if (map) return;
		if (!mapContainer.current) return;
		const newMap = new maplibregl.Map({
			container: mapContainer.current,
			style: "/map.json",
			center: [9.993768, 53.552534],
			zoom: 15,
			attributionControl: false,
		});
		setMap(newMap);
	});

	// load mapscreen when mapscreen
	useEffect(() => {
		if (!map) return;
		if (screen !== "mapview") return;
		const m = loadMapScreen(map, data);
		return () => {
			m.then((m) => unloadMapScreen(m));
		};
	}, [screen, data]);

	return (
		<div ref={mapContainer} className="w-full h-full bg-red-600">
			{map && <LineOverlay map={map} line="1723831" />}
		</div>
	);
}
