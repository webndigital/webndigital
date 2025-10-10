import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const email = data.get('email')?.toString();

    // Validate email
    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if email credentials are configured
    const emailUser = import.meta.env.EMAIL_USER;
    const emailPassword = import.meta.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPassword) {
      console.error('Email credentials not configured for newsletter');
      return new Response(
        JSON.stringify({ error: 'Newsletter service not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Log the subscription
    console.log('Newsletter subscription:', {
      email,
      timestamp: new Date().toISOString()
    });

    // Dynamically import nodemailer (server-side only)
    const nodemailer = await import('nodemailer');
    
    // Configure nodemailer transporter for Gmail
    const transporter = nodemailer.default.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPassword
      }
    });

    // Send notification email to admin
    await transporter.sendMail({
      from: emailUser,
      to: 'hello@webndigital.co.uk',
      subject: 'New Newsletter Subscription',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0091FF; border-bottom: 2px solid #0091FF; padding-bottom: 10px;">
            New Newsletter Subscription
          </h2>
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Subscribed On:</strong> ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">
            Add this email to your newsletter mailing list.
          </p>
        </div>
      `
    });

    console.log('✅ Newsletter subscription email sent to:', emailUser);

    // Redirect back to blog with success message
    return Response.redirect(new URL('/blog?subscribed=true', request.url), 303);

  } catch (error) {
    console.error('❌ Newsletter subscription error:', error);
    
    // Detailed error logging for debugging
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    // Redirect back with error
    return Response.redirect(new URL('/blog?subscribed=error', request.url), 303);
  }
};

