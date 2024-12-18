import { createContext, useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

type Screen = string;
type ScreenContextType = {
	screen: Screen;
	data?: any;
};

export const ScreenContext = createContext<ScreenContextType>({
	screen: "stations",
	data: undefined,
});

export function ScreenProvider({ children }: { children: React.ReactNode }) {
	const [data, setData] = useState<ScreenContextType>({
		screen: "stations",
		data: undefined,
	});

	const socket = useSocket("ws://localhost:3000", {
		reconnectionAttempts: 5,
		reconnectionDelay: 1000,
		autoConnect: false,
	});

	useEffect(() => {
		socket.connect();

		function handleScreen(screen: string, data: any) {
			setData({ screen, data });
		}
		socket.on("screen", handleScreen)

		return () => {
			socket.off("screen", handleScreen);
			socket.disconnect();

			// todo: move this to a socket.onDisconnect or similar
			// to not be stuck in an unwanted screen, default to stations
			setData({ screen: "stations", data: undefined });
		};
	}, []);

	return (
		<ScreenContext.Provider value={data}>{children}</ScreenContext.Provider>
	);
}
