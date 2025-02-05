import { useContext } from "react";
import { IbisContext } from "../provder/ibis/Ibis";

export function StopWave() {
	const { VehicleStopRequested } = useContext(IbisContext);
	return (
		<div className="top-0 left-0 h-full w-full relative overflow-hidden">
			<div
				data-stop={VehicleStopRequested}
				className="w-10 h-10 aspect-square data-[stop=true]:w-full data-[stop=true]:opacity-0 rounded-full duration-1000 blur-lg ease-in transition-all bg-red-800/90"
			/>
		</div>
	);
}
