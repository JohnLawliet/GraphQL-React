import './App.css';
import Launches from './components/launches'
import Launch from './components/launch'
import {ReactComponent as ReactLogo} from './assets/spaceX.svg';
import {Route, Switch} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <div className="logo">
        <ReactLogo className="mb-5"/>
      </div>    
      <Switch>
        <Route exact path="/" component={Launches} />
        <Route path="/launch/:flight_number" component={Launch}/>
      </Switch>
       
    </div>
  );
}

export default App;
