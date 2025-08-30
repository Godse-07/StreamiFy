import { useQuery } from '@tanstack/react-query';
import { getAuthUser } from '../lib/api';


const useAuthUser = () => {
    const authUser = useQuery({
        queryKey: ["authUser"],
        queryFn: getAuthUser,
        retry: false,
    });
    console.log("Auth User Data:", authUser.data);
    return {isLoading: authUser.isLoading, authUser: authUser.data?.user}
}

export default useAuthUser
