import 'package:flutter/material.dart';

class AppTheme {
  // Brand Color Palette
  static const Color darkBackground = Color(0xFF0B0E14);
  static const Color darkSurface = Color(0xFF161C24);
  static const Color darkSurfaceElevated = Color(0xFF1C2430);
  static const Color darkBorder = Color(0xFF283243);

  // Accents
  static const Color profitGreen = Color(0xFF00875A);
  static const Color profitGreenBright = Color(0xFF00E676);
  static const Color accentCyan = Color(0xFF00B8D9);
  static const Color accentGold = Color(0xFFFFAB00);
  static const Color lossRed = Color(0xFFFF1744);

  // Typography
  static const Color textWhite = Color(0xFFFFFFFF);
  static const Color textMuted = Color(0xFF959DAD);
  static const Color textSubtle = Color(0xFF636E80);

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: darkBackground,
      colorScheme: const ColorScheme.dark(
        primary: profitGreenBright,
        onPrimary: Colors.black,
        secondary: accentCyan,
        onSecondary: Colors.black,
        surface: darkSurface,
        onSurface: textWhite,
        error: lossRed,
        onError: Colors.white,
      ),
      cardTheme: CardTheme(
        color: darkSurface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: darkBorder, width: 1),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: darkSurfaceElevated,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        hintStyle: const TextStyle(color: textSubtle, fontSize: 14),
        labelStyle: const TextStyle(color: textMuted, fontSize: 14),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: darkBorder, width: 1),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: darkBorder, width: 1),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: profitGreenBright, width: 1.5),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: lossRed, width: 1),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: lossRed, width: 1.5),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: profitGreen,
          foregroundColor: Colors.white,
          elevation: 0,
          minimumSize: const Size(double.infinity, 48),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          textStyle: const TextStyle(
            fontSize: 15,
            fontWeight: FontWeight.bold,
            letterSpacing: 0.3,
          ),
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: darkBackground,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: TextStyle(
          color: textWhite,
          fontSize: 18,
          fontWeight: FontWeight.bold,
        ),
        iconTheme: IconThemeData(color: textWhite),
      ),
    );
  }
}
