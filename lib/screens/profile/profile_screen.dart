import 'package:flutter/material.dart';
import '../../models/user_model.dart';
import '../../services/auth_service.dart';
import '../auth/login_screen.dart';
import 'edit_profile_screen.dart';

class ProfileScreen extends StatefulWidget {
  final UserModel user;

  const ProfileScreen({super.key, required this.user});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  late UserModel _user;
  bool _darkModeEnabled = true;
  bool _notificationsEnabled = true;
  bool _autoSlTpSync = true;

  @override
  void initState() {
    super.initState();
    _user = widget.user;
  }

  Future<void> _handleLogout() async {
    final shouldLogout = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: const Color(0xFF161C24),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: const BorderSide(color: Color(0xFF283243)),
        ),
        title: const Text(
          'Sign Out',
          style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.bold),
        ),
        content: const Text(
          'Are you sure you want to log out of TradeSpark?',
          style: TextStyle(color: Color(0xFF959DAD), fontSize: 13),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('Cancel', style: TextStyle(color: Color(0xFF959DAD))),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFFFF1744),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
            ),
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Sign Out', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );

    if (shouldLogout == true) {
      await AuthService.instance.logout();
      if (!mounted) return;
      Navigator.pushAndRemoveUntil(
        context,
        MaterialPageRoute(builder: (_) => const LoginScreen()),
        (route) => false,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0B0E14),
      appBar: AppBar(
        backgroundColor: const Color(0xFF161C24),
        elevation: 0,
        title: Row(
          children: const [
            Icon(Icons.auto_awesome, color: Color(0xFF00E676), size: 20),
            SizedBox(width: 8),
            Text(
              'Trader Dashboard',
              style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout, color: Color(0xFFFF1744), size: 20),
            tooltip: 'Sign Out',
            onPressed: _handleLogout,
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 480),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // Profile Identity Card
                  _buildProfileCard(),
                  const SizedBox(height: 16),

                  // Trading Performance Quick Stats
                  _buildPerformanceCard(),
                  const SizedBox(height: 16),

                  // App Settings Section
                  _buildSettingsSection(),
                  const SizedBox(height: 16),

                  // Broker & Infrastructure Card
                  _buildBrokerCard(),
                  const SizedBox(height: 24),

                  // Sign Out Button
                  OutlinedButton.icon(
                    onPressed: _handleLogout,
                    style: OutlinedButton.styleFrom(
                      side: const BorderSide(color: Color(0xFFFF1744)),
                      backgroundColor: const Color(0xFFFF1744).withOpacity(0.08),
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    icon: const Icon(Icons.logout, color: Color(0xFFFF1744), size: 18),
                    label: const Text(
                      'Log Out of TradeSpark',
                      style: TextStyle(
                        color: Color(0xFFFF1744),
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildProfileCard() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF161C24),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFF283243)),
      ),
      child: Column(
        children: [
          Row(
            children: [
              Container(
                width: 60,
                height: 60,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: const Color(0xFF00E676).withOpacity(0.15),
                  border: Border.all(color: const Color(0xFF00E676), width: 1.5),
                ),
                child: const Center(
                  child: Icon(Icons.person, color: Color(0xFF00E676), size: 34),
                ),
              ),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      _user.fullName,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      _user.email,
                      style: const TextStyle(
                        color: Color(0xFF959DAD),
                        fontSize: 12,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                      decoration: BoxDecoration(
                        color: const Color(0xFF00E676).withOpacity(0.12),
                        borderRadius: BorderRadius.circular(6),
                        border: Border.all(color: const Color(0xFF00E676).withOpacity(0.4)),
                      ),
                      child: const Text(
                        'AI Elite Plan • Active',
                        style: TextStyle(
                          color: Color(0xFF00E676),
                          fontSize: 10,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              IconButton(
                icon: const Icon(Icons.edit_note, color: Color(0xFF00B8D9), size: 24),
                tooltip: 'Edit Profile',
                onPressed: () async {
                  final updated = await Navigator.push<UserModel>(
                    context,
                    MaterialPageRoute(
                      builder: (_) => EditProfileScreen(user: _user),
                    ),
                  );
                  if (updated != null) {
                    setState(() => _user = updated);
                  }
                },
              ),
            ],
          ),
          if (_user.phoneNumber != null && _user.phoneNumber!.isNotEmpty) ...[
            const Divider(color: Color(0xFF283243), height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text('Phone Number', style: TextStyle(color: Color(0xFF959DAD), fontSize: 12)),
                Text(_user.phoneNumber!, style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w600)),
              ],
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildPerformanceCard() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF161C24),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFF283243)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              Text(
                'AI Trading Performance',
                style: TextStyle(color: Color(0xFF959DAD), fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 0.5),
              ),
              Text(
                'Last 30 Days',
                style: TextStyle(color: Color(0xFF636E80), fontSize: 10),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              _buildStatItem('OTC Win Rate', '92.4%', const Color(0xFF00E676)),
              _buildStatItem('Net ROI', '+38.4%', const Color(0xFF00E676)),
              _buildStatItem('Live Setups', '142', const Color(0xFF00B8D9)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildStatItem(String label, String value, Color color) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(color: Color(0xFF959DAD), fontSize: 11)),
        const SizedBox(height: 2),
        Text(
          value,
          style: TextStyle(color: color, fontSize: 18, fontWeight: FontWeight.extrabold),
        ),
      ],
    );
  }

  Widget _buildSettingsSection() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: const Color(0xFF161C24),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFF283243)),
      ),
      child: Column(
        children: [
          SwitchListTile(
            contentPadding: EdgeInsets.zero,
            title: const Text('Dark Mode', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w600)),
            subtitle: const Text('High-contrast dark fintech UI', style: TextStyle(color: Color(0xFF959DAD), fontSize: 11)),
            value: _darkModeEnabled,
            activeColor: const Color(0xFF00E676),
            onChanged: (val) => setState(() => _darkModeEnabled = val),
          ),
          const Divider(color: Color(0xFF283243), height: 1),
          SwitchListTile(
            contentPadding: EdgeInsets.zero,
            title: const Text('Live Signal Alerts', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w600)),
            subtitle: const Text('Instant alerts for high-yield OTC setups', style: TextStyle(color: Color(0xFF959DAD), fontSize: 11)),
            value: _notificationsEnabled,
            activeColor: const Color(0xFF00E676),
            onChanged: (val) => setState(() => _notificationsEnabled = val),
          ),
          const Divider(color: Color(0xFF283243), height: 1),
          SwitchListTile(
            contentPadding: EdgeInsets.zero,
            title: const Text('Auto SL/TP Sync', style: TextStyle(color: Colors.white, fontSize: 13, fontWeight: FontWeight.w600)),
            subtitle: const Text('Automated risk parameters for broker desk', style: TextStyle(color: Color(0xFF959DAD), fontSize: 11)),
            value: _autoSlTpSync,
            activeColor: const Color(0xFF00E676),
            onChanged: (val) => setState(() => _autoSlTpSync = val),
          ),
        ],
      ),
    );
  }

  Widget _buildBrokerCard() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF161C24),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: const Color(0xFF283243)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'BROKER INTEGRATIONS',
            style: TextStyle(color: Color(0xFF959DAD), fontSize: 10, fontWeight: FontWeight.bold, letterSpacing: 0.8),
          ),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              Text('Quotex & Pocket Option', style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w600)),
              Text('OTC Feed Active', style: TextStyle(color: Color(0xFF00E676), fontSize: 11, fontWeight: FontWeight.bold)),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              Text('Binance & MT5', style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w600)),
              Text('Connected (12ms)', style: TextStyle(color: Color(0xFF00B8D9), fontSize: 11, fontWeight: FontWeight.bold)),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              Text('Account ID', style: TextStyle(color: Color(0xFF959DAD), fontSize: 12)),
              Text('TSP-8942-ELITE', style: TextStyle(color: Color(0xFF636E80), fontSize: 11, fontFamily: 'monospace')),
            ],
          ),
        ],
      ),
    );
  }
}
