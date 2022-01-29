import { Web3ReactProvider } from '@web3-react/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Web3Provider } from '@ethersproject/providers';
import Header from './components/Header';
import Home from './components/Home';

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const App = (): JSX.Element => {
  return (
    <div className="App bg-yellow-50 h-screen text-yellow-700">
      <Router>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Header />
          <Switch>
            <Route path={'/'}>
              <Home />
            </Route>
          </Switch>
        </Web3ReactProvider>
      </Router>
    </div>
  );
};

export default App;
