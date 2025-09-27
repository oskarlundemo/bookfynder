

import { NextResponse } from 'next/server';
import {supabase} from "@/app/services/supabase";

export async function POST(req: Request) {

    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    })

    if (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while connecting to Supabase' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'User registered!' });
}
