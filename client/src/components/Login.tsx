import { Spotlight } from "@/components/ui/spotlight";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/cart";
import { useRecoilState } from "recoil";
import { userAtom } from "@/context";
import axios from "axios";

export default function Login() {
  const [user, setUser] = useRecoilState(userAtom);

  // 🔹 Email/Password Login
  async function handle_login() {
    if (!user.email || !user.password) {
      return alert("Input is required!");
    }
    try {
      const res = await axios.post("http://localhost:3000/login", user, {
        withCredentials: true,
      });
      console.log("Normal Login:", res.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="h-[40rem] w-full flex md:items-center md:justify-center bg-black/[0.96] relative overflow-hidden">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

      <Card className="w-full max-w-sm bg-black text-white">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login</CardDescription>
          <CardAction>
            <Button variant="link" className="underline cursor-pointer">
              Sign Up
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) =>
                    setUser({ ...user, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="ml-auto text-sm underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button onClick={handle_login} className="w-full">
            Login
          </Button>
          <Button onClick={() => window.location.href = "http://localhost:3000/google"} className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
