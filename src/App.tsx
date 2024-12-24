import { useContext } from "react";
import "./App.css";
import { IbisDataProvider } from "./provder/Ibis";
import { ScreenContext, ScreenProvider } from "./provder/Screen";
import MapView from "./views/Map";
import Upcoming from "./views/Upcoming";
import { DevOverlay } from "./views/DevOverlay";
import ImageView from "./views/Image";
import NewsView from "./views/News";
import VideoView from "./views/Video";

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
				hidden={screen.screen !== "map" && screen.screen !== "mapview"}
			/>
			<ImageView hidden={screen.screen !== "image"} />
			<VideoView hidden={screen.screen !== "video"} />
			<NewsView hidden={screen.screen !== "news"} />
		</>
	);
}

export default App;
