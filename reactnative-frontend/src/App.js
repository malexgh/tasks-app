import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './pages/login';
import TasksScreen from './pages/tasks';

const MainNavigator = createStackNavigator({
  Login: {screen: LoginScreen},
  Tasks: {screen: TasksScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
