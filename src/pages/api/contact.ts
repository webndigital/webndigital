import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, phone, company, projectType, message, privacy } = data;

    // Validate required fields
    if (!name || !email || !message || !privacy) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Email validation
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
      console.error('Email credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Email service not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Log the submission
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      company,
      projectType,
      timestamp: new Date().toISOString()
    });

    // Configure nodemailer transporter for Gmail
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPassword
      }
    });

    // Send email
    await transporter.sendMail({
      from: emailUser,
      to: emailUser, // Send to yourself
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0091FF; border-bottom: 2px solid #0091FF; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p style="margin: 10px 0;"><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p style="margin: 10px 0;"><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
          </div>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Message:</strong></p>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">
            Submitted on: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
          </p>
        </div>
      `
    });

    console.log('✅ Email sent successfully to:', emailUser);

    return new Response(
      JSON.stringify({ success: true, message: 'Your message has been sent successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('❌ Contact form error:', error);
    
    // Detailed error logging for debugging
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    // Check if it's an authentication error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isAuthError = errorMessage.includes('authentication') || errorMessage.includes('Invalid login');
    
    return new Response(
      JSON.stringify({ 
        error: isAuthError 
          ? 'Email authentication failed. Please check your email credentials.' 
          : 'Failed to send message. Please try again or contact us directly.',
        details: errorMessage,
        hint: isAuthError ? 'Check EMAIL_USER and EMAIL_PASSWORD in Vercel Environment Variables' : undefined
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
