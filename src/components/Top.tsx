import { useContext, useEffect, useState } from "react";
import { IbisContext } from "../provder/ibis/Ibis";

export default function Top() {
	const { TripInformation, CurrentStopIndex } = useContext(IbisContext);
	const displaycontent = TripInformation.StopSequence.StopPoints[
		CurrentStopIndex.Value
	]?.DisplayContents[0] ?? {
		Destination: {
			DestinationName: { Value: "No information" },
		},
		LineInformation: {
			LineNumber: { Value: "0" },
		},
	};
	return (
		<div className="h-20 shrink-0 flex items-center justify-between px-8 bg-primary text-white transition-colors">
			<span>
				<span className="text-5xl font-extrabold">
					{displaycontent.LineInformation.LineNumber.Value}
				</span>
				<span className="text-4xl pl-8">
					{displaycontent.Destination.DestinationName.Value}
				</span>
			</span>
			<Time />
		</div>
	);
}

function Time() {
	const [time, setTime] = useState(new Date());
	const [semi, setSemi] = useState(true);
	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);
		const semiInterval = setInterval(() => {
			setSemi((prev) => !prev);
		}, 2000);
		return () => {
			clearInterval(interval);
			clearInterval(semiInterval);
		};
	}, []);

	return (
		<span className="text-4xl">
			{time.getHours().toString().padStart(2, "0")}
			<span className="font-mono -mx-1">{semi ? ":" : " "}</span>
			{time.getMinutes().toString().padStart(2, "0")}
		</span>
	);
}
