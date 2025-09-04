import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/verify", { withCredentials: true })
      .then((res) => {setUser(res.data.message); console.log(res.data)})
      .catch(() => setUser(null));
      
  }, []);

  return (
    <div>
      {user ? (
        <>
           <h1>Welcome {user.email ? user.email : user.displayName} </h1>
        </>
      ) : (
        <h1>You are not logged in</h1>
      )}
    </div>
  );
}
