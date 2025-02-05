import { useContext, useEffect, useState } from "react";
import { IbisContext } from "../provder/ibis/Ibis";
import { ScreenContext } from "../provder/Screen";

export function DevOverlay() {
	const screenCtx = useContext(ScreenContext);
	const ibisCtx = useContext(IbisContext);

	const [hidden, setHidden] = useState(true);
	useEffect(() => {
		const handleEsc = (event: any) => {
			if (event.key === " ") {
				setHidden((hidden) => !hidden);
			}
		};
		window.addEventListener("keydown", handleEsc);

		return () => {
			window.removeEventListener("keydown", handleEsc);
		};
	}, []);

	return (
		<div className="absolute" hidden={hidden}>
			<div className="bg-black text-white bg-opacity-50 p-2 flex flex-col gap-2">
				<div>
					<h1>Dev overlay</h1>
				</div>
				<div>
					<h2>Screen Context</h2>
					<p>screen: {screenCtx.screen}</p>
					<p>data: {JSON.stringify(screenCtx.data)}</p>
				</div>
				<div>
					<h2>Ibis Context</h2>
					<p>
						i: {ibisCtx.CurrentStopIndex.Value}, stop:{" "}
						{ibisCtx.VehicleStopRequested.Value && "yes"}
					</p>
				</div>
			</div>
		</div>
	);
}
