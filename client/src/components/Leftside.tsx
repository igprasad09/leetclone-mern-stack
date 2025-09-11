import { programInfoAtom } from "@/context"
import { useRecoilValue } from "recoil"

export default function Leftside() {
  const programInfo = useRecoilValue(programInfoAtom);

  if(!programInfo){
       return <div>Loading.....</div>
  }

  console.log(programInfo)

  return (
    <div className=" text-white">
          <div className="bg-zinc-900">
               <button className="text-sm bg-zinc-800 p-2 mt-2 rounded-t-sm">Description</button>
          </div>
          <div className="m-5">
               <p className="text-md font-semibold">{programInfo.title}</p>
               <span className="flex">
                    <button className="text-[12px] bg-slate-600 p-1 rounded-sm px-2 text-teal-500">{programInfo.difficulty}</button>
                    <button className="cursor-pointer"><svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="currentColor"
>
  <path d="M2 21h4V9H2v12zM22 9c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L12.17 1 6.59 6.59C6.21 6.95 6 7.45 6 8v11c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73V9z" />
</svg>
</button><svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="currentColor"
>
  <path d="M22 3H18v12h4V3zM2 15c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L11.83 23l5.59-5.59C17.79 17.05 18 16.55 18 16V5c0-1.1-.9-2-2-2H7C6.17 3 5.46 3.5 5.16 4.22L2.14 11.27c-.09.23-.14.47-.14.73V15z" />
</svg>

               </span>
          </div>
    </div>
  )
}
