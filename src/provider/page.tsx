import { useJwt } from "react-jwt";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Provider() {
  const { push } = useRouter();

  const token = localStorage.getItem("token");
  if (token) {
    push("/login");
  }

  const { decodedToken, isExpired } = useJwt(token as string);

  if (isExpired) {
    push("/login");
  }
}
