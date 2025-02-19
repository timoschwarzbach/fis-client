import { useContext } from "react";
import Top from "../components/Top";
import Bottom from "../components/bottom/Bottom";
import { MediaContainer } from "../media/Media";
import { ScreenContext } from "../provder/Screen";

export default function VideoView({ hidden }: { hidden: boolean }) {
	if (hidden) {
		return <></>;
	}

	return (
		<div className="flex flex-col top-0 left-0 right-0 bottom-0 absolute">
			<Top />
			<Video />
			<Bottom />
		</div>
	);
}

function Video() {
	const { data } = useContext(ScreenContext) as { data: string };
	return (
		<MediaContainer>
			<div className="h-full absolute w-full overflow-hidden">
				<video
					className="h-full w-full object-cover blur-3xl"
					autoPlay
					muted
					src={data}
					onError={(e) => {
						e.currentTarget.src =
							"/media/202308xx_Gleisanschluss-Neues-Werk-Cottbus.jpg";
						e.currentTarget.onerror = null;
					}}
				/>
			</div>
			<video
				className="h-full absolute left-0 right-0 mx-auto"
				autoPlay
				muted
				src={data}
				onError={(e) => {
					e.currentTarget.src =
						"/media/202308xx_Gleisanschluss-Neues-Werk-Cottbus.jpg";
					e.currentTarget.onerror = null;
				}}
			/>
		</MediaContainer>
	);
}
