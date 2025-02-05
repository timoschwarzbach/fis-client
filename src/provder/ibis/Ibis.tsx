import { createContext, useEffect, useState } from "react";
import { CustomerInformationData } from "./CustomerInformationService";
import { useSocket } from "../../hooks/useSocket";

const defaultIbisContext: CustomerInformationData = {
	TimeStamp: { Value: "" },
	VehicleRef: { Value: "" },
	DefaultLanguage: { Value: "" },
	TripInformation: {
		TripRef: { Value: "" },
		StopSequence: {
			StopPoints: [],
		},
		LocationState: "",
		TimetableDelay: { Value: "" },
	},
	CurrentStopIndex: { Value: 0 },
	RouteDeviation: "",
	DoorState: "",
	VehicleStopRequested: { Value: false },
	ExitSide: "",
	MovingDirectionForward: { Value: true },
	VehicleMode: "",
	SpeakerActive: { Value: false },
	StopInformationActive: { Value: true },
};

export const IbisContext =
	createContext<CustomerInformationData>(defaultIbisContext);

export function IbisDataProvider({ children }: { children: React.ReactNode }) {
	const [data, setData] =
		useState<CustomerInformationData>(defaultIbisContext);

	const socket = useSocket("ws://localhost:3000", {
		reconnectionAttempts: 5,
		reconnectionDelay: 1000,
		autoConnect: false,
	});

	useEffect(() => {
		socket.connect();

		function handleIbisData(data: CustomerInformationData) {
			setData(data);
		}
		socket.on("ibis", handleIbisData);

		return () => {
			socket.off("ibis", handleIbisData);
			socket.disconnect();
		};
	}, []);

	return <IbisContext.Provider value={data}>{children}</IbisContext.Provider>;
}
