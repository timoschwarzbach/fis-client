import React from "react";

export function StartingStop() {
	return (
		<div className="flex flex-row h-full max-h-80 items-center bg-white">
			<Line />
			<Message
				title={<span className="">Willkommen</span>}
				message={
					<span className="">
						Vielen Dank für die Fahrt mit der Westfalenbus.
						<br />
						Wir wünschen Ihnen eine angenehme Reise.
					</span>
				}
			/>
		</div>
	);
}

export function TerminatingStop() {
	return (
		<div className="flex flex-row h-full max-h-80 items-center bg-primary">
			<Line />
			<Message
				title={
					<span className="text-white">Dieser Bus endet hier</span>
				}
				message={
					<span className="text-gray-300">
						Wir bitten alle Fahrgäste auszusteigen.
						<br /> Vielen Dank für die Reise mit DB Regio
						Westfalenbus.
					</span>
				}
			/>
		</div>
	);
}

function Message({
	title,
	message,
}: {
	title: React.ReactNode;
	message: React.ReactNode;
}) {
	return (
		<div className="w-full">
			<h1 className="text-5xl py-4 font-bold text-black">{title}</h1>
			<p className="text-3xl text-slate-800">{message}</p>
		</div>
	);
}

function Line() {
	return (
		<div className="h-full w-60 relative shrink-0">
			<div className="absolute h-full left-1/2 w-5 -translate-x-1/2 bottom-0 bg-red-600 mx-auto"></div>
		</div>
	);
}
