import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../lib/api";
import { toast } from "react-hot-toast";

const useSignup = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data) => signUp(data),
    onSuccess: () => {
      toast.success("Account created successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  return { signupMutation: mutate, isPending, error };
};

export default useSignup;
