import sanitizeHtml from "sanitize-html";

const defaultOptions: sanitizeHtml.IOptions = {
	allowedTags: ["div", "span", "p", "img"],
	allowedAttributes: {
		"*": ["class", "style"],
		img: ["src"],
	},
	selfClosing: ["img"],
	allowedIframeHostnames: ["www.youtube.com"],
	parseStyleAttributes: true,
};

const sanitize = (
	dirty: string,
	options: sanitizeHtml.IOptions
): {
	__html: string | TrustedHTML;
} => ({
	__html: sanitizeHtml(dirty, { ...defaultOptions, ...options }),
});

export const Content = ({
	html,
	options = {},
}: {
	html: string;
	options?: sanitizeHtml.IOptions;
}) => {
	console.log("html:", sanitize(html, options));
	return (
		<div
			className="w-full h-full absolute top-0 left-0"
			dangerouslySetInnerHTML={sanitize(html, options)}
		/>
	);
};
