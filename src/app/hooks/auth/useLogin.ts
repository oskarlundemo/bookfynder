"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

type RegisterData = {
    email: string;
    password: string;
};


export default function useLogin() {

    const router = useRouter();

    return useMutation({
        mutationFn: async (data: RegisterData) => {
            return axios.post("/api/auth/login", data);
        },
        onSuccess: (res) => {
            router.push("/books");
            toast.success('Login successfully');
        },
        onError: (err) => {
            const errorCode = err.response.status || 500;
            const errorMessage = err.response.data.message || 'An error occurred while logging in';
            toast.error(`Error ${errorCode}: ` + errorMessage);
        },
    });
}

