import React from "react";

export function StartingStop() {
	return (
		<div className="flex flex-row h-full max-h-80 items-center bg-white">
			<Line />
			<Message
				title="Willkommen"
				message={
					<>
						Vielen Dank für die Fahrt mit der Westfalenbus.
						<br />
						Wir wünschen Ihnen eine angenehme Reise.
					</>
				}
			/>
		</div>
	);
}

export function TerminatingStop() {
	return (
		<div className="flex flex-row h-full max-h-80 items-center bg-[#dfdfdf]">
			<Line />
			<Message
				title="Dieser Bus endet hier"
				message={
					<>
						Wir bitten alle Fahrgäste auszusteigen.
						<br /> Vielen Dank für die Reise mit DB Regio
						Westfalenbus.
					</>
				}
			/>
		</div>
	);
}

function Message({
	title,
	message,
}: {
	title: string;
	message: React.ReactNode;
}) {
	return (
		<div className="w-full">
			<h1 className="text-4xl py-4 font-bold text-black">{title}</h1>
			<p className="text-2xl font-semibold text-gray-700 w-1/2">
				{message}
			</p>
		</div>
	);
}

function Line() {
	return (
		<div className="h-full w-60 relative shrink-0">
			<div className="absolute h-full left-1/2 w-6 -translate-x-1/2 bottom-0 bg-red-600 mx-auto"></div>
		</div>
	);
}
