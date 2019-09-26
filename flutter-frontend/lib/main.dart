import 'package:flutter/material.dart';
import 'login.dart';
import 'tasks.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.deepPurple,
        buttonTheme: ButtonThemeData(
          buttonColor: Colors.deepPurple,
          textTheme: ButtonTextTheme.primary,
        ),
      ),
      onGenerateRoute: (settings) {
        var route;
        switch (settings.name) {
          case '/tasks':
            final String token = settings.arguments;
            route = MaterialPageRoute(
              builder: (context) {
                return TasksPage(
                  token: token,
                );
              },
            );
            break;
          case '/login':
            route = MaterialPageRoute(
              builder: (context) {
                return LoginPage();
              },
            );
            break;
        }
        return route;
      },
      home: LoginPage(),
    );
  }
}
