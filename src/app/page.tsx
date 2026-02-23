import { createClient } from '@/lib/supabase/server'
import {redirect} from "next/navigation";
import {LandingHeader} from "@/components/landing/LandingHeader"
import {AuthorDetails} from "@/components/landing/AuthorDetails";
import Logo from "@/components/landing/Logo";
import {MockChart} from "@/components/landing/MockChart";
import MockDeck from "@/components/landing/MockDeck";
import MockBookForm from "@/components/landing/MockBookForm";

export default async function Home ({}) {

    const supabase = await createClient();
    const { data } = await supabase.auth.getUser()

    if (data?.user) {
        redirect('/books')
    }

    return (
        <main className="flex  pt-40 flex-col items-center justify-start w-full text-center px-4">

            <LandingHeader/>
            <Logo/>

            <section className="flex flex-col gap-20  md:gap-20 max-w-[1200px] w-full">

                <MockBookForm/>

                <MockDeck/>

                <MockChart/>
            </section>

            <AuthorDetails />

        </main>
    );
}