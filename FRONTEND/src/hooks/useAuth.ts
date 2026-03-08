import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/services/auth.service";

export const useAuth = () => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
    enabled: !!token,
  });

  const user = data || (storedUser ? JSON.parse(storedUser) : null);

  return { user, isLoading };
};