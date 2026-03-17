// Email Service for sending OTP codes
// Using EmailJS for real email sending over internet

import emailjs from '@emailjs/browser'

export interface EmailData {
  to: string
  subject: string
  html: string
  text?: string
}

export interface OTPEmailData {
  email: string
  code: string
  userName?: string
}

// EmailJS Configuration - Replace with your actual values
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_7us47gn', // Your EmailJS service ID
  TEMPLATE_ID_OTP: 'template_h1m7p6s', // Your OTP template ID
  TEMPLATE_ID_APPROVAL: 'template_9k4w2j8', // Your approval template ID
  TEMPLATE_ID_REJECTION: 'template_0q7x5n4', // Your rejection template ID
  PUBLIC_KEY: 'W6aP8nKQ6eF3xJ5sT9h' // Your EmailJS public key
}

class EmailService {
  private static instance: EmailService

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  /**
   * Send OTP verification email
   * Now sends real emails using EmailJS
   */
  async sendOTPEmail(data: OTPEmailData): Promise<boolean> {
    try {
      const { email, code, userName } = data
      
      // Create email content
      const emailContent = this.createOTPEmailTemplate(code, userName)
      
      // Store the code in localStorage for testing/backup
      this.storeOTPForTesting(email, code)
      
      // Log the OTP code for development
      console.log(`📧 OTP Code for ${email}: ${code}`)
      console.log(`📧 Sending real email to: ${email}`)
      
      // Send real email using EmailJS
      const emailSent = await this.sendRealEmail({
        to: email,
        subject: 'Verify Your Email - OTP Code',
        html: emailContent.html,
        text: emailContent.text
      }, EMAILJS_CONFIG.TEMPLATE_ID_OTP, {
        to_email: email,
        user_name: userName || 'User',
        otp_code: code,
        verification_link: 'https://yourapp.com/email-verification'
      })
      
      if (emailSent) {
        console.log(`✅ Real OTP email sent successfully to ${email}`)
        return true
      } else {
        console.error(`❌ Failed to send OTP email to ${email}`)
        return false
      }
    } catch (error) {
      console.error('Error sending OTP email:', error)
      return false
    }
  }

  /**
   * Send agreement approval notification email
   */
  async sendAgreementApprovalEmail(email: string, userName: string, businessName?: string): Promise<boolean> {
    try {
      const emailContent = this.createAgreementApprovalTemplate(userName, businessName)
      
      console.log(`📧 Sending agreement approval email to: ${email}`)
      
      // Send real email using EmailJS
      const emailSent = await this.sendRealEmail({
        to: email,
        subject: 'Your Seller Agreement Has Been Approved!',
        html: emailContent.html,
        text: emailContent.text
      }, EMAILJS_CONFIG.TEMPLATE_ID_APPROVAL, {
        to_email: email,
        user_name: userName,
        business_name: businessName || 'your business',
        verification_link: 'https://yourapp.com/email-verification'
      })
      
      if (emailSent) {
        console.log(`✅ Agreement approval email sent to ${email}`)
      } else {
        console.error(`❌ Failed to send agreement approval email to ${email}`)
      }
      
      // Store notification for testing
      this.storeNotificationForTesting(email, 'agreement_approved')
      
      return emailSent
    } catch (error) {
      console.error('Error sending agreement approval email:', error)
      return false
    }
  }

  /**
   * Send agreement rejection notification email
   */
  async sendAgreementRejectionEmail(email: string, userName: string, reason?: string): Promise<boolean> {
    try {
      const emailContent = this.createAgreementRejectionTemplate(userName, reason)
      
      console.log(`📧 Sending agreement rejection email to: ${email}`)
      
      // Send real email using EmailJS
      const emailSent = await this.sendRealEmail({
        to: email,
        subject: 'Your Seller Agreement Status Update',
        html: emailContent.html,
        text: emailContent.text
      }, EMAILJS_CONFIG.TEMPLATE_ID_REJECTION, {
        to_email: email,
        user_name: userName,
        rejection_reason: reason || 'No reason provided',
        resubmit_link: 'https://yourapp.com/seller-agreement'
      })
      
      if (emailSent) {
        console.log(`✅ Agreement rejection email sent to ${email}`)
      } else {
        console.error(`❌ Failed to send agreement rejection email to ${email}`)
      }
      
      // Store notification for testing
      this.storeNotificationForTesting(email, 'agreement_rejected')
      
      return emailSent
    } catch (error) {
      console.error('Error sending agreement rejection email:', error)
      return false
    }
  }

  private createOTPEmailTemplate(code: string, userName?: string) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 32px;">Email Verification</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Verify your email to continue</p>
          </div>
          
          <div style="padding: 40px 20px;">
            <p style="font-size: 16px; color: #333; margin-bottom: 30px;">
              ${userName ? `Hi ${userName},` : 'Hello,'}
            </p>
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
              Thank you for registering with our platform! To complete your email verification, please use the following One-Time Password (OTP):
            </p>
            
            <div style="background-color: #f8f9fa; border: 2px dashed #6c63ff; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
              <p style="font-size: 14px; color: #666; margin: 0 0 10px; text-transform: uppercase; letter-spacing: 1px;">Your OTP Code</p>
              <h2 style="font-size: 36px; color: #6c63ff; margin: 0; letter-spacing: 8px; font-weight: bold;">${code}</h2>
            </div>
            
            <p style="font-size: 14px; color: #666; margin-bottom: 30px;">
              This code will expire in <strong>10 minutes</strong>. For your security, please do not share this code with anyone.
            </p>
            
            <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #856404;">
                <strong>Security Notice:</strong> If you didn't request this verification, please ignore this email.
              </p>
            </div>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
            <p style="margin: 0; font-size: 12px; color: #666;">
              © 2024 E-commerce Platform. All rights reserved.
            </p>
            <p style="margin: 10px 0 0; font-size: 12px; color: #666;">
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
        </div>
      </body>
      </html>
    `

    const text = `
      Email Verification
      
      ${userName ? `Hi ${userName},` : 'Hello,'}
      
      Thank you for registering with our platform! To complete your email verification, please use the following One-Time Password (OTP):
      
      Your OTP Code: ${code}
      
      This code will expire in 10 minutes. For your security, please do not share this code with anyone.
      
      Security Notice: If you didn't request this verification, please ignore this email.
      
      © 2024 E-commerce Platform. All rights reserved.
    `

    return { html, text }
  }

  private createAgreementApprovalTemplate(userName: string, businessName?: string) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Agreement Approved</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 32px;">✅ Agreement Approved!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Your seller agreement has been approved</p>
          </div>
          
          <div style="padding: 40px 20px;">
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
              Congratulations ${userName}!
            </p>
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
              Your seller agreement for <strong>${businessName || 'your business'}</strong> has been approved by our admin team.
            </p>
            
            <div style="background-color: #d4edda; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #155724;">
                <strong>Next Steps:</strong> Please verify your email to proceed with subscription plans.
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background-color: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Verify Email & Continue
              </a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    return { html, text: `Agreement Approved! Your seller agreement for ${businessName || 'your business'} has been approved.` }
  }

  private createAgreementRejectionTemplate(userName: string, reason?: string) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Agreement Status Update</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="background: linear-gradient(135deg, #dc3545 0%, #fd7e14 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 32px;">📋 Agreement Status Update</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px;">Review of your seller agreement</p>
          </div>
          
          <div style="padding: 40px 20px;">
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
              Hi ${userName},
            </p>
            <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
              Your seller agreement has been reviewed by our admin team.
            </p>
            
            ${reason ? `
            <div style="background-color: #f8d7da; border-left: 4px solid #dc3545; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #721c24;">
                <strong>Reason:</strong> ${reason}
              </p>
            </div>
            ` : ''}
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Resubmit Agreement
              </a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `

    return { html, text: `Your seller agreement has been reviewed. ${reason ? `Reason: ${reason}` : ''}` }
  }

  private storeOTPForTesting(email: string, code: string) {
    // Store OTP in localStorage for easy testing in development
    const otps = JSON.parse(localStorage.getItem('testOTPs') || '{}')
    otps[email] = {
      code,
      timestamp: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString()
    }
    localStorage.setItem('testOTPs', JSON.stringify(otps))
  }

  private storeNotificationForTesting(email: string, type: string) {
    // Store notification in localStorage for testing
    const notifications = JSON.parse(localStorage.getItem('testNotifications') || '[]')
    notifications.push({
      email,
      type,
      timestamp: new Date().toISOString()
    })
    localStorage.setItem('testNotifications', JSON.stringify(notifications))
  }

  /**
   * Get stored OTP for testing (development only)
   */
  getTestOTP(email: string): { code: string; expiresAt: string } | null {
    try {
      const otps = JSON.parse(localStorage.getItem('testOTPs') || '{}')
      const otp = otps[email]
      if (otp && new Date(otp.expiresAt) > new Date()) {
        return { code: otp.code, expiresAt: otp.expiresAt }
      }
    } catch (error) {
      console.error('Error getting test OTP:', error)
    }
    return null
  }

  /**
   * Send real email using EmailJS
   */
  private async sendRealEmail(data: EmailData, templateId: string, templateParams: Record<string, any>): Promise<boolean> {
    try {
      console.log('🔧 EmailJS Configuration:', {
        serviceId: EMAILJS_CONFIG.SERVICE_ID,
        templateId: templateId,
        publicKey: EMAILJS_CONFIG.PUBLIC_KEY
      })
      
      console.log('📧 Email Data:', {
        to: data.to,
        subject: data.subject,
        templateParams
      })
      
      // Initialize EmailJS with your public key
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)
      
      // Send email using EmailJS
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        templateId,
        templateParams
      )
      
      console.log('✅ EmailJS Response:', response)
      console.log(`📧 Email sent successfully to: ${data.to}`)
      return true
    } catch (error) {
      console.error('❌ EmailJS Error Details:', error)
      console.error('❌ Error Message:', error.message)
      console.error('❌ Error Status:', error.status)
      
      // Fallback to console logging for development
      console.log('📧 Email Content (fallback):', {
        to: data.to,
        subject: data.subject,
        html: data.html?.substring(0, 200) + '...',
        templateParams
      })
      
      return false
    }
  }
}

export const emailService = EmailService.getInstance()
