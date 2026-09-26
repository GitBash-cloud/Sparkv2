import 'package:flutter/material.dart';
import '../../services/auth_service.dart';
import '../../widgets/auth_header.dart';
import '../../widgets/custom_text_field.dart';
import '../../widgets/primary_button.dart';

class ForgotPasswordScreen extends StatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  State<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();

  bool _isLoading = false;
  bool _emailSent = false;
  String? _errorMessage;

  @override
  void dispose() {
    _emailController.dispose();
    super.dispose();
  }

  Future<void> _handleResetPassword() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      await AuthService.instance.sendPasswordResetEmail(
        email: _emailController.text,
      );

      if (!mounted) return;
      setState(() => _emailSent = true);
    } on AuthException catch (e) {
      if (!mounted) return;
      setState(() => _errorMessage = e.message);
    } catch (e) {
      if (!mounted) return;
      setState(() => _errorMessage = 'Failed to send reset link. Please try again.');
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0B0E14),
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, size: 18),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 420),
              child: _emailSent ? _buildSuccessView() : _buildFormView(),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildFormView() {
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const AuthHeader(
            title: 'Reset Password',
            subtitle: 'Enter your registered email address to receive password recovery instructions.',
          ),
          const SizedBox(height: 28),

          // Error banner
          if (_errorMessage != null) ...[
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              decoration: BoxDecoration(
                color: const Color(0xFFFF1744).withOpacity(0.12),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: const Color(0xFFFF1744).withOpacity(0.4)),
              ),
              child: Row(
                children: [
                  const Icon(Icons.error_outline, color: Color(0xFFFF1744), size: 18),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      _errorMessage!,
                      style: const TextStyle(
                        color: Color(0xFFFF1744),
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
          ],

          // Email Field
          CustomTextField(
            controller: _emailController,
            label: 'REGISTERED EMAIL',
            hint: 'name@example.com',
            prefixIcon: Icons.mail_outline,
            keyboardType: TextInputType.emailAddress,
            textInputAction: TextInputAction.done,
            validator: (value) {
              if (value == null || value.trim().isEmpty) {
                return 'Please enter your email.';
              }
              final emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
              if (!emailRegex.hasMatch(value.trim())) {
                return 'Please enter a valid email address.';
              }
              return null;
            },
          ),
          const SizedBox(height: 24),

          // Submit Button
          PrimaryButton(
            text: 'Send Reset Instructions',
            onPressed: _handleResetPassword,
            isLoading: _isLoading,
            icon: Icons.send_rounded,
          ),
          const SizedBox(height: 24),

          // Return to Login
          Center(
            child: TextButton.icon(
              onPressed: () => Navigator.pop(context),
              icon: const Icon(Icons.arrow_back, size: 16, color: Color(0xFF959DAD)),
              label: const Text(
                'Back to Sign In',
                style: TextStyle(color: Color(0xFF959DAD), fontSize: 13, fontWeight: FontWeight.w600),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSuccessView() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // Success Icon
        Container(
          width: 72,
          height: 72,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: const Color(0xFF00E676).withOpacity(0.12),
            border: Border.all(color: const Color(0xFF00E676), width: 1.5),
          ),
          child: const Center(
            child: Icon(Icons.mark_email_read_outlined, color: Color(0xFF00E676), size: 36),
          ),
        ),
        const SizedBox(height: 20),

        const Text(
          'Check Your Inbox',
          textAlign: TextAlign.center,
          style: TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 10),

        Text(
          'We have dispatched password recovery instructions to ${_emailController.text}. Please check your spam folder if you do not see it within 2 minutes.',
          textAlign: TextAlign.center,
          style: const TextStyle(color: Color(0xFF959DAD), fontSize: 13, height: 1.5),
        ),
        const SizedBox(height: 32),

        PrimaryButton(
          text: 'Return to Sign In',
          onPressed: () => Navigator.pop(context),
          icon: Icons.login,
        ),
        const SizedBox(height: 16),

        Center(
          child: TextButton(
            onPressed: () {
              setState(() => _emailSent = false);
            },
            child: const Text(
              'Did not receive email? Resend',
              style: TextStyle(color: Color(0xFF00B8D9), fontSize: 13, fontWeight: FontWeight.bold),
            ),
          ),
        ),
      ],
    );
  }
}
