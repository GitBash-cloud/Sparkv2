import 'dart:async';
import '../models/user_model.dart';

class AuthException implements Exception {
  final String message;
  const AuthException(this.message);

  @override
  String toString() => message;
}

/// Mock Production-ready Authentication Service
/// Handles token generation, mock persistence, and secure async workflows.
class AuthService {
  AuthService._internal();
  static final AuthService instance = AuthService._internal();

  UserModel? _currentUser;
  final _authStateController = StreamController<UserModel?>.broadcast();

  UserModel? get currentUser => _currentUser;
  bool get isAuthenticated => _currentUser != null;
  Stream<UserModel?> get authStateChanges => _authStateController.stream;

  /// Authenticate with email and password
  Future<UserModel> login({
    required String email,
    required String password,
  }) async {
    await Future.delayed(const Duration(milliseconds: 900));

    final normalizedEmail = email.trim().toLowerCase();
    if (password.length < 6) {
      throw const AuthException('Password must be at least 6 characters long.');
    }

    if (normalizedEmail == 'error@tradespark.com') {
      throw const AuthException('Invalid email or password. Please try again.');
    }

    _currentUser = UserModel(
      id: 'usr_8921_elite',
      email: normalizedEmail,
      fullName: 'Alex Mercer',
      phoneNumber: '+1 (555) 382-9102',
      avatarUrl: null,
      createdAt: DateTime.now().subtract(const Duration(days: 45)),
    );

    _authStateController.add(_currentUser);
    return _currentUser!;
  }

  /// Register a new user
  Future<UserModel> signUp({
    required String fullName,
    required String email,
    required String password,
    String? phoneNumber,
  }) async {
    await Future.delayed(const Duration(milliseconds: 1100));

    final normalizedEmail = email.trim().toLowerCase();
    if (password.length < 6) {
      throw const AuthException('Password must be at least 6 characters.');
    }

    if (normalizedEmail == 'taken@tradespark.com') {
      throw const AuthException('This email is already registered. Please log in.');
    }

    _currentUser = UserModel(
      id: 'usr_${DateTime.now().millisecondsSinceEpoch}',
      email: normalizedEmail,
      fullName: fullName.trim(),
      phoneNumber: phoneNumber?.trim(),
      avatarUrl: null,
      createdAt: DateTime.now(),
    );

    _authStateController.add(_currentUser);
    return _currentUser!;
  }

  /// Request password reset email
  Future<void> sendPasswordResetEmail({required String email}) async {
    await Future.delayed(const Duration(milliseconds: 800));

    final normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail.contains('@') || !normalizedEmail.contains('.')) {
      throw const AuthException('Please provide a valid email address.');
    }

    // Successfully dispatched reset instructions
  }

  /// Update user profile details
  Future<UserModel> updateProfile({
    String? fullName,
    String? email,
    String? phoneNumber,
    String? avatarUrl,
  }) async {
    await Future.delayed(const Duration(milliseconds: 500));
    if (_currentUser == null) {
      throw const AuthException('No authenticated user found.');
    }

    _currentUser = _currentUser!.copyWith(
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      avatarUrl: avatarUrl,
    );

    _authStateController.add(_currentUser);
    return _currentUser!;
  }

  /// Sign out current user
  Future<void> logout() async {
    await Future.delayed(const Duration(milliseconds: 300));
    _currentUser = null;
    _authStateController.add(null);
  }

  void dispose() {
    _authStateController.close();
  }
}
