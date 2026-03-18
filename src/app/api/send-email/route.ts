import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { to, subject, html } = await request.json();
        const apiKey = process.env.RESEND_API_KEY;

        if (!apiKey) {
            console.error("RESEND_API_KEY not found in environment variables");
            return NextResponse.json({ error: "Configuration Error" }, { status: 500 });
        }

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                from: "Palma Institut <onboarding@resend.dev>", // Note: Use onboarding@resend.dev for testing if no domain verified
                to: [to],
                subject: subject,
                html: html,
            }),
        });

        const data = await res.json();
        
        if (!res.ok) {
            console.error("Resend API Error:", data);
            return NextResponse.json({ error: data.message || "Failed to send email" }, { status: res.status });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Failed to send email:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
