export function NextStationText({ name }: { name: string }) {
	return (
		<div className="flex relative grow h-full items-center">
			<span className="absolute top-2 left-1 text-primary font-bold text-2xl">
				Nächste Station
			</span>
			<span className="text-8xl font-bold text-black">{name}</span>
		</div>
	);
}
