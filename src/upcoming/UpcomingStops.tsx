import { StopPoint } from "../provder/ibis/CustomerInformationService";

export function UpcomingStops({ stops }: { stops: StopPoint[] }) {
	return (
		<div className="flex flex-col-reverse grow h-full justify-start bg-primary text-white">
			{stops[0] && (
				<StopLine
					name={stops[0].StopName.Value}
					key={stops[0].StopRef.Value}
					final={stops.length == 1}
				/>
			)}
			{stops[1] && (
				<StopLine
					name={stops[1].StopName.Value}
					key={stops[1].StopRef.Value}
					final={stops.length == 2}
				/>
			)}
			{stops[2] && (
				<StopLine
					name={stops[2].StopName.Value}
					key={stops[2].StopRef.Value}
					final={stops.length == 3}
					fadeout
				/>
			)}
		</div>
	);
}

function StopLine({
	name,
	fadeout,
	final,
}: {
	name: string;
	fadeout?: boolean;
	final?: boolean;
}) {
	return (
		<div className="flex flex-row h-1/3 items-center">
			<Line fadeout={fadeout} hidetop={final} />
			<span className="text-5xl font-medium">{name}</span>
			<span className="text-3xl font-medium ml-auto pr-16">3 Min.</span>
		</div>
	);
}

function Line({ fadeout, hidetop }: { fadeout?: boolean; hidetop?: boolean }) {
	return (
		<div className="h-full w-60 relative">
			{!hidetop && (
				<div
					data-fadeout={fadeout}
					className="absolute h-1/2 left-1/2 w-5 -translate-x-1/2 top-0 bg-red-600 mx-auto bg-gradient-to-t from-80% data-[fadeout=true]:to-transparent"
				></div>
			)}
			<div className="absolute h-1/2 left-1/2 w-5 -translate-x-1/2 bottom-0 bg-red-600 mx-auto"></div>
			<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-8 w-8 rounded-full bg-white"></div>
			<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-5 w-5 rounded-full bg-red-600"></div>
		</div>
	);
}
