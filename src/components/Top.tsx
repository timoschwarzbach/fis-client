import { useContext } from "react";
import { IbisContext } from "../provder/Ibis";

export default function Top() {
	const {stopRequested} = useContext(IbisContext)
	return (
		<div data-stop={stopRequested} className="h-20 shrink-0 flex items-center justify-between px-8 bg-primary data-[stop=true]:bg-red-600 text-white transition-colors">
			<span className="font-bold text-5xl">S75 Münster Hauptbahnhof</span>
			<span className="font-bold text-5xl">13:37</span>
		</div>
	);
}
