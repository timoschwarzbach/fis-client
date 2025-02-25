import { useContext } from "react";
import { NextStationText } from "../components/bottom/NextStationText.tsx";
import { IbisContext } from "../provder/ibis/Ibis.tsx";

export default function BottomLarge({ hidetop }: { hidetop?: boolean }) {
	const { TripInformation, CurrentStopIndex, VehicleStopRequested } =
		useContext(IbisContext);
	const currentStop =
		TripInformation.StopSequence.StopPoints[CurrentStopIndex.Value];
	return (
		<div className="h-80 shrink-0 flex flex-row items-center relative bg-white">
			<Line hidetop={hidetop} />
			<NextStationText name={currentStop.StopName.Value} />
			{VehicleStopRequested.Value && <StopIndicator />}
		</div>
	);
}

function Line({ hidetop }: { hidetop?: boolean }) {
	return (
		<div className="h-full w-60 relative shrink-0">
			<div className="absolute h-1/2 left-1/2 w-5 -translate-x-1/2 bottom-0 bg-red-600 mx-auto"></div>
			{/* <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-[4.5rem] w-[4.5rem] rounded-full bg-red-600/50"></div> */}
			<div
				hidden={hidetop}
				className="absolute h-1/2 left-1/2 -translate-x-1/2 top-0 w-5 bg-red-600 mx-auto"
			></div>
			<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-12 w-12 rounded-full bg-red-600"></div>
			<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 h-6 w-6 rounded-full bg-white"></div>
		</div>
	);
}

function StopIndicator() {
	return (
		<div className="h-full py-4 pr-4 absolute top-0 bottom-0 right-4 flex items-center">
			<div className="bg-red-600 rounded-md p-4 px-8 h-full max-h-40 flex items-center min-w-60 justify-center">
				<span className="text-white font-black tracking-wider text-6xl">
					STOP
				</span>
			</div>
		</div>
	);
}
