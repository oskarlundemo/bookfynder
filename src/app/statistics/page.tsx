import {createClient} from "@/lib/supabase/server";
import {redirect} from "next/navigation";


export default async function StatisticsPag () {

    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/auth/login')
    }

    return (
        <h1>Welcome to the stats page</h1>
    )
}
