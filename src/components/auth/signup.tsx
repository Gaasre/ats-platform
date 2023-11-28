import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@nextui-org/link";
import { signIn } from "next-auth/react";
import axios from "axios";

type Props = {
  email: string;
  name: string;
  company: string;
  invitationId: string;
  goBack: () => void;
};

export default function SignUp({ goBack, ...props }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setCompany(props.company);
    setName(props.name);
    setEmail(props.email);
  }, [props.email, props.name, props.company]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const signupDisabled = () => !email || !password || !name;

  const signup = async () => {
    setIsLoading(false);
    setError("");
    await axios
      .post("/api/signup", {
        email,
        name,
        password,
        invitationId: props.invitationId
      })
      .then((response) => {
        // Registration Success
        if (response.data.status === "success") {
          // Login
          signIn("credentials", {
            email,
            password,
            callbackUrl: "/dashboard",
          });
          setIsLoading(false);
        } else {
          setError(response.data.message);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <div>
        <h1 className="text-5xl font-bold mb-4 mt-8">Join [Company] now!</h1>
        <p className="mb-10 max-w-md mx-auto">
          Start your hiring journey. Sign up now to simplify your recruitment
          process. Get started now.
        </p>
        {!!error && <p className="text-danger mb-2 text-sm">{error}</p>}
        <Input
          isDisabled
          type="text"
          variant="bordered"
          label="Company"
          className="mb-2"
          value={company}
        />
        <Input
          type="text"
          variant="bordered"
          label="Name"
          className="mb-2"
          value={name}
          onValueChange={setName}
        />
        <Input
          isDisabled={!!company}
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
        <Button
          color="primary"
          className="w-full"
          onClick={signup}
          isDisabled={signupDisabled()}
          isLoading={isLoading}
        >
          Register
        </Button>
      </div>
      <p className="mt-20">
        Already a member?{" "}
        <Link className="cursor-pointer" onClick={goBack}>
          Login now
        </Link>
      </p>
    </div>
  );
}
