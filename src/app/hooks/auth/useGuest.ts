import {useMutation, useQuery} from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";


export default function useGuest() {
    return useMutation({
        mutationFn: async () => {
            return axios.post("/api/auth/guest-login");
        },
        onSuccess: (res) => {
            toast.success('Login successfully');
        },
        onError: (err) => {
            const errorCode = err.response.status || 500;
            const errorMessage = err.response.data.message || 'An error occurred while logging in';
            toast.error(`Error ${errorCode}: ` + errorMessage);
        },
    });
}
