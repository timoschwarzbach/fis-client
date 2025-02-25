import * as turf from "@turf/turf";
import { type LineString, type Feature, type GeoJsonProperties } from "geojson";
import { useContext, useEffect, useMemo } from "react";
import { ScreenContext } from "../provder/Screen";
import { LngLatBounds, LngLatBoundsLike, LngLatLike } from "maplibre-gl";

export function FullRoute({
	map,
	route,
	location,
}: {
	map: maplibregl.Map;
	route: Feature<LineString, GeoJsonProperties> | null;
	location: LngLatLike | null;
}) {
	const { screen } = useContext(ScreenContext);

	const routeBBox = useMemo(() => {
		if (!route) return null;
		return turf.bbox(route);
	}, [route]);

	const routeLocationBBox = useMemo(() => {
		if (!routeBBox) return null;
		const bounds: LngLatBounds = new LngLatBounds(
			routeBBox as [number, number, number, number]
		);
		if (location) {
			bounds.extend(location);
		}
		return bounds;
	}, [routeBBox, location]);

	useEffect(() => {
		if (screen !== "map-fullRoute") return;
		if (!routeBBox) return;

		map.fitBounds(routeLocationBBox as LngLatBoundsLike, {
			padding: 100,
			duration: 2000,
		});
	}, [screen, route, routeLocationBBox]);

	return <></>;
}
