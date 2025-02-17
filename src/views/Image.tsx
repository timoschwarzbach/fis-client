import { useContext } from "react";
import Top from "../components/Top";
import Bottom from "../components/bottom/Bottom";
import { MediaContainer } from "../media/Media";
import { ScreenContext } from "../provder/Screen";

export default function ImageView({ hidden }: { hidden: boolean }) {
	if (hidden) {
		return <></>;
	}

	return (
		<div className="flex flex-col top-0 left-0 right-0 bottom-0 absolute">
			<Top />
			<Image />
			<Bottom />
		</div>
	);
}

function Image() {
	const { data } = useContext(ScreenContext) as {data:string};
	return (
		<MediaContainer>
		<img
				className="h-full absolute"
				// style={{backgroundImage: `url(${data})`}}
				src={data}
				onError={(e) => {
					e.currentTarget.src = "/media/202308xx_Gleisanschluss-Neues-Werk-Cottbus.jpg";
					e.currentTarget.onerror = null;
				}}
			/>
		</MediaContainer>
	)
}
