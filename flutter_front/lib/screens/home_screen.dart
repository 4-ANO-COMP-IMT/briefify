// lib/home_page.dart
import 'package:flutter/material.dart';
import 'package:record/record.dart';
import 'dart:async';
import 'package:http/http.dart' as http;
import 'package:http_parser/http_parser.dart';
import 'dart:convert';
import 'dart:io';
import 'package:path_provider/path_provider.dart' as path_provider;

import 'resume.screen.dart';

class HomePage extends StatefulWidget {
  final String userName;

  const HomePage({
    super.key,
    required this.userName,
  });

  @override
  // ignore: library_private_types_in_public_api
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _record = Record();
  bool _isRecording = false;
  Timer? _timer;
  int _recordDuration = 0;

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  String? _filePath;

  void _startRecording() async {
    if (await _record.hasPermission()) {
      Directory appDocDir =
          await path_provider.getApplicationDocumentsDirectory();
      _filePath =
          '${appDocDir.path}/${DateTime.now().millisecondsSinceEpoch}.m4a';

      await _record.start(
        path: _filePath,
        encoder: AudioEncoder.AAC, // Optional
        bitRate: 128000, // Optional
        samplingRate: 44100, // Optional
      );

      setState(() {
        _isRecording = true;
        _recordDuration = 0;
      });
      _startTimer();
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Permissão negada')),
      );
    }
  }

  Future<void> _stopRecording() async {
    await _record.stop();
    _timer?.cancel();

    setState(() {
      _isRecording = false;
      _recordDuration = 0;
    });

    if (_filePath != null && await File(_filePath!).exists()) {
      await _uploadAudio(File(_filePath!));
      _navigateToResume();
    } else {
      print("File at path $_filePath does not exist");
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erro ao encontrar o arquivo de áudio.')),
      );
    }
  }

  Future<void> _uploadAudio(File audioFile) async {
    setState(() {
      _isLoading = true;
    });

    try {
      // Crie uma requisição multipart
      var request = http.MultipartRequest(
        'POST',
        Uri.parse('http://localhost:1234/transcribe'),
      );

      // Adicione o arquivo de áudio
      request.files.add(
        await http.MultipartFile.fromPath(
          'file',
          audioFile.path,
          filename:
              '${DateTime.now().millisecondsSinceEpoch}-audio.m4a', // Use .m4a extension
          contentType:
              MediaType('audio', 'm4a'), // Set content type to audio/m4a
        ),
      );

      // Adicione outros campos, como meetingId
      request.fields['meetingId'] =
          'apresentation'; // Substitua pelo ID real da reunião

      // Envie a requisição
      var response = await request.send();

      if (response.statusCode == 200) {
        // Obtenha a resposta do servidor
        String responseBody = await response.stream.bytesToString();
        var responseData = jsonDecode(responseBody);

        // Aqui você pode extrair os dados necessários, como o resumo
        String resumeText = responseData['resume'] ?? 'Resumo não disponível.';

        // Atualize o estado ou passe os dados conforme necessário
        // Por exemplo, armazenar o resumo para uso posterior
        // Neste caso, já estamos navegando para a página de resumo com dados fixos
      } else {
        // Trate erros de resposta
        // ignore: use_build_context_synchronously
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
              content: Text('Falha ao enviar áudio: ${response.statusCode}')),
        );
      }
    } catch (e) {
      // Trate exceções
      // ignore: use_build_context_synchronously
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erro: $e')),
      );
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  void _startTimer() {
    _timer = Timer.periodic(const Duration(seconds: 1), (Timer t) {
      setState(() {
        _recordDuration++;
      });
    });
  }

  String _formatDuration(int seconds) {
    final int minutes = seconds ~/ 60;
    final int remainingSeconds = seconds % 60;
    final String minutesStr = minutes.toString().padLeft(2, '0');
    final String secondsStr = remainingSeconds.toString().padLeft(2, '0');
    return '$minutesStr:$secondsStr';
  }

  void _navigateToResume() async {
    try {
      var response = await http
          .get(Uri.parse('http://localhost:1234/transcribe/apresentation'));

      if (response.statusCode == 201) {
        // Parse the JSON response
        var responseData = jsonDecode(response.body);
        String resumeText = responseData['summary'] ?? 'Resumo não disponível.';

        // Navigate to ResumePage with the fetched resumeText
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => ResumePage(
              title: 'Resumo da Reunião',
              resumeText: resumeText,
            ),
          ),
        );
      } else {
        // Handle error response
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
              content: Text('Falha ao obter o resumo: ${response.statusCode}')),
        );
      }
    } catch (e) {
      // Handle exceptions
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erro: $e')),
      );
    }
  }

  bool _isLoading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white, // Set Scaffold background to white
      appBar: AppBar(
        title: Text(
          'Olá, ${widget.userName}',
          style: const TextStyle(
            color: Colors.white, // Texto do título em preto
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        iconTheme: const IconThemeData(
          color: Colors.white, // Cor do ícone em preto
        ),
        backgroundColor: const Color.fromRGBO(41, 98, 255, 1),
        elevation: 0,
      ),
      body: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            color: Colors.blueAccent[700],
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const Icon(
                  Icons.multitrack_audio,
                  color: Colors.white,
                  size: 40,
                ),
                const SizedBox(height: 8),
                const Text(
                  'Gravador de Áudio',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 8),
                Center(
                  child: Text(
                    _isRecording
                        ? 'Gravando... ${_formatDuration(_recordDuration)}'
                        : 'Pressione o botão para gravar sua reunião. Deixe o restante com a gente!',
                    style: const TextStyle(
                      color: Colors.white70,
                      fontSize: 16,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
                const SizedBox(height: 8),
              ],
            ),
          ),
          Expanded(
            child: Container(
              decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(30),
                  topRight: Radius.circular(30),
                ),
              ),
              padding: const EdgeInsets.symmetric(
                horizontal: 20,
                vertical: 30,
              ),
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      _formatDuration(_recordDuration),
                      style: const TextStyle(
                        fontSize: 48,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 40),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        ElevatedButton(
                          onPressed: _isRecording ? null : _startRecording,
                          style: ElevatedButton.styleFrom(
                            foregroundColor: Colors.white,
                            backgroundColor: Colors.green,
                            padding: const EdgeInsets.all(20),
                            shape: const CircleBorder(),
                          ),
                          child: const Icon(Icons.mic, size: 36),
                        ),
                        const SizedBox(width: 40),
                        ElevatedButton(
                          onPressed: _isRecording ? _stopRecording : null,
                          style: ElevatedButton.styleFrom(
                            foregroundColor: Colors.white,
                            backgroundColor: Colors.red,
                            padding: const EdgeInsets.all(20),
                            shape: const CircleBorder(),
                          ),
                          child: const Icon(Icons.stop, size: 36),
                        ),
                      ],
                    ),
                    const SizedBox(height: 20),
                    _isLoading
                        ? const CircularProgressIndicator()
                        : Container(),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
