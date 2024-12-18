import { useContext } from "react";
import { IbisContext } from "../../provder/Ibis";

export default function Bottom() {
	const { stopRequested, stations, currentStationIndex } =
		useContext(IbisContext);
	return (
		<div className="h-40 flex flex-row items-center relative bg-white">
			<div className="h-full w-60 relative flex justify-center items-center">
				<span className="text-gray-500 font-semibold">
					Nächste
					<br />
					Station
				</span>
			</div>
			<div className="flex relative grow h-full items-center">
				<span className="text-8xl font-bold overflow-hidden text-black">
					{stations[currentStationIndex]}
				</span>
			</div>
			{stopRequested && <StopIndicator />}
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
