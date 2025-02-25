import maplibregl from "maplibre-gl";
import {
	type LineString,
	type Feature,
	type GeoJsonProperties,
	type Point,
} from "geojson";
import * as turf from "@turf/turf";
import { useEffect } from "react";

export function RouteProgress({
	map,
	route,
	location,
}: {
	map: maplibregl.Map;
	route: Feature<LineString, GeoJsonProperties>;
	location: Feature<Point, GeoJsonProperties>;
}) {
	useEffect(() => {
		// spawn layer
	}, []);

	useEffect(() => {
		// recalculate progress
		const parts = turf.lineSplit(route, location);
		const progress = parts.features[0];
		const upcoming = parts.features[1];

		if (parts.features.length == 1 && progress) {
			renderRouteUpcomingOnMap(map, progress);
		}
		if (parts.features.length >= 2 && progress && upcoming) {
			renderRouteProgressOnMap(map, progress);
			renderRouteUpcomingOnMap(map, upcoming);
		}

		return () => {
			map.getLayer("route-progress-line") &&
				map.removeLayer("route-progress-line");
			map.getSource("route-progress") &&
				map.removeSource("route-progress");

			map.getLayer("route-upcoming-line") &&
				map.removeLayer("route-upcoming-line");
			map.getLayer("route-upcoming-line-contrast") &&
				map.removeLayer("route-upcoming-line-contrast");
			map.getLayer("route-upcoming-circle") &&
				map.removeLayer("route-upcoming-circle");
			map.getSource("route-upcoming") &&
				map.removeSource("route-upcoming");
		};
	}, [location, route]);

	return <></>;
}

function renderRouteProgressOnMap(map: maplibregl.Map, data: Feature) {
	map.addSource("route-progress", {
		type: "geojson",
		data: data,
	}).addLayer({
		id: "route-progress-line",
		type: "line",
		source: "route-progress",
		layout: { "line-cap": "round", "line-join": "round" },
		paint: {
			"line-color": "gray",
			"line-width": ["interpolate", ["linear"], ["zoom"], 10, 4, 15, 8],
		},
	});
}

function renderRouteUpcomingOnMap(map: maplibregl.Map, data: Feature) {
	map.addSource("route-upcoming", {
		type: "geojson",
		data: data,
	})
		.addLayer({
			id: "route-upcoming-line-contrast",
			type: "line",
			source: "route-upcoming",
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
			id: "route-upcoming-line",
			type: "line",
			source: "route-upcoming",
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
			id: "route-upcoming-circle",
			type: "circle",
			source: "route-upcoming",
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
}
