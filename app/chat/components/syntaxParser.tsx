'use client'
import hljs from 'highlight.js';

export default function syntaxparser(text: string) {

	const parts = text.split(/(```[\s\S]*?```)/g);
	const newSegments = parts.map((part) => {
		if (part.startsWith('```')) {
			let code = part.slice(3, -3);
			let language: string | undefined;
			if (code.includes('\n')) {
				const firstLine = code.slice(0, code.indexOf('\n'));
				code = code.slice(code.indexOf('\n') + 1);
				if (hljs.getLanguage(firstLine)) {
					language = firstLine;
				}
			}
			const highlightedCode = language ? hljs.highlight(code, { language }) : hljs.highlightAuto(code);
			return { type: highlightedCode.language, content: code }
		}
		return { type: 'text', content: part };
	})

	return (newSegments);
};
