import axios from "axios";
import {  useEffect, useState } from "react";
import Navbar from "./Navbar";
import { TypewriterEffect } from "./ui/typewriter-effect";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { profileEmailAtom, wordsAtom } from "@/context";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate()
  const words = useRecoilValue(wordsAtom);
  const setProfileEmail = useSetRecoilState(profileEmailAtom);

  useEffect(() => {
    axios
      .get("http://localhost:3000/verify", { withCredentials: true })
      .then((res) => {
        setUser(res.data.message);
      })
      .catch(() => {
        setUser(null)});

      axios.get("http://localhost:3000/programs")
          .then((res)=>{
               console.log(res.data)
          })
  }, []);
 
  useEffect(()=>{
      if(user){
           setProfileEmail(user.email? user.email : user.emails[0].value)
      }
  },[user]);

   function handle_logout(){
      axios.post("http://localhost:3000/logout",{},{withCredentials: true}).then((res)=>{
            toast.success(res.data.message)
            setProfileEmail("")
      });
      
  }
  return (
    <div className="bg-zinc-900 text-white h-screen">
      <Navbar log_out_click={handle_logout}/>

      <TypewriterEffect words={words} className="mt-10" />

      <div className="flex justify-center mt-10">
        <table className="w-full max-w-4xl border-collapse text-left text-sm">
          <thead className="text-gray-400 uppercase border-b border-gray-600">
            <tr>
              <th className="p-3">STATUS</th>
              <th className="p-3">TITLE</th>
              <th className="p-3">DIFFICULTY</th>
              <th className="p-3">CATEGORY</th>
              <th className="p-3">SOLUTION</th>
            </tr>
          </thead>
          <tbody className="text-white">
            <tr className="odd:bg-zinc-800 even:bg-zinc-700">
              <td className="p-3"></td>
              <td className="p-3 programHover">1. Two Sum</td>
              <td className="p-3 text-green-400">Easy</td>
              <td className="p-3">Array</td>
              <td className="p-3">
                <svg className=" size-8"xmlns="http://www.w3.org/2000/svg"width="2500"height="1756"viewBox="5.368 13.434 53.9 37.855"id="youtube"><path fill="#FFF"d="M41.272 31.81c-4.942-2.641-9.674-5.069-14.511-7.604v15.165c5.09-2.767 10.455-5.301 14.532-7.561h-.021z"></path><path fill="#E8E0E0"d="M41.272 31.81c-4.942-2.641-14.511-7.604-14.511-7.604l12.758 8.575c.001 0-2.324 1.289 1.753-.971z"></path><path fill="#CD201F"d="M27.691 51.242c-10.265-.189-13.771-.359-15.926-.803-1.458-.295-2.725-.95-3.654-1.9-.718-.719-1.289-1.816-1.732-3.338-.38-1.268-.528-2.323-.739-4.9-.323-5.816-.4-10.571 0-15.884.33-2.934.49-6.417 2.682-8.449 1.035-.951 2.239-1.563 3.591-1.816 2.112-.401 11.11-.718 20.425-.718 9.294 0 18.312.317 20.426.718 1.689.317 3.273 1.267 4.203 2.492 2 3.146 2.035 7.058 2.238 10.118.084 1.458.084 9.737 0 11.195-.316 4.836-.57 6.547-1.288 8.321-.444 1.12-.823 1.711-1.479 2.366a7.085 7.085 0 0 1-3.76 1.922c-8.883.668-16.426.813-24.987.676zM41.294 31.81c-4.942-2.641-9.674-5.09-14.511-7.625v15.166c5.09-2.767 10.456-5.302 14.532-7.562l-.021.021z"></path></svg>
              </td>
            </tr>

            <tr className="odd:bg-zinc-800 even:bg-zinc-700">
              <td className="p-3"></td>
              <td className="p-3 programHover">2. Reverse Linked List</td>
              <td className="p-3 text-red-500">Hard</td>
              <td className="p-3">Linked List</td>
              <td className="p-3 text-gray-400">
                <svg className=" size-8"xmlns="http://www.w3.org/2000/svg"width="2500"height="1756"viewBox="5.368 13.434 53.9 37.855"id="youtube"><path fill="#FFF"d="M41.272 31.81c-4.942-2.641-9.674-5.069-14.511-7.604v15.165c5.09-2.767 10.455-5.301 14.532-7.561h-.021z"></path><path fill="#E8E0E0"d="M41.272 31.81c-4.942-2.641-14.511-7.604-14.511-7.604l12.758 8.575c.001 0-2.324 1.289 1.753-.971z"></path><path fill="#CD201F"d="M27.691 51.242c-10.265-.189-13.771-.359-15.926-.803-1.458-.295-2.725-.95-3.654-1.9-.718-.719-1.289-1.816-1.732-3.338-.38-1.268-.528-2.323-.739-4.9-.323-5.816-.4-10.571 0-15.884.33-2.934.49-6.417 2.682-8.449 1.035-.951 2.239-1.563 3.591-1.816 2.112-.401 11.11-.718 20.425-.718 9.294 0 18.312.317 20.426.718 1.689.317 3.273 1.267 4.203 2.492 2 3.146 2.035 7.058 2.238 10.118.084 1.458.084 9.737 0 11.195-.316 4.836-.57 6.547-1.288 8.321-.444 1.12-.823 1.711-1.479 2.366a7.085 7.085 0 0 1-3.76 1.922c-8.883.668-16.426.813-24.987.676zM41.294 31.81c-4.942-2.641-9.674-5.09-14.511-7.625v15.166c5.09-2.767 10.456-5.302 14.532-7.562l-.021.021z"></path></svg>
              </td>
            </tr>

            <tr className="odd:bg-zinc-800 even:bg-zinc-700">
              <td className="p-3"></td>
              <td className="p-3 programHover">3. Jump Game</td>
              <td className="p-3 text-yellow-400">Medium</td>
              <td className="p-3">Dynamic Programming</td>
              <td className="p-3">
                <svg className=" size-8"xmlns="http://www.w3.org/2000/svg"width="2500"height="1756"viewBox="5.368 13.434 53.9 37.855"id="youtube"><path fill="#FFF"d="M41.272 31.81c-4.942-2.641-9.674-5.069-14.511-7.604v15.165c5.09-2.767 10.455-5.301 14.532-7.561h-.021z"></path><path fill="#E8E0E0"d="M41.272 31.81c-4.942-2.641-14.511-7.604-14.511-7.604l12.758 8.575c.001 0-2.324 1.289 1.753-.971z"></path><path fill="#CD201F"d="M27.691 51.242c-10.265-.189-13.771-.359-15.926-.803-1.458-.295-2.725-.95-3.654-1.9-.718-.719-1.289-1.816-1.732-3.338-.38-1.268-.528-2.323-.739-4.9-.323-5.816-.4-10.571 0-15.884.33-2.934.49-6.417 2.682-8.449 1.035-.951 2.239-1.563 3.591-1.816 2.112-.401 11.11-.718 20.425-.718 9.294 0 18.312.317 20.426.718 1.689.317 3.273 1.267 4.203 2.492 2 3.146 2.035 7.058 2.238 10.118.084 1.458.084 9.737 0 11.195-.316 4.836-.57 6.547-1.288 8.321-.444 1.12-.823 1.711-1.479 2.366a7.085 7.085 0 0 1-3.76 1.922c-8.883.668-16.426.813-24.987.676zM41.294 31.81c-4.942-2.641-9.674-5.09-14.511-7.625v15.166c5.09-2.767 10.456-5.302 14.532-7.562l-.021.021z"></path></svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
