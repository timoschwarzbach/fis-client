import maplibregl from "maplibre-gl";
import { CSSProperties } from "react";
import { renderToStaticMarkup } from "react-dom/server";

type mapscreen = {
	map: {
		center: [number, number];
		zoom: number;
	};
	markers: exportMarker[];
};

type exportMarker = {
	lat: number;
	lon: number;
	type: string;
	data: any;
};

export async function loadMapScreen(
	map: maplibregl.Map,
	screenurl: string = ""
) {
	try {
		const res = await fetch(screenurl, { cache: "no-store" });
		const json = (await res.json()) as mapscreen;

		// console.log("loading map");
		// map.flyTo({
		// 	center: json.map.center,
		// 	zoom: json.map.zoom,
		// });
		map.panTo(json.map.center);
		map.setZoom(json.map.zoom);

		// console.log("loading markers");
		return json.markers.map((marker) => {
			const element = document.createElement("div");
			element.innerHTML = renderTable[marker.type](marker.data);
			return new maplibregl.Marker({ element: element })
				.setLngLat([marker.lon, marker.lat])
				.addTo(map);
		});
	} catch (error) {
		console.error("Error while loading markers", error);
		return [];
	}
}

export function unloadMapScreen(markers: maplibregl.Marker[]) {
	markers.forEach((marker) => marker.remove());
}

/* Line Icons */

const TrapezoidStyle = {
	paddingTop: 0,
	paddingBottom: 0,
	WebkitClipPath:
		"polygon(80% 0, 100% 50%, 80% 100%, 20% 100%, 0% 50%, 20% 0%)",
	clipPath: "polygon(80% 0, 100% 50%, 80% 100%, 20% 100%, 0% 50%, 20% 0%)",
};
const FerryStyle = {
	WebkitClipPath: "polygon(0 0, 100% 0, 80% 100%, 20% 100%)",
	clipPath: "polygon(0 0, 100% 0, 80% 100%, 20% 100%)",
};
const RoundedStyle = {
	borderRadius: 9999,
};

const ShapeStyles: Record<string, CSSProperties> = {
	trapezoid: TrapezoidStyle,
	ferry: FerryStyle,
	rounded: RoundedStyle,
};

function renderLineIcon({
	color,
	text,
	shape,
	scale,
}: {
	color: string;
	text: string;
	shape: string;
	scale: number;
}) {
	return renderToStaticMarkup(
		<div
			data-type="label"
			data-style={JSON.stringify({
				color: color,
				text: text,
				shape: shape,
				scale: scale,
			})}
			style={{ backgroundColor: color, scale, ...ShapeStyles[shape] }}
			className="px-4 py-1 text-lg font-bold text-white"
		>
			{text}
		</div>
	);
}

/* General Icons */
const durationTable: Record<number, string> = {
	0: "0.5s",
	1: "1s",
	2: "2s",
	3: "5s",
	4: "10s",
};

function renderGeneralIcon(data: {
	color: string;
	stroke: string;
	icon: string;
	shape: string;
	animated: boolean;
	duration: number;
	scale: number;
	rotation: number;
}) {
	return renderToStaticMarkup(
		<div
			data-type="icon"
			data-style={JSON.stringify(data)}
			style={{
				backgroundColor: data.color,
				scale: data.scale,
				rotate: data.rotation + "deg",
			}}
			className="flex h-16 w-16 justify-center rounded-full bg-primary p-4 align-middle text-lg font-bold text-white"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 384 512"
				style={{
					animationName: data.animated ? "bounce-arrow" : "none",
					animationDuration: durationTable[4 - data.duration],
				}}
				className="animate-bounce-arrow fill-white"
			>
				<path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
			</svg>
		</div>
	);
}

/* layouts */
function renderLayout(data: {
	direction: "row" | "column";
	gap: number;
	items: exportMarker[];
}) {
	return renderToStaticMarkup(
		<div
			style={{
				display: "flex",
				flexDirection: data.direction,
				alignItems: "center",
				justifyContent: "center",
				gap: data.gap,
			}}
		>
			{data.items.map((marker) => (
				<div
					dangerouslySetInnerHTML={{
						__html: renderTable[marker.type](marker.data),
					}}
				/>
			))}
		</div>
	);
}

/* renderTable */
const renderTable: Record<string, (data: any) => string> = {
	label: renderLineIcon,
	icon: renderGeneralIcon,
	layout: renderLayout,
};
