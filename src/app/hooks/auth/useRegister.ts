"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

type RegisterData = {
    email: string;
    password: string;
};

export default function useRegister() {
    return useMutation({
        mutationFn: async (data: RegisterData) => {
            return axios.post("/api/auth/register", data);
        },
        onSuccess: (res) => {
            toast.success('Register successfully');
        },
        onError: (err) => {
            toast.error('Error: ' + err);
        },
    });
}
