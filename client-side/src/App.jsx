import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Components/Login';
import HomePage from './Components/Pages/HomePage';

const code = new URLSearchParams(window.location.search).get('code');

const App = () => {

    return (
        code ? <HomePage code={code} /> : <Login />
    )
};

export default App;
