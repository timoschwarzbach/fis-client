import { useContext } from "react";
import { NextStationText } from "../components/bottom/NextStationText.tsx";
import { IbisContext } from "../provder/Ibis.tsx";

export default function BottomLarge({ hidetop }: { hidetop?: boolean }) {
	const { stations, currentStationIndex, stopRequested } =
		useContext(IbisContext);
	const currentStop = stations[currentStationIndex];
	return (
		<div className="h-80 shrink-0 flex flex-row items-center relative bg-white">
			<Line hidetop={hidetop} />
			<NextStationText name={currentStop} />
			{stopRequested && <StopIndicator />}
		</div>
	);
}

function Line({ hidetop }: { hidetop?: boolean }) {
	return (
		<div className="h-full w-60 relative shrink-0">
			<div className="absolute h-1/2 left-1/2 w-6 -translate-x-1/2 bottom-0 bg-red-600 mx-auto"></div>
			<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-[4.5rem] w-[4.5rem] rounded-full bg-red-600/50"></div>
			<div
				hidden={hidetop}
				className="absolute h-1/2 left-1/2 -translate-x-1/2 top-0 w-6 bg-red-600 mx-auto"
			></div>
			<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-11 w-11 rounded-full bg-white"></div>
			<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-8 w-8 rounded-full bg-red-600"></div>
		</div>
	);
}

function StopIndicator() {
	return (
		<div className="h-full py-4 pr-4 absolute top-0 bottom-0 right-0 flex items-center">
			<div className="bg-red-600 rounded-md p-4 px-8 h-full max-h-40 flex items-center min-w-60 justify-center">
				<span className="text-white font-black text-6xl">STOP</span>
			</div>
		</div>
	);
}
