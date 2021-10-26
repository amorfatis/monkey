import React from 'react';
import Header from './inc/header';

class Main extends React.Component {
    render(){
        return (
           <>
           <Header />
           <fieldset className="main-search">
				<legend>검색</legend>
				<div className="in-search">
					<label for="search">검색 ID</label>
					<input type="text" id="search" className="text" title="검색 ID 입력" placeholder="ID NO." /><button className="btn-black">검색</button>
				</div>
			</fieldset>
           </>
        )
    }
}

export default Main;