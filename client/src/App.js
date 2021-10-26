import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import $ from 'jquery';
import { ExportDataList, Main, ExportDataWrite, MonkeyDataWrite, MonkeyDataList, Notice, ExportDataView} from './inc/'

class App extends React.Component {
	componentDidMount(){
		$(document).ready(function(){
			//$('html').addClass('main')
		});
	}

	render(){
		return(
			<>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Main} />
					<Route path="/Main" exact component={Main} />
					<Route path="/ExportDataList" component={ExportDataList} />
					<Route path="/ExportDataView" component={ExportDataView} />
					<Route path="/ExportDataWrite" component={ExportDataWrite} />
					<Route path="/MonkeyDataWrite" component={MonkeyDataWrite} />
					<Route path="/MonkeyDataList" component={MonkeyDataList} />
					<Route path="/Notice" component={Notice} />
				</Switch>
			</BrowserRouter>
			</>
		)
	}
}

export default App;
