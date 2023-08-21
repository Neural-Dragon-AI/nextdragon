
import React from 'react';

import syntaxparser from './syntaxparser'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';



type UserMessageProps = {
	content: string

	index: number;
}

type BabyDragonMessageProps = {


	content: string,
	status: string,
	elapsed_time: number;
	index: number;

}


export const UserMessage: React.FC<UserMessageProps> = ({ content, index }) => (
	<div key={index} className=' rounded-md my-2 font-proxima font-medium p-2 text-gray-400    '>
		<p className="w-full break-all rounded-md">{content}</p>
	</div>
);


export const BabyDragonMessage: React.FC<BabyDragonMessageProps> = ({ content, status, index, elapsed_time }) => {
	if (status == 'typing') {

		return <>
			<div key={index} className='flex  h-16  w-[98%] mx-3 rounded-md font-proxima font-medium p-2'>



				<button className=" mr-[80%] font-proxima font-bold text-sm top-4 ">Cancel</button>
				<img src="dragon.svg" width={36} height={36} className=" self-center animate-runningDragon " />
				{/* <div className="flex flex-row text-sm font-bold mr-4  "> */}
				{/* 	It's typing */}
				{/* 	<p className="animate-blink self-baseline font-bold opacity-0" >.</p> */}
				{/* 	<p className="animate-blink animation-delay-100  opacity-0" >.</p> */}
				{/* 	<p className="animate-blink   animation-delay-200 font-bold opacity-0">.</p> */}
				{/* </div> */}
			</div>
			<div className="w-full bg-transparent h-4" />

		</>
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
		return <>
			<div
				key={index}

				className='flex font-proxima font-medium p-2 text-emerald-600  '>

				<div className="m-1 h-fit w-full rounded-md p-2    flex flex-col space-y-4 ">
					{syntaxparser(content).map((segment, index) => (
						segment.type != 'text' ?
							<section key={index} className="relative w-full text-black">



								<div className="w-full h-fit bg-gray-600  rounded-t-md ring-1 ring-black flex flex-row justify-between ">

									<a className="text-xs self-center ml-3 bg-black/[.9] py-0.5 px-1 my-0.5 rounded-md text-white">{segment.type}</a>

									<div className="flex flex-row  bg-black/[.9] rounded-md text-white mr-3 px-1  py-0.5 my-0.5">


										<svg viewBox="0 0 24 24" stroke-width="1.5" className="self-center stroke-current w-4 fill-gray-700 ">
											<path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
										</svg>

										<button className="text-xs self-center " onClick={() => navigator.clipboard.writeText(segment.content)}>Copy</button>

									</div>
								</div>


								<div className=" rounded-b-md p-1  text-sm border-l-white border-l-[1px]">
									<SyntaxHighlighter
										key={index}
										language={segment.type}
										style={atomOneDark}
										customStyle={{  maxWidth: "50vw" }}>
										{segment.content}
									</SyntaxHighlighter>
								</div>

							</section>
							:
							<div key={index} className="mx-2">{segment.content}</div>
					))}

				</div>
				<p className="self-end p-2 text-black">[{Math.round(elapsed_time)}&nbsp;s]</p>

			</div>
			<div className="w-full bg-transparent h-4" />
		</>
	}

}

