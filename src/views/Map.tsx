import Top from "../components/Top";
import Bottom from "../components/bottom/Bottom";
import Map from "../map/Map";

export default function MapView({ hidden }: { hidden: boolean }) {
	return (
		<div
			className="flex flex-col data-[hidden=true]:opacity-0 top-0 left-0 right-0 bottom-0 absolute"
			data-hidden={hidden}
		>
			<Top />
			<Map />
			<Bottom />
		</div>
	);
}
