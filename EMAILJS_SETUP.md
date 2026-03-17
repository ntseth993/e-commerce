# EmailJS Setup Guide

This guide will help you set up EmailJS to send real emails over the internet for OTP verification and agreement notifications.

## 🚀 Quick Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create Email Service
1. In EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account
5. Note down your **Service ID** (looks like: `service_xxxxxxxxx`)

### 3. Create Email Templates

#### Template 1: OTP Verification
1. Click "Email Templates" → "Create New Template"
2. **Template Name**: `OTP Verification`
3. **Subject**: `Verify Your Email - OTP Code`
4. **HTML Content**:
```html
<p>Hi {{user_name}},</p>
<p>Your verification code is: <strong>{{otp_code}}</strong></p>
<p>This code expires in 10 minutes.</p>
<p><a href="{{verification_link}}">Verify Email</a></p>
```
5. Note down your **Template ID** (looks like: `template_xxxxxxxxx`)

#### Template 2: Agreement Approval
1. Create another template
2. **Template Name**: `Agreement Approval`
3. **Subject**: `Your Seller Agreement Has Been Approved!`
4. **HTML Content**:
```html
<p>Congratulations {{user_name}}!</p>
<p>Your seller agreement for {{business_name}} has been approved.</p>
<p><a href="{{verification_link}}">Verify Email & Continue</a></p>
```

#### Template 3: Agreement Rejection
1. Create another template
2. **Template Name**: `Agreement Rejection`
3. **Subject**: `Your Seller Agreement Status Update`
4. **HTML Content**:
```html
<p>Hi {{user_name}},</p>
<p>Your agreement has been reviewed.</p>
<p>Reason: {{rejection_reason}}</p>
<p><a href="{{resubmit_link}}">Resubmit Agreement</a></p>
```

### 4. Get Your Public Key
1. In EmailJS dashboard, go to "Account" → "API Keys"
2. Copy your **Public Key** (looks like: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

### 5. Update Configuration
Open `src/services/emailService.ts` and replace the placeholder values:

```typescript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_your_actual_service_id', // Replace with your EmailJS service ID
  TEMPLATE_ID_OTP: 'template_your_actual_otp_template_id', // Replace with your OTP template ID
  TEMPLATE_ID_APPROVAL: 'template_your_actual_approval_template_id', // Replace with your approval template ID
  TEMPLATE_ID_REJECTION: 'template_your_actual_rejection_template_id', // Replace with your rejection template ID
  PUBLIC_KEY: 'your_actual_public_key_here' // Replace with your EmailJS public key
}
```

## 📧 How It Works

### OTP Verification Flow:
1. User requests email verification
2. System generates 8-character OTP code
3. EmailJS sends email with OTP to user's real email
4. User enters OTP to verify email
5. Access granted to subscription

### Agreement Notifications:
1. Admin approves/rejects agreement
2. EmailJS sends notification email to seller
3. Seller receives real email with status update
4. Links included for next steps

## 🧪 Testing

### Development Mode:
- OTP codes still show in console and test box
- LocalStorage backup for easy testing
- Fallback if EmailJS fails

### Production Mode:
- Real emails sent to user inboxes
- Professional email templates
- Error handling and logging

## 🎯 Benefits

✅ **Real Email Delivery**: Emails sent to actual inboxes
✅ **Professional Templates**: Beautiful HTML email designs
✅ **Free Tier**: EmailJS free plan allows 200 emails/month
✅ **Easy Setup**: No backend required
✅ **Reliable**: Cloud-based email delivery
✅ **Trackable**: Email delivery status and logs

## 🔧 Troubleshooting

### Common Issues:
1. **"EmailJS not initialized"**: Make sure PUBLIC_KEY is correct
2. **"Template not found"**: Check TEMPLATE_ID values
3. **"Service not found"**: Verify SERVICE_ID is correct
4. **Email not sending**: Check EmailJS dashboard for errors

### Debug Mode:
- Check browser console for EmailJS responses
- Look for `✅ Real OTP email sent successfully` messages
- Verify template parameters match your EmailJS templates

## 📞 Support

- EmailJS Documentation: [https://www.emailjs.com/docs](https://www.emailjs.com/docs)
- EmailJS Support: support@emailjs.com

Once configured, your system will send real emails over the internet to `tuyishimegloire08@gmail.com` and `ntseth993@gmail.com`!
