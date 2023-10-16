import { useMutation } from "react-query";
import { signUpWithEmailAndPassword } from "../../api/authApi";

export function useSignUpWithEmailAndPassword() {
  return useMutation(
    ({
      email,
      password,
      username,
    }: {
      email: string;
      password: string;
      username: string;
    }) => signUpWithEmailAndPassword(email, password, username),
  );
}
