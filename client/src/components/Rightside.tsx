import { languageAtom, programInfoAtom, textsizeAtom } from "@/context";
import { useRecoilValue } from "recoil";
import CustomizedMenus from "./ui/LanguageMenuBtn";
import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { AlertDialogDemo } from "./ui/SettingDailog";
import axios from "axios";

export default function Rightside() {
  const programInfo = useRecoilValue(programInfoAtom);
  const [code, setCode] = useState("// write your code here");
  const [temp, setTemp] = useState(0);
  const textSize = useRecoilValue(textsizeAtom);
  const language = useRecoilValue(languageAtom);

  // ✅ always call hooks at top
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [topHeight, setTopHeight] = useState(200);
  const dividerHeight = 6;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const startY = e.clientY;
    const startHeight = topHeight;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!containerRef.current) return;
      const offsetY = moveEvent.clientY - startY;
      setTopHeight(startHeight + offsetY);
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "default";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.style.cursor = "row-resize";
  };

   useEffect(() => {
  if (!programInfo) return;

  if (language === "python") {
    setCode(programInfo.starterCode.python);
  } else if (language === "c") {
    setCode(programInfo.starterCode.cpp);
  } else {
    setCode(programInfo.starterCode.javascript);
  }
}, [language, programInfo]);
  
  function handle_test(index: number){
       setTemp(index)
  }

 const toggleFullScreen = () => {
    const doc = document as any; // for vendor-prefixed props
    const docEl = document.documentElement as any;

    // If already in fullscreen → exit
    if (
      doc.fullscreenElement ||
      doc.mozFullScreenElement ||
      doc.webkitFullscreenElement ||
      doc.msFullscreenElement
    ) {
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    } else {
      // Not in fullscreen → request
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
      } else if (docEl.mozRequestFullScreen) {
        docEl.mozRequestFullScreen();
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      } else if (docEl.msRequestFullscreen) {
        docEl.msRequestFullscreen();
      }
    }
  };
  
  async function handle_code_execute() {
         const response = await axios.post("http://localhost:3000/programs/programexicute", 
             {code, language, testCases: programInfo.testCases})
         console.log(response.data)
  }
 
  // ✅ do conditional rendering AFTER hooks
  if (!programInfo) return <div>Loading...</div>;
  return (
    <div className="">
      <div className="bg-zinc-900 flex items-center justify-between text-black">
         <div className="flex items-center">
            <CustomizedMenus />
        <button onClick={handle_code_execute} className="bg-neutral-800 cursor-pointer ml-3 p-1 rounded-sm">
          <svg
            className="w-[28px] h-[28px] text-gray-300 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button className="text-green-500 bg-neutral-800 p-1.5 ml-3 rounded-sm cursor-pointer flex font-semibold justify-center"><svg className="text-green-500 mr-1 w-[23px] h-[23px] dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01"/></svg>
        Submit</button>
         </div>
         <div className="flex items-center">
             <AlertDialogDemo><svg className="w-[23px] cursor-pointer h-[23px] text-neutral-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2" d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg></AlertDialogDemo>
             <svg onClick={toggleFullScreen} className="w-[23px] cursor-pointer ml-2 mr-2 h-[23px] text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm16 7H4v7h16v-7ZM5 8a1 1 0 0 1 1-1h.01a1 1 0 0 1 0 2H6a1 1 0 0 1-1-1Zm4-1a1 1 0 0 0 0 2h.01a1 1 0 0 0 0-2H9Zm2 1a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1Z" clip-rule="evenodd"/></svg>
         </div>
      </div>

      <div ref={containerRef} className="h-screen flex flex-col">
        {/* Top Div */}
        <div
  className="bg-neutral-800 overflow-auto z-0"
  style={{ height: `${topHeight}px` }}
>
  <Editor
    height="100%" // ✅ fill parent
    language={language === "C" ? "cpp" : language.toLowerCase()}
    value={code}
    theme="vs-dark"
    onChange={(value) => setCode(value || "")}
    options={{
       fontSize: textSize
    }}
  />
</div>


        {/* Divider */}
        <div
          onMouseDown={handleMouseDown}
          className="bg-zinc-600 hover:bg-gray-500 cursor-row-resize"
          style={{ height: `${dividerHeight}px` }}
        />

        {/* Bottom Div */}
        <div className="bg-zinc-800 flex-1 overflow-auto">
            <h1 className=" underline m-4 font-semibold">Testcases</h1>
            <div className="flex">
                {programInfo.testCases.map((_: string, index: number)=>(
                  <button key={index} onClick={()=>handle_test(index)} className="bg-neutral-700 cursor-pointer font-semibold px-3 ml-3 rounded-sm py-1">Case {index+1}</button>
                ))} 
            </div>
            <p className="ml-4 mt-4 font-bold font-mono">Input:</p>
            <div className="ml-4 bg-neutral-700 rounded-sm mr-4 p-2 font-semibold">{programInfo.testCases[temp].input}</div>
            <p className="ml-4 mt-4 font-semibold font-mono">Expected Output:</p>
            <div className="ml-4 bg-neutral-700 rounded-sm mr-4 p-2 font-semibold">{programInfo.testCases[temp].expectedOutput}</div>
        </div>
      </div>
    </div>
  );
}
