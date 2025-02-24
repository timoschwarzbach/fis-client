import maplibregl, { type LngLatLike, type Marker } from "maplibre-gl";
import { useState } from "react";
import { useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";

export function LocationIndicator({
	map,
	location,
}: {
	map: maplibregl.Map;
	location: LngLatLike;
}) {
	const [marker, setMarker] = useState<Marker | null>(null);

	useEffect(() => {
		const marker = addLiveLocation(map, location);
		setMarker(marker);
		return () => {
			marker.remove();
			setMarker(null);
		};
	}, []);

	useEffect(() => {
		if (!marker) return;
		marker.setLngLat(location);
	}, [location, marker]);

	return <></>;
}

function addLiveLocation(map: maplibregl.Map, coordinates: LngLatLike) {
	const element = document.createElement("div");
	element.innerHTML = renderToStaticMarkup(
		<div className="relative h-10 w-10">
			<div className="h-full w-full bg-red-600 absolute animate-ping-custom rounded-full"></div>
			<div className="h-full w-full bg-red-600 text-white absolute rounded-full">
				<img
					src="/local-bus.svg"
					className="h-full w-full p-2 invert"
				/>
			</div>
		</div>
	);
	const marker = new maplibregl.Marker({ element: element })
		.setLngLat(coordinates)
		.addTo(map);
	return marker;
}
