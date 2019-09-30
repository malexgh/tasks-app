import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

const _baseUrl = 'http://192.168.1.53:3000'; //DEV
//const _baseUrl = 'https://ma-task-manager.herokuapp.com'; //PROD

class Api {
  String _token;

  void setToken(String token) {
    _token = token;
  }

  userCreate(email, password) async {
    http.Response response = await http.post('$_baseUrl/users',
        headers: {"Content-Type": "application/json"},
        body: json
            .encode({"name": "*TODO*", "email": email, "password": password}));
    return response;
  }

  userLogin(email, password) async {
    http.Response response = await http.post('$_baseUrl/users/login',
        headers: {"Content-Type": "application/json"},
        body: json.encode({"email": email, "password": password}));
    return response;
  }

  userLogout() async {
    http.Response response = await http.post('$_baseUrl/users/logout',
        headers: {"Content-Type": "application/json", "Authorization": _token});
    return response;
  }

  taskAdd(description) async {
    http.Response response = await http.post('$_baseUrl/tasks',
        headers: {"Content-Type": "application/json", "Authorization": _token},
        body: json.encode({"description": description}));
    return response;
  }

  Future<List<Task>> fetchTasks() async {
    final response = await http.get('$_baseUrl/tasks',
        headers: {"Content-Type": "application/json", "Authorization": _token});
    //print(response.body);
    return compute(parseTasks, response.body);
  }
}

List<Task> parseTasks(String responseBody) {
  //print(responseBody);
  final parsed = json.decode(responseBody).cast<Map<String, dynamic>>();
  return parsed.map<Task>((json) => Task.fromJson(json)).toList();
}

class Task {
  final String id;
  final String description;
  final bool completed;
  final String owner;
  final String createdAt;
  final String updatedAt;

  Task(
      {this.id,
      this.description,
      this.completed,
      this.owner,
      this.createdAt,
      this.updatedAt});

  factory Task.fromJson(Map<String, dynamic> json) {
    print(json);
    return Task(
      id: json['id'] as String,
      description: json['description'] as String,
      completed: json['completed'] as bool,
      owner: json['owner'] as String,
      createdAt: json['createdAt'] as String,
      updatedAt: json['updatedAt'] as String,
    );
  }
}
