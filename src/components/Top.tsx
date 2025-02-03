import { useEffect, useState } from "react";

export default function Top() {
	return (
		<div className="h-20 shrink-0 flex items-center justify-between px-8 bg-primary text-white transition-colors">
			<span className="text-5xl">
				<span className="font-extrabold">S75</span>
				<span className="pl-8">Münster Hauptbahnhof</span>
			</span>
			<Time />
		</div>
	);
}

function Time() {
	const [time, setTime] = useState(new Date());
	const [semi, setSemi] = useState(true);
	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);
		const semiInterval = setInterval(() => {
			setSemi((prev) => !prev);
		}, 2000);
		return () => {
			clearInterval(interval);
			clearInterval(semiInterval);
		};
	}, []);

	return (
		<span className="text-5xl">
			{time.getHours().toString().padStart(2, "0")}
			<span className="font-mono -mx-1">{semi ? ":" : " "}</span>
			{time.getMinutes().toString().padStart(2, "0")}
		</span>
	);
}
