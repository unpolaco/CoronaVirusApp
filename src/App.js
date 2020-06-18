import React from 'react';
import CountryPage from './components/CountryPage';
import GlobalPage from './components/GlobalPage';
import styles from './App.module.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {CountryContextProvider} from './context/country_context'
import ScrollToTop from './components/Scroll_To_Top'

function App() {
	return (
		<CountryContextProvider>
		<div className={styles.app}>
			<Router>
			<ScrollToTop />
				<Switch>
					<Route exact path='/' component={GlobalPage} />
					<Route path='/countryPage' component={CountryPage} />
				</Switch>
			</Router>
		</div>
		</CountryContextProvider>
	);
}

export default App;
