import { useContext } from "react";
import Top from "../components/Top";
import BottomLarge from "../upcoming/BottomLarge";
import { StartingStop, TerminatingStop } from "../upcoming/Messages";
import { UpcomingStops } from "../upcoming/UpcomingStops";
import { IbisContext } from "../provder/ibis/Ibis";

export default function Upcoming({ hidden }: { hidden: boolean }) {
	if (hidden) {
		return <></>;
	}

	const { TripInformation, CurrentStopIndex } = useContext(IbisContext);
	const remainingStops = TripInformation.StopSequence.StopPoints.slice(
		CurrentStopIndex.Value + 1
	);
	const finalStop =
		CurrentStopIndex.Value ===
		TripInformation.StopSequence.StopPoints.length - 1;
	const firstStop = CurrentStopIndex.Value === 0;
	return (
		<div className="h-full flex flex-col top-0 left-0 right-0 bottom-0 absolute">
			<Top />
			{!finalStop && <UpcomingStops stops={remainingStops} />}
			{finalStop && <Spacer />}
			{!firstStop && <BottomLarge hidetop={finalStop} />}
			{finalStop && <TerminatingStop />}
			{firstStop && <StartingStop />}
		</div>
	);
}

function Spacer() {
	return <div className="h-full w-full bg-primary"></div>;
}
