import {NextResponse} from "next/server";
import {supabase} from "@/app/services/supabase";

export async function POST (req: Request) {

    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })

    if (error && error.code === 'invalid_credentials' ) {
        console.log(error)
        return NextResponse.json({ message: 'Invalid login credentials' }, { status: error.status });
    }

    if (error) {
        console.log(error)
        return NextResponse.json({ message: 'An error occurred while connecting to Supabase' }, { status: error.status });
    }

    const response = NextResponse.json({
        success: true,
        message: "Guest logged in!",
        user: data.user,
    });

    response.cookies.set("sb_access_token", data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24,
    });

    return response;
}