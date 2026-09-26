import 'package:flutter/material.dart';
import '../../services/auth_service.dart';
import '../../widgets/auth_header.dart';
import '../../widgets/custom_text_field.dart';
import '../../widgets/primary_button.dart';

class SignUpScreen extends StatefulWidget {
  const SignUpScreen({super.key});

  @override
  State<SignUpScreen> createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {
  final _formKey = GlobalKey<FormState>();
  final _fullNameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();

  bool _isPasswordVisible = false;
  bool _isConfirmPasswordVisible = false;
  bool _agreedToTerms = true;
  bool _isLoading = false;
  String? _errorMessage;

  @override
  void dispose() {
    _fullNameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  Future<void> _handleSignUp() async {
    if (!_formKey.currentState!.validate()) return;

    if (!_agreedToTerms) {
      setState(() => _errorMessage = 'Please agree to the Terms of Service & Privacy Policy.');
      return;
    }

    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      await AuthService.instance.signUp(
        fullName: _fullNameController.text,
        email: _emailController.text,
        password: _passwordController.text,
        phoneNumber: _phoneController.text.isNotEmpty ? _phoneController.text : null,
      );

      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Account successfully created! Welcome to TradeSpark.'),
          backgroundColor: Color(0xFF00875A),
          behavior: SnackBarBehavior.floating,
        ),
      );
      Navigator.pop(context);
    } on AuthException catch (e) {
      if (!mounted) return;
      setState(() => _errorMessage = e.message);
    } catch (e) {
      if (!mounted) return;
      setState(() => _errorMessage = 'An error occurred during account creation.');
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
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 420),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const AuthHeader(
                      title: 'Create Your Account',
                      subtitle: 'Join top traders harnessing real-time AI market scanning & precision setups.',
                    ),
                    const SizedBox(height: 24),

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

                    // Full Name
                    CustomTextField(
                      controller: _fullNameController,
                      label: 'FULL NAME',
                      hint: 'Alex Mercer',
                      prefixIcon: Icons.person_outline,
                      validator: (value) {
                        if (value == null || value.trim().isEmpty) {
                          return 'Please enter your full name.';
                        }
                        if (value.trim().split(' ').length < 2) {
                          return 'Please enter first and last name.';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16),

                    // Email Address
                    CustomTextField(
                      controller: _emailController,
                      label: 'EMAIL ADDRESS',
                      hint: 'name@example.com',
                      prefixIcon: Icons.mail_outline,
                      keyboardType: TextInputType.emailAddress,
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
                    const SizedBox(height: 16),

                    // Phone Number (Optional)
                    CustomTextField(
                      controller: _phoneController,
                      label: 'PHONE NUMBER (OPTIONAL)',
                      hint: '+1 (555) 000-0000',
                      prefixIcon: Icons.phone_outlined,
                      keyboardType: TextInputType.phone,
                    ),
                    const SizedBox(height: 16),

                    // Password
                    CustomTextField(
                      controller: _passwordController,
                      label: 'PASSWORD',
                      hint: 'Min. 8 chars, 1 number, 1 upper',
                      prefixIcon: Icons.lock_outline,
                      obscureText: !_isPasswordVisible,
                      suffixIcon: IconButton(
                        icon: Icon(
                          _isPasswordVisible ? Icons.visibility_off : Icons.visibility,
                          color: const Color(0xFF959DAD),
                          size: 20,
                        ),
                        onPressed: () {
                          setState(() => _isPasswordVisible = !_isPasswordVisible);
                        },
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Please provide a password.';
                        }
                        if (value.length < 8) {
                          return 'Password must be at least 8 characters.';
                        }
                        if (!RegExp(r'[A-Z]').hasMatch(value)) {
                          return 'Password must contain at least 1 uppercase letter.';
                        }
                        if (!RegExp(r'[0-9]').hasMatch(value)) {
                          return 'Password must contain at least 1 number.';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16),

                    // Confirm Password
                    CustomTextField(
                      controller: _confirmPasswordController,
                      label: 'CONFIRM PASSWORD',
                      hint: 'Re-enter your password',
                      prefixIcon: Icons.lock_outline,
                      obscureText: !_isConfirmPasswordVisible,
                      textInputAction: TextInputAction.done,
                      suffixIcon: IconButton(
                        icon: Icon(
                          _isConfirmPasswordVisible ? Icons.visibility_off : Icons.visibility,
                          color: const Color(0xFF959DAD),
                          size: 20,
                        ),
                        onPressed: () {
                          setState(() => _isConfirmPasswordVisible = !_isConfirmPasswordVisible);
                        },
                      ),
                      validator: (value) {
                        if (value != _passwordController.text) {
                          return 'Passwords do not match.';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 14),

                    // Terms Checkbox
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        SizedBox(
                          width: 24,
                          height: 24,
                          child: Checkbox(
                            value: _agreedToTerms,
                            activeColor: const Color(0xFF00E676),
                            checkColor: Colors.black,
                            side: const BorderSide(color: Color(0xFF283243)),
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
                            onChanged: (val) => setState(() => _agreedToTerms = val ?? false),
                          ),
                        ),
                        const SizedBox(width: 8),
                        const Expanded(
                          child: Text(
                            'I agree to TradeSpark Terms of Service & Privacy Policy',
                            style: TextStyle(color: Color(0xFF959DAD), fontSize: 12),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),

                    // Sign Up Submit
                    PrimaryButton(
                      text: 'Create TradeSpark Account',
                      onPressed: _handleSignUp,
                      isLoading: _isLoading,
                      icon: Icons.person_add,
                    ),
                    const SizedBox(height: 20),

                    // Footer Link
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Text(
                          'Already registered? ',
                          style: TextStyle(color: Color(0xFF959DAD), fontSize: 13),
                        ),
                        GestureDetector(
                          onTap: () => Navigator.pop(context),
                          child: const Text(
                            'Sign In',
                            style: TextStyle(
                              color: Color(0xFF00E676),
                              fontSize: 13,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
