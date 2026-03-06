import { createClient } from '@/lib/supabase/server'
import {redirect} from "next/navigation";
import {LandingHeader} from "@/components/landing/LandingHeader"
import {AuthorDetails} from "@/components/landing/AuthorDetails";
import {MockChart} from "@/components/landing/MockChart";
import MockDeck from "@/components/landing/MockDeck";
import MockBookForm from "@/components/landing/MockBookForm";
import LandingHero from "@/components/landing/LandingHero";
import LandingFooter from "@/components/landing/LandingFooter";

export default async function Home ({}) {

    const supabase = await createClient();
    const { data } = await supabase.auth.getUser()

    if (data?.user) {
        redirect('/books')
    }

    return (
        <main className="flex overflow-x-hidden bg-muted flex-col items-center justify-start w-full h-full text-center">

            <LandingHeader/>
            <LandingHero/>

            <section className="flex bg-white items-center flex-col gap-20  md:gap-20 w-full">

                <div className={"flex my-30 items-center justify-center flex-col gap-20 max-w-[1200px] w-full"}>
                    <MockBookForm/>

                    <MockDeck/>

                    <MockChart/>
                </div>

            </section>


            <LandingFooter/>

        </main>
    );
}