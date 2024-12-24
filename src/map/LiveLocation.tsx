import maplibregl from "maplibre-gl";
import { useEffect } from "react";
import { renderToStaticMarkup } from "react-dom/server";

export function LiveLocation({ map }: { map: maplibregl.Map }) {
	useEffect(() => {
		const marker = addLiveLocation(map);
		const watchid = addLocationListener(marker);
		return () => {
			marker.remove();
			if (watchid) {
				navigator.geolocation.clearWatch(watchid);
			}
		};
	});
	return <></>;
}

function addLiveLocation(map: maplibregl.Map) {
	const element = document.createElement("div");
	element.innerHTML = renderToStaticMarkup(
		<div className="relative h-10 w-10">
			<div className="h-full w-full bg-red-600 absolute animate-ping-custom rounded-full"></div>
			<div className="h-full w-full bg-red-600 text-white absolute rounded-full">
				<img
					src="/local-bus.svg"
					className="h-full w-full p-1.5 invert"
				/>
			</div>
		</div>
	);
	const marker = new maplibregl.Marker({ element: element })
		.setLngLat([9.993768, 53.552534])
		.addTo(map);
	return marker;
}

function addLocationListener(marker: maplibregl.Marker) {
	try {
		if ("geolocation" in navigator) {
			return navigator.geolocation.watchPosition((position) => {
				marker.setLngLat([
					position.coords.longitude,
					position.coords.latitude,
				]);
			});
		} else {
			console.error("Geolocation is not available");
		}
	} catch (error) {
		console.error("Error while adding location listener", error);
	}
}
