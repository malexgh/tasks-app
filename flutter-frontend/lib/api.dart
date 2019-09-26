import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

userCreate(email, password) async {
  http.Response response = await http.post('http://192.168.1.53:3000/users',
      //'https://ma-task-manager.herokuapp.com/users',
      headers: {"Content-Type": "application/json"},
      body: json
          .encode({"name": "*TODO*", "email": email, "password": password}));
  return response;
}

userLogin(email, password) async {
  http.Response response =
      await http.post('http://192.168.1.53:3000/users/login',
          //'https://ma-task-manager.herokuapp.com/users/login',
          headers: {"Content-Type": "application/json"},
          body: json.encode({"email": email, "password": password}));
  return response;
}

userLogout(token) async {
  http.Response response = await http.post(
      'http://192.168.1.53:3000/users/logout',
      //'https://ma-task-manager.herokuapp.com/users/logout',
      headers: {"Content-Type": "application/json", "Authorization": token});
  return response;
}

Future<List<Task>> fetchTasks(token) async {
  final response = await http.get('http://192.168.1.53:3000/tasks',
      headers: {"Content-Type": "application/json", "Authorization": token});
  print(response.body);
  return compute(parseTasks, response.body);
}

List<Task> parseTasks(String responseBody) {
  print(responseBody);
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
