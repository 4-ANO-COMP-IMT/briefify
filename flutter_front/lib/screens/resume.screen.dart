// lib/resume_page.dart
import 'package:flutter/material.dart';

class ResumePage extends StatelessWidget {
  final String title;
  final String resumeText;

  const ResumePage({
    super.key,
    required this.title,
    required this.resumeText,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white, // Set the background color to white
      appBar: AppBar(
        iconTheme: const IconThemeData(
          color: Colors.white, // Sets the icon color to black
        ),
        backgroundColor: Colors.white, // Set AppBar background to white
        elevation: 0,
        title: Text(
          title,
          style: const TextStyle(
            color: Colors.black, // Set title text color to black
            fontSize: 28,
            fontWeight: FontWeight.bold,
          ),
          textAlign: TextAlign.center, // Center-aligns the title
        ),
        centerTitle: true, // Centers the title in the AppBar
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(
          horizontal: 20,
          vertical: 30,
        ),
        child: Center(
          child: Text(
            resumeText,
            style: const TextStyle(
              fontSize: 16,
              color: Colors.black87,
            ),
            textAlign: TextAlign.center, // Center-aligns the text
          ),
        ),
      ),
    );
  }
}
