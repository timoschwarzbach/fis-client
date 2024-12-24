export function UpcomingStops({ stops }: { stops: string[] }) {
	return (
		<div className="flex flex-col-reverse grow h-full justify-start bg-primary text-white">
			{stops[0] && (
				<StopLine
					name={stops[0]}
					key={stops[0]}
					final={stops.length == 1}
				/>
			)}
			{stops[1] && (
				<StopLine
					name={stops[1]}
					key={stops[1]}
					final={stops.length == 2}
				/>
			)}
			{stops[2] && (
				<StopLine
					name={stops[2]}
					key={stops[2]}
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
			<span className="text-6xl font-semibold">{name}</span>
		</div>
	);
}

function Line({ fadeout, hidetop }: { fadeout?: boolean; hidetop?: boolean }) {
	return (
		<div className="h-full w-60 relative">
			{!hidetop && (
				<div
					data-fade={fadeout}
					className="absolute h-1/2 left-1/2 w-6 -translate-x-1/2 top-0 bg-red-600 mx-auto bg-gradient-to-t from-80% data-[fadeout=true]:to-transparent"
				></div>
			)}
			<div className="absolute h-1/2 left-1/2 w-6 -translate-x-1/2 bottom-0 bg-red-600 mx-auto"></div>
			<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-12 w-12 rounded-full bg-red-600"></div>
			<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-6 w-6 rounded-full bg-white"></div>
		</div>
	);
}
