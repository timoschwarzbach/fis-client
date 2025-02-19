import { useContext } from "react";
import Top from "../components/Top";
import Bottom from "../components/bottom/Bottom";
import { MediaContainer } from "../media/Media";
import { ScreenContext } from "../provder/Screen";

export default function MediaView({ hidden }: { hidden: boolean }) {
	if (hidden) {
		return <></>;
	}

	return (
		<div className="flex flex-col top-0 left-0 right-0 bottom-0 absolute">
			<Top />
			<Media />
			<Bottom />
		</div>
	);
}

type media = {
	type: "image" | "video";
	background: string;
	bottom: {
		visible: boolean;
		background: boolean;
		title: string;
		description: string;
	};
};
function Media() {
	const { data } = useContext(ScreenContext) as { data: media };
	return (
		<MediaContainer>
			{data.type === "image" && <Image url={data.background} />}
			{data.type === "video" && <Video url={data.background} />}
			{data.bottom.visible && <ContentLayer data={data} />}
		</MediaContainer>
	);
}

function Image({ url }: { url: string }) {
	return (
		<>
			<div className="h-full absolute w-full overflow-hidden">
				<img
					className="h-full w-full object-cover blur-3xl"
					src={url}
					onError={(e) => {
						e.currentTarget.src =
							"/media/202308xx_Gleisanschluss-Neues-Werk-Cottbus.jpg";
						e.currentTarget.onerror = null;
					}}
				/>
			</div>
			<img
				className="h-full absolute left-0 right-0 mx-auto"
				src={url}
				onError={(e) => {
					e.currentTarget.src =
						"/media/202308xx_Gleisanschluss-Neues-Werk-Cottbus.jpg";
					e.currentTarget.onerror = null;
				}}
			/>
		</>
	);
}

function Video({ url }: { url: string }) {
	return (
		<>
			<div className="h-full absolute w-full overflow-hidden">
				<video
					className="h-full w-full object-cover blur-3xl"
					autoPlay
					muted
					src={url}
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
				src={url}
				onError={(e) => {
					e.currentTarget.src =
						"/media/202308xx_Gleisanschluss-Neues-Werk-Cottbus.jpg";
					e.currentTarget.onerror = null;
				}}
			/>
		</>
	);
}

function ContentLayer({ data }: { data: media }) {
	return (
		<div className="size-full relative">
			{data.bottom.visible && data.bottom.background && (
				<div className="absolute size-full bg-gradient-to-b from-transparent from-50% to-black/90"></div>
			)}
			{data.bottom.visible && (
				<div className="absolute size-full flex flex-col justify-end p-8 gap-4">
					{data.bottom.title.trim() !== "" && (
						<span className="text-3xl">{data.bottom.title}</span>
					)}
					{data.bottom.description.trim() !== "" && (
						<span className="text-5xl font-bold">
							{data.bottom.description}
						</span>
					)}
				</div>
			)}
		</div>
	);
}
