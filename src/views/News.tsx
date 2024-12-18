import { useContext } from "react";
import Top from "../components/Top";
import Bottom from "../components/bottom/Bottom";
import { MediaContainer } from "../media/Media";
import { ScreenContext } from "../provder/Screen";

export default function NewsView({ hidden }: { hidden: boolean }) {
	if (hidden) {
		return <></>;
	}

	return (
		<div className="flex flex-col top-0 left-0 right-0 bottom-0 absolute">
			<Top />
			<News />
			<Bottom />
		</div>
	);
}

type news = {
	topline: string;
	headline: string;
	image: string;
	badge: string;
}

function News() {
	const { data } = useContext(ScreenContext) as {data:news};
	return (
		<MediaContainer>
		<img
				className="h-full absolute bg-white object-cover"
				src={data.image}
			/>
			<div className="h-full w-full absolute flex flex-col">
				<div className="h-full flex flex-[3] bg-transparent p-8">
					{data.badge && <img className="h-14" src={data.badge} />}
				</div>
				<div className="h-20 from-transparent to-black/60 flex-1 bg-gradient-to-b"></div>
				<div className="bg-black/60 flex flex-col p-8 gap-4">
					<span className="text-3xl">{data.topline}</span>
					<span className="text-5xl font-bold">{data.headline}</span>
				</div>
			</div>
		</MediaContainer>
	)
}
