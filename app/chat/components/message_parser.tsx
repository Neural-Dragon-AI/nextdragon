'use client'
import React from 'react';

import syntaxparser from './syntaxparser'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';


type UserMessageProps = {
	content: string

	index: number;
}

type BabyDragonMessageProps = {


	content: string,
	status: string,

	index: number;

}


export const UserMessage: React.FC<UserMessageProps> = ({ content, index }) => (
	<div key={index} className=' rounded-md  font-proxima font-medium p-2 text-gray-400'>
		<p className="w-full break-all ">{content}</p>
		<div className="w-full bg-transparent h-2" />
	</div>
);


export const BabyDragonMessage: React.FC<BabyDragonMessageProps> = ({ content, status, index }) => {
	if (status == 'typing') {

		return <div key={index} className='flex  h-16  w-[98%] mx-3 rounded-md font-proxima font-medium p-2'>
			<button className=" mr-[80%] font-proxima font-bold text-sm top-4 ">Cancel</button>
			<img src="dragon.svg" width={36} height={36} className=" self-center animate-runningDragon " />
			{/* <div className="flex flex-row text-sm font-bold mr-4  "> */}
			{/* 	It's typing */}
			{/* 	<p className="animate-blink self-baseline font-bold opacity-0" >.</p> */}
			{/* 	<p className="animate-blink animation-delay-100  opacity-0" >.</p> */}
			{/* 	<p className="animate-blink   animation-delay-200 font-bold opacity-0">.</p> */}
			{/* </div> */}
			<div className="w-full bg-transparent h-4" />
		</div>

	}
	else if (status == 'error') {
		return <div key={index} className='h-fit font-sans text-md   px-14 w-full  '>
			<div className="relative flex flex-col space-y-2">
				<div className="flex flex-row space-x-2">
					<img src="dragon.svg" width={30} height={30} className="ml-4 mt-2 rotate-90 self-start -hue-rotate-90" />
					<button className=" absolute right-0 font-proxima font-bold text-sm top-3 "> Dismiss</button>
					<p className="m-1  w-full rounded-md p-2 text-red-500">*BURPS in ancient language*</p>
				</div>

				<div className="text-red-500 truncate">{content}</div>
			</div>
			<div className="w-full bg-transparent h-4" />
		</div >
	}
	else {
		return <div
			key={index}
			className='flex font-proxima font-medium p-2'>

			<div className="h-fit w-full rounded-md     flex flex-col space-y-4 ">
				{syntaxparser(content).map((segment, index) => (
					segment.type != 'text' ?
						<section key={index} className="relative w-full border-2 border-gray-600 rounded-md pt-1 bg-gray-600/[.2]">



							<div className="w-full h-fit rounded-t-md  flex flex-row justify-between ">

								<a className="text-xs self-center ml-3 bg-white/[.2] py-0.5 px-1 my-0.5 rounded-md text-gray-300">{segment.type}</a>





								<button className="text-xs  flex flex-row px-1  py-0.5 my-0.5  bg-white/[.2] rounded-md text-gray-300 hover:bg-white/[.1] mr-3" onClick={() => navigator.clipboard.writeText(segment.content)}>

									<svg viewBox="0 0 24 24" strokeWidth="1.5" className="self-center stroke-current w-4 fill-gray-700 ">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
										/>
									</svg>

									<p className="self-center">Copy</p>
								</button>

							</div>


							<div className=" rounded-b-md p-2 text-sm ">

								<SyntaxHighlighter
									key={index}
									language={segment.type}
									style={vscDarkPlus}
									customStyle={{ background: "transparent", maxWidth: "60vw" }}
								>
									{segment.content}
								</SyntaxHighlighter>
								<div className="w-full bg-transparent h-2" />
							</div>

						</section>
						:
						<>
							<div key={index}>
								<div className="text-emerald-600">{segment.content}</div>
								<div className="w-full bg-transparent h-2" />
							</div>
						</>
				))}

			</div>


		</div>

	}

}

