import { useContext } from "react";
import "./App.css";
import { IbisDataProvider } from "./provder/ibis/Ibis";
import { ScreenContext, ScreenProvider } from "./provder/Screen";
import MapView from "./views/Map";
import Upcoming from "./views/Upcoming";
import { DevOverlay } from "./views/DevOverlay";
import MediaView from "./views/Media";

function App() {
	return (
		<IbisDataProvider>
			<ScreenProvider>
				<Screens />
				<DevOverlay />
			</ScreenProvider>
		</IbisDataProvider>
	);
}

function Screens() {
	const screen = useContext(ScreenContext);
	return (
		<>
			<Upcoming hidden={screen.screen !== "stations"} />
			<MapView
				hidden={
					["map", "mapview", "map-fullRoute"].indexOf(screen.screen) === -1
				}
			/>
			<MediaView hidden={screen.screen !== "media"} />
		</>
	);
}

export default App;
