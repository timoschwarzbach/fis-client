import { useContext } from "react";
import { IbisContext } from "../../provder/ibis/Ibis";

export default function Bottom() {
	const { VehicleStopRequested, TripInformation, CurrentStopIndex } =
		useContext(IbisContext);
	const currentStop =
		TripInformation.StopSequence.StopPoints[CurrentStopIndex.Value];
	return (
		<div className="h-60 flex flex-row items-center relative bg-white px-8">
			<div className="flex relative grow h-full items-center">
				<span
					data-stopRequested={VehicleStopRequested}
					className="text-8xl font-bold text-black data-[stopRequested=true]:font-[800] transition-[font-weight]"
				>
					{currentStop
						? currentStop.StopName.Value
						: "Couldn't load stop"}
				</span>
			</div>
			{VehicleStopRequested.Value && <StopIndicator />}
		</div>
	);
}

function StopIndicator() {
	return (
		<div className="h-full py-4 pr-4 absolute top-0 bottom-0 right-4 flex items-center">
			<div className="bg-red-600 rounded-md p-4 px-8 h-full max-h-40 flex items-center min-w-60 justify-center">
				<span className="text-white font-black text-6xl">STOP</span>
			</div>
		</div>
	);
}
