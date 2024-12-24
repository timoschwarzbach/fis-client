import { createContext, useEffect, useState } from "react";

type IbisData = {
	stations: string[];
	currentStationIndex: number;
	stopRequested: boolean;
};

export const IbisContext = createContext<IbisData>({
	stations: [],
	currentStationIndex: 0,
	stopRequested: false,
});

export function IbisDataProvider({ children }: { children: React.ReactNode }) {
	const [data, setData] = useState<IbisData>({
		stations: [
			"Bustreff",
			"Bahnhof",
			"Fachhochschule",
			"Ludgerusschule",
			"Hauptbahnhof",
			"Zentrum",
		],
		currentStationIndex: 0,
		stopRequested: false,
	});

	useEffect(() => {
		// increase the station index every second
		const interval = setInterval(() => {
			setData((data) => ({
				...data,
				currentStationIndex:
					(data.currentStationIndex + 1) % data.stations.length,
				stopRequested: false,
			}));
		}, 20000);

		// increase the stop request every 5 seconds
		const stopinterval = setInterval(() => {
			setData((data) => ({
				...data,
				stopRequested: true,
			}));
		}, 3333);

		return () => {
			clearInterval(interval);
			clearInterval(stopinterval);
		};
	}, []);

	return <IbisContext.Provider value={data}>{children}</IbisContext.Provider>;
}
