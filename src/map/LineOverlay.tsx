import maplibregl, { type LngLatLike } from "maplibre-gl";
import {
	type LineString,
	type Feature,
	type GeoJsonProperties,
	type Position,
} from "geojson";
import * as turf from "@turf/turf";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { LocationIndicator } from "./LocationIndicator";
import { RouteProgress } from "./RouteProgress";
import { FullRoute } from "./screen-FullRoute";
import { LivePosition } from "./screen-LivePosition";

// Elmshorn 5000: 552213
// U2: 15858436
// S75 -> Münster: 1723831
// Tram 7: 2425311
export function LineOverlay({
	map,
	line,
}: {
	map: maplibregl.Map;
	line: string;
}) {
	const [route, setRoute] = useState<Feature<
		LineString,
		GeoJsonProperties
	> | null>(null);
	const [location, setLocation] = useState<GeolocationPosition | null>(null);

	// render lineString when route changes
	useEffect(() => {
		getLinestring(line).then(setRoute);
	}, [line]);

	// keep track of live position
	useEffect(() => {
		const watchid = navigator.geolocation.watchPosition(setLocation);
		return () => {
			if (watchid) {
				navigator.geolocation.clearWatch(watchid);
			}
		};
	}, []);

	// calculate closest point on route
	const snapped = useMemo(() => {
		if (!route || !location) return null;
		const point = turf.point([
			location.coords.longitude,
			location.coords.latitude,
		]);
		const distanceToRoute_m = turf.pointToLineDistance(point, route, {
			units: "meters",
		});
		if (distanceToRoute_m > 20) {
			console.warn("Location is too far from route");
			console.warn("Todo: redirection mode");
			return point;
		} else {
			return turf.nearestPointOnLine(route, point);
		}
	}, [route, location]);

	return (
		<>
			{snapped && (
				<LocationIndicator
					map={map}
					location={snapped.geometry.coordinates as LngLatLike}
				/>
			)}
			{snapped && route && (
				<RouteProgress map={map} route={route} location={snapped} />
			)}
			<LivePosition
				map={map}
				location={snapped?.geometry.coordinates as LngLatLike}
			/>
			<FullRoute
				map={map}
				route={route}
				location={snapped?.geometry.coordinates as LngLatLike}
			/>
		</>
	);
}

type turboExport = {
	elements: turboElement[];
};

type turboElement = node | way | relation;

type node = {
	type: "node";
	id: number;
	lat: number;
	lon: number;
};

type way = {
	type: "way";
	id: number;
	nodes: number[];
};

type relation = {
	type: "relation";
	id: number;
	members: {
		type: "node" | "way";
		ref: number;
		role: string;
	}[];
};

// get rendered lineString from asset using lineid
async function getLinestring(lineid: string = "1723831") {
	const res = await fetch(`/routes/${lineid}.json`);
	const data = (await res.json()) as turboExport;
	const relation = data.elements.find(
		(e) => e.type === "relation"
	)! as relation;
	const pathways = relation.members
		.filter((m) => m.type === "way" && m.role === "")
		.map((m) =>
			data.elements.find((e) => e.type === "way" && e.id === m.ref)
		) as way[];
	const nodes = pathways
		.map((p, i) => {
			if (i > 0 && p.nodes[0] !== pathways[i - 1].nodes.slice(-1)[0]) {
				p.nodes.reverse();
			}

			return p.nodes.map(
				(n) =>
					data.elements.find((e) => e.type === "node" && e.id === n)!
			);
		})
		.flat() as node[];
	const coordinates = nodes.map((n) => [n.lon, n.lat]) as Position[];
	const lineString = turf.lineString(coordinates);
	return turf.cleanCoords(lineString) as Feature<
		LineString,
		GeoJsonProperties
	>;
}
