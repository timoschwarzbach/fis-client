import { useContext } from "react";
import "./App.css";
import { IbisDataProvider } from "./provder/ibis/Ibis";
import { ScreenContext, ScreenProvider } from "./provder/Screen";
import MapView from "./views/Map";
import Upcoming from "./views/Upcoming";
import { DevOverlay } from "./views/DevOverlay";
import ImageView from "./views/Image";
import NewsView from "./views/News";
import VideoView from "./views/Video";
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
				hidden={screen.screen !== "map" && screen.screen !== "mapview"}
			/>

			{/* deprecated start */}
			<ImageView hidden={screen.screen !== "image"} />
			<VideoView hidden={screen.screen !== "video"} />
			<NewsView hidden={screen.screen !== "news"} />
			{/* deprecated end */}

			<MediaView hidden={screen.screen !== "media"} />
		</>
	);
}

export default App;
