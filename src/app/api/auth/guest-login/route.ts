import {NextResponse} from "next/server";
import {supabase} from "@/app/services/supabase";

export async function POST (req: Request) {

    const guestEmail = process.env.NEXT_PUBLIC_GUEST_EMAIL;
    const guestPassword = process.env.NEXT_PUBLIC_GUEST_PASSWORD;

    if (!guestPassword || !guestEmail) {
        return NextResponse.json({ message: 'Guest credentials are missing' }, { status: 404 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: guestEmail,
        password: guestPassword,
    })

    if (error && error.code === 'invalid_credentials' ) {
        return NextResponse.json({ message: 'Invalid login credentials' }, { status: error.status });
    }

    if (error) {
        return NextResponse.json({ message: 'An error occurred while connecting to Supabase' }, { status: error.status });
    }

    return NextResponse.json({ success: true, message: 'User registered!' });
}