// app/api/bfhl/route.js

import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { data } = await req.json();
        const userId = "john_doe_17091999";  // Example user ID
        const email = "john@xyz.com";
        const rollNumber = "ABCD123";

        if (!data || !Array.isArray(data)) {
            return NextResponse.json({ is_success: false, message: "Invalid input" }, { status: 400 });
        }

        const numbers = data.filter(item => !isNaN(item));
        const alphabets = data.filter(item => isNaN(item));
        const lowercaseAlphabets = alphabets.filter(char => char >= 'a' && char <= 'z');
        const highestLowercaseAlphabet = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().reverse()[0]] : [];

        return NextResponse.json({
            is_success: true,
            user_id: userId,
            email: email,
            roll_number: rollNumber,
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercaseAlphabet
        });

    } catch (error) {
        return NextResponse.json({ is_success: false, message: "Server error" }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ operation_code: 1 });
}
