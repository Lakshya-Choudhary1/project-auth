
export const emailVerificationTemplate = (fullName, otp) => {
  return `
  <div style="margin:0;padding:0;background:#f3f6fb;font-family:Segoe UI,Roboto,Arial,sans-serif;">
    
    <div style="max-width:520px;margin:40px auto;background:white;border-radius:14px;
    box-shadow:0 10px 30px rgba(0,0,0,0.08);overflow:hidden">

      <!-- Header -->
      <div style="background:linear-gradient(135deg,#667eea,#764ba2);
      padding:30px;text-align:center;color:white">
        <h1 style="margin:0;font-weight:600;">Verify Your Email</h1>
        <p style="opacity:.9;margin-top:6px;font-size:14px">
          Secure your account with OTP verification
        </p>
      </div>

      <!-- Body -->
      <div style="padding:35px;text-align:center;color:#444">

        <p style="font-size:16px;margin-bottom:20px">
          Hello <b>${fullName}</b>,
        </p>

        <p style="font-size:15px;color:#666;margin-bottom:30px">
          Use the verification code below to confirm your email address.
        </p>

        <!-- OTP Box -->
        <div style="
        font-size:34px;
        letter-spacing:8px;
        font-weight:700;
        color:#333;
        background:#f6f8ff;
        padding:18px;
        border-radius:10px;
        display:inline-block;
        border:2px dashed #667eea;
        margin-bottom:20px;
        ">
          ${otp}
        </div>

        <p style="font-size:14px;color:#777;margin-top:10px">
          This code will expire in <b>10 minutes</b>
        </p>

        <div style="margin-top:30px;font-size:13px;color:#888">
          If you didn't request this verification, you can safely ignore this email.
        </div>

      </div>

      <!-- Footer -->
      <div style="background:#fafafa;padding:20px;text-align:center;font-size:12px;color:#999">
        © ${new Date().getFullYear()} Your App • All rights reserved
      </div>

    </div>

  </div>
  `;
};



export const forgotPasswordTemplate = (url) => {
  return `
  <div style="margin:0;padding:0;background:#f3f6fb;font-family:Segoe UI,Roboto,Arial,sans-serif;">
    
    <div style="max-width:520px;margin:40px auto;background:white;border-radius:14px;
    box-shadow:0 10px 30px rgba(0,0,0,0.08);overflow:hidden">

      <!-- Header -->
      <div style="background:linear-gradient(135deg,#ff7a18,#ffb347);
      padding:30px;text-align:center;color:white">
        <h1 style="margin:0;font-weight:600;">Reset Your Password</h1>
        <p style="opacity:.9;margin-top:6px;font-size:14px">
          Secure access to your account
        </p>
      </div>

      <!-- Body -->
      <div style="padding:35px;color:#444">

        <p style="font-size:16px;margin-bottom:18px">
          We received a request to reset your password.
        </p>

        <p style="font-size:14px;color:#666;margin-bottom:30px">
          Click the button below to set a new password.
        </p>

        <div style="text-align:center;margin:35px 0">
          <a href="${url}" 
          style="
          background:linear-gradient(135deg,#667eea,#764ba2);
          color:white;
          text-decoration:none;
          padding:14px 26px;
          border-radius:8px;
          font-weight:600;
          font-size:15px;
          display:inline-block;
          box-shadow:0 5px 15px rgba(102,126,234,.4)
          ">
          Reset Password
          </a>
        </div>

        <p style="font-size:13px;color:#777">
          If the button doesn't work, copy and paste this link into your browser:
        </p>

        <div style="
        background:#f6f6f6;
        padding:12px;
        border-radius:6px;
        font-size:12px;
        word-break:break-all;
        color:#555;
        margin-top:10px
        ">
          ${url}
        </div>

        <p style="margin-top:30px;font-size:13px;color:#888">
          If you did not request this password reset, please ignore this email.
        </p>

      </div>

      <!-- Footer -->
      <div style="background:#fafafa;padding:20px;text-align:center;font-size:12px;color:#999">
        This reset link will expire in 10 minutes for security reasons.
      </div>

    </div>

  </div>
  `;
};
