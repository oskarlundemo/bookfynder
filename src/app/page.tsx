import { createClient } from '@/lib/supabase/server'
import {redirect} from "next/navigation";
import {LandingHeader} from "@/components/landing/LandingHeader"
import {AuthorDetails} from "@/components/landing/AuthorDetails";
import {MockChart} from "@/components/landing/MockChart";
import MockDeck from "@/components/landing/MockDeck";
import MockBookForm from "@/components/landing/MockBookForm";
import LandingHero from "@/components/landing/LandingHero";
import LandingFooter from "@/components/landing/LandingFooter";
import PerkSection from "@/components/landing/PerkSection";
import FAQ from "@/components/landing/FAQ";

export default async function Home ({}) {

    const supabase = await createClient();
    const { data } = await supabase.auth.getUser()

    if (data?.user) {
        redirect('/books')
    }

    return (
        <main className="flex relative overflow-x-hidden bg-mute flex-col items-center justify-start w-full h-full text-center">

            <LandingHeader/>
            <LandingHero/>

            <section className="flex bg-white z-30 items-center flex-col gap-20  md:gap-20 w-full">

                <div className={"flex px-10 items-center justify-center mb-40 flex-col gap-20 max-w-[1200px] w-full"}>

                    <PerkSection/>

                    <div className={"grid grid-rows-[1fr_1fr_1fr] gap-20"}>
                        <MockBookForm/>

                        <MockDeck/>

                        <MockChart/>
                    </div>

                    <FAQ/>
                </div>

            </section>

            <LandingFooter/>

        </main>
    );
}