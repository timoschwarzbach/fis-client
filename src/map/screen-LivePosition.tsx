import { type LineString, type Feature, type GeoJsonProperties } from "geojson";
import { useContext, useEffect } from "react";
import { ScreenContext } from "../provder/Screen";
import { LngLatLike } from "maplibre-gl";

export function LivePosition({
	map,
	location,
}: {
	map: maplibregl.Map;
	location: LngLatLike | null;
}) {
	const { screen } = useContext(ScreenContext);

	// zoom close on load (anytime actaully - just to be sure)
	// set center when position updates
	useEffect(() => {
		if (screen !== "map" || !location) return;
		map.setZoom(15);
		map.setCenter(location);
	}, [screen, location]);

	return <></>;
}
