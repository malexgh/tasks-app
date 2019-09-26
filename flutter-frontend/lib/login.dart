import 'dart:convert';
import 'package:flutter/material.dart';
import 'api.dart';
import 'utils.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  int _action = 0; //0=login 1=create account
  final List<String> _btnLabel = ['Login', 'Create Account'];
  final _formKey = GlobalKey<FormState>();
  bool _autoValidate = false;
  bool _isLoading = false;
  String _error = '';
  String _email;
  String _password;

  void _switchAction() {
    setState(() {
      _action = 1 - _action;
    });
  }

  void _doAction() async {
    if (!_formKey.currentState.validate()) {
      setState(() {
        _autoValidate = true;
      });
      return;
    }
    setState(() {
      _isLoading = true;
      _error = '';
    });
    _formKey.currentState.save();
    try {
      var res;
      if (_action == 0) {
        res = await userLogin(_email, _password);
      } else {
        res = await userCreate(_email, _password);
      }
      if (res.statusCode == 200 || res.statusCode == 201) {
        var token = jsonDecode(res.body)['token'];
        Navigator.pushReplacementNamed(context, '/tasks', arguments: token);
      } else {
        print('Body: ' + res.body);
        _error = 'Status Code: ' + res.statusCode.toString();
      }
    } catch (ex) {
      _error = ex.toString();
    }
    if (_error.isNotEmpty) {
      showAlertDialog(
          context, 'Error', 'Something went wrong!\n' + _error, 'OK');
    }
    setState(() {
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login'),
      ),
      body: Form(
        key: _formKey,
        autovalidate: _autoValidate,
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              TextFormField(
                decoration: InputDecoration(labelText: 'Email'),
                keyboardType: TextInputType.emailAddress,
                onSaved: (val) => _email = val,
                validator: (val) =>
                    isValidEmail(val) ? null : 'Not a valid email!',
              ),
              TextFormField(
                decoration: InputDecoration(labelText: 'Password'),
                keyboardType: TextInputType.visiblePassword,
                onSaved: (val) => _password = val,
                obscureText: true,
                validator: (val) =>
                    isValidPassword(val) ? null : 'Not a valid password!',
              ),
              RaisedButton(
                child: Text(_btnLabel[_action]),
                onPressed: _isLoading ? null : _doAction,
              ),
              FlatButton(
                child: Text('Switch to ' + _btnLabel[1 - _action]),
                onPressed: _isLoading ? null : _switchAction,
              ),
              if (_isLoading) CircularProgressIndicator(),
            ],
          ),
        ),
      ),
    );
  }
}
