import 'dart:math';
import 'package:flutter/material.dart';
import 'api.dart';

class TasksPage extends StatefulWidget {
  final Api api;

  const TasksPage({
    Key key,
    @required this.api,
  }) : super(key: key);

  @override
  _TasksPageState createState() => _TasksPageState();
}

class _TasksPageState extends State<TasksPage> {
  //final Api api = Api();

  @override
  Widget build(BuildContext context) {
    //print('Tasks - Token: ' + widget.token);
    //api.setToken(widget.token);
    return Scaffold(
      appBar: AppBar(
        title: Text('Tasks'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.add),
            onPressed: () async {
              //TODO 1: add new task - no fake data
              var res =
                  await widget.api.taskAdd('Task ${Random().nextInt(100)}');
              print(res.statusCode);
              if (res.statusCode == 200) {
                //ok
              }
            },
          ),
          IconButton(
            icon: Icon(Icons.close),
            onPressed: () async {
              var res = await widget.api.userLogout();
              print(res.statusCode);
              if (res.statusCode == 200) {
                Navigator.pushReplacementNamed(context, '/login');
              }
            },
          ),
        ],
      ),
      body: FutureBuilder<List<Task>>(
        future: widget.api.fetchTasks(),
        builder: (context, snapshot) {
          if (snapshot.hasError) print(snapshot.error);
          return snapshot.hasData
              ? TasksList(tasks: snapshot.data)
              : Center(child: CircularProgressIndicator());
        },
      ),
    );
  }
}

class TasksList extends StatelessWidget {
  final List<Task> tasks;

  TasksList({Key key, this.tasks}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: tasks.length,
      itemBuilder: (context, index) {
        return Card(
          child: ListTile(
            title: Text(tasks[index].description),
            trailing: Checkbox(value: tasks[index].completed),
          ),
        );
      },
    );
  }
}
