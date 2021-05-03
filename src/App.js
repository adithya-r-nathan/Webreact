import logo from './logo.svg';
import './App.css';

import {Home} from './Home';
import {Genre} from './Genre';
import {Book} from './Book';
import{Navigation} from './Navigation';
import {BrowserRouter,Route,Switch} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className ="m-3 d-flex justify-content-center">
       React JS 
      </h3>

      <Navigation/>
      <Switch>
       <Route path='/' component={Home} exact/>
       <Route path='/genre' component={Genre}/>
       <Route path='/book' component ={Book}/>
      </Switch>

    
    </div>
    </BrowserRouter>
  );
}

export default App;
