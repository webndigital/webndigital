import type { APIRoute } from 'astro';

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

    // TODO: Implement actual email sending using nodemailer
    // For now, just log the contact submission
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      company,
      projectType,
      message,
      timestamp: new Date().toISOString()
    });

    // Simulate email sending
    // In production, you would use nodemailer here:
    /*
    const nodemailer = await import('nodemailer');
    const transporter = nodemailer.createTransport({
      host: import.meta.env.SMTP_HOST,
      port: parseInt(import.meta.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: import.meta.env.SMTP_USER,
      to: import.meta.env.SMTP_TO,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });
    */

    return new Response(
      JSON.stringify({ success: true, message: 'Form submitted successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
