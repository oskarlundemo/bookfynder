import {AuthUI} from "@/components/auth/AuthUI";
import ResetForm from "@/components/auth/ResetForm";
import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";
import {prisma} from "@/lib/prisma";

export default async function Reset() {

    // auth check
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/auth/login')
    }

    return (
        <AuthUI>
            <ResetForm/>
        </AuthUI>
    )
}