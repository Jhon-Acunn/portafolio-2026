import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 *
 * Handles contact form submissions.
 * For now, logs the submission and returns success.
 *
 * TODO: Integrate with an email service (Resend, SendGrid, Nodemailer, etc.)
 * Example with Resend:
 *   import { Resend } from "resend";
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({ ... });
 */

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactPayload = await request.json();

    // Basic validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Log the submission (dev/debug)
    console.log("[Contact] New message received:", {
      name: body.name,
      email: body.email,
      messageLength: body.message.length,
      timestamp: new Date().toISOString(),
    });

    // TODO: Send email via Resend / SendGrid / SMTP
    // Example with environment variable:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "portfolio@jhonacunn.dev",
    //   to: "hello@jhonacunn.dev",
    //   replyTo: body.email,
    //   subject: `New message from ${body.name}`,
    //   text: `Name: ${body.name}\nEmail: ${body.email}\nMessage: ${body.message}`,
    // });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[Contact] Error processing submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
