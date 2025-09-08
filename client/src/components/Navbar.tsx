import { profileEmailAtom } from "@/context";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

type Props = {
   log_out_click: ()=>void,
}
export default function Navbar({ log_out_click}: Props) {
  const profileEmail = useRecoilValue(profileEmailAtom);
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-800 h-13 w-full flex justify-between items-center">
      <div className="ml-20">
        <img
          className="w-25"
          src="https://res.cloudinary.com/dcazlekl5/image/upload/v1757174750/logo-full_vkvbhy.png"
        />
      </div>

      <div className="mr-20">
        <div className="flex justify-center items-center text-amber-500">
          <button onClick={()=>navigate("/signup")} className="p-1 cursor-pointer mr-4 rounded-sm pl-3 pr-3 bg-neutral-700">
            Login
          </button>

         {/* Profile avatar with hover */}
          <div
            className="relative"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <img
              className="w-8 h-8 mr-4 cursor-pointer rounded-full"
              src="https://res.cloudinary.com/dcazlekl5/image/upload/v1757174737/avatar_hkcn7o.png"
              alt="profile"
            />

            {hover && (
              <div className="absolute right-0 mt-1 bg-neutral-700 text-white rounded-md shadow-lg p-2">
                <p className="px-3 py-2 hover:bg-neutral-600 cursor-pointer">
                  {profileEmail? profileEmail : "No login"}
                </p>
              </div>
            )}
          </div>

          {/* Logout button (optional if you keep it in hover menu) */}
          <button
            onClick={log_out_click}
            className="p-2 mr-4 rounded-sm bg-neutral-700"
          >
            <img
              className="w-4"
              src="https://res.cloudinary.com/dcazlekl5/image/upload/v1757210304/exit-svgrepo-com_2_zi4y53.png"
              alt="logout"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
