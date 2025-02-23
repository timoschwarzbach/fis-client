import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { LiveLocation } from "./LiveLocation.tsx";
import { useContext, useEffect, useRef, useState } from "react";
import { ScreenContext } from "../provder/Screen.tsx";
import { loadMapScreen, unloadMapScreen } from "./LoadMapScreen.tsx";
import { showFullRoute } from "./full-route.ts";

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
		}).on("load", () => {
			loadLineOverlay(newMap);
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

	// live location if screen == map or map-fullRoute
	useEffect(() => {
		if (!map) return;
		if (screen !== "map") return;
		map.setZoom(15);
		const watchid = addLocationListener(map);
		return () => {
			if (!watchid) return;
			navigator.geolocation.clearWatch(watchid);
		};
	});

	// full route if screen == map-fullRoute
	useEffect(() => {
		if (!map) return;
		if (screen != "map-fullRoute") return;
		showFullRoute(map, "1723831");
	});

	return (
		<div ref={mapContainer} className="w-full h-full bg-red-600">
			{map && <LiveLocation map={map} />}
		</div>
	);
}

// Elmshorn 5000: 552213
// U2: 15858436
// S75 -> Münster: 1723831
// Tram 7: 2425311
function loadLineOverlay(map: maplibregl.Map, lineid: string = "1723831") {
	try {
		console.log("loading line overlay", lineid);

		// removing previous layers if they exist
		map.getSource("current") && map.removeSource("current");
		map.getLayer("current-line") && map.removeLayer("current-line");
		map.getLayer("current-circle") && map.removeLayer("current-circle");

		// adding new line as source
		map.addSource("current", {
			type: "geojson",
			data: `/routes/${lineid}.geojson`,
		})
			.addLayer({
				id: "current-line-contrast",
				type: "line",
				source: "current",
				layout: { "line-cap": "round", "line-join": "round" },
				paint: {
					"line-color": "#f1f5f9",
					"line-width": [
						"interpolate",
						["linear"],
						["zoom"],
						10,
						7,
						15,
						11,
					],
				},
			})
			.addLayer({
				id: "current-line",
				type: "line",
				source: "current",
				layout: { "line-cap": "round", "line-join": "round" },
				paint: {
					"line-color": "#d6322e",
					"line-width": [
						"interpolate",
						["linear"],
						["zoom"],
						10,
						4,
						15,
						8,
					],
				},
			})
			.addLayer({
				id: "current-circle",
				type: "circle",
				source: "current",
				filter: ["==", "public_transport", "stop_position"],
				paint: {
					"circle-color": "#f1f5f9",
					"circle-radius": [
						"interpolate",
						["linear"],
						["zoom"],
						10,
						4,
						15,
						8,
					],
					"circle-stroke-width": [
						"interpolate",
						["linear"],
						["zoom"],
						10,
						2,
						15,
						4,
					],
					"circle-stroke-color": "#1e293b",
				},
			});
	} catch (e) {
		console.error("adding layer failed", e);
	}
}

function addLocationListener(map: maplibregl.Map) {
	try {
		navigator.geolocation.getCurrentPosition((position) => {
			map.setCenter([
				position.coords.longitude,
				position.coords.latitude,
			]);
			// map.panTo([position.coords.longitude, position.coords.latitude]);
		});
		if ("geolocation" in navigator) {
			return navigator.geolocation.watchPosition((position) => {
				map.setCenter([
					position.coords.longitude,
					position.coords.latitude,
				]);
				// map.panTo([
				// 	position.coords.longitude,
				// 	position.coords.latitude,
				// ]);
			});
		} else {
			console.error("Geolocation is not available");
		}
	} catch (error) {
		console.error("Error while adding location listener", error);
	}
}
