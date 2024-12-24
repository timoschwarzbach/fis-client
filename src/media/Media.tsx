export function MediaContainer(props: { children: React.ReactNode }) {
	return (
		<div className="h-full w-full flex bg-primary pb-2 pl-2">
			<div className="h-full relative aspect-video bg-gray-300">
				<div className="absolute top-0 left-0 right-0 bottom-0">
					{props.children}
				</div>
			</div>
		</div>
	);
}
