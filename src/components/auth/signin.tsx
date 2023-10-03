import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Eye, EyeOff, Linkedin } from "lucide-react";
import { useState } from "react";
import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/divider";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  goBack: () => void;
};

export default function SignIn({ goBack }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const signinDisabled = () => !email || !password;

  const signin = () => {
    if (signinDisabled()) return;
    setIsLoading(true);
    setError("");
    signIn("credentials", {
      redirect: false,
      email,
      password,
    })
      .then((response) => {
        if (response?.error) {
          setError(response.error);
          setIsLoading(false);
        } else {
          router.push("/dashboard");
        }
      })
      .catch(() => {
        setError("Unexpected server error.");
        setIsLoading(false);
      });
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div>
      <div>
        <h1 className="text-5xl font-bold mb-4 mt-8">Welcome back!</h1>
        <p className="mb-10 max-w-md mx-auto">
          Simplify hiring with [COMPANY]. Streamline, collaborate, and make
          smarter choices. Get started now.
        </p>
        {!!error && <p className="text-danger mb-2 text-sm">{error}</p>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signin();
          }}
        >
          <Input
            type="email"
            variant="bordered"
            label="Email"
            className="mb-2"
            value={email}
            onValueChange={setEmail}
          />
          <Input
            type={isVisible ? "text" : "password"}
            label="Password"
            variant="bordered"
            value={password}
            onValueChange={setPassword}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <Eye className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            className="mb-4"
          />

          <div className="text-right mb-4">
            <Link size="sm" color="foreground" href="#">
              Forgot Password?
            </Link>
          </div>
          <Button
            color="primary"
            className="w-full"
            onClick={signin}
            isLoading={isLoading}
            isDisabled={signinDisabled()}
            type="submit"
          >
            Login
          </Button>
        </form>
        <Divider className="my-12" />
        <div>
          <p className="text-sm mb-4">Or continue with</p>
          <Button>
            <Linkedin />
          </Button>
        </div>
      </div>
      <p className="mt-20">
        Not a member?{" "}
        <Link className="cursor-pointer" onClick={goBack}>
          Register now
        </Link>
      </p>
    </div>
  );
}
