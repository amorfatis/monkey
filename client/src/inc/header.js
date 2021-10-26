import React from 'react';

class Header extends React.Component {
	render(){
		return (
			<>
			<header className="header">
				<ul className="nav">
					<li><a href="/">HOME</a></li>
					{/* <li><a href="/MonkeyDataWrite">원숭이 정보 등록</a></li> */}
					<li><a href="/MonkeyDataList">원숭이 정보 리스트</a></li>
					<li><a href="/ExportDataList">원숭이 테스트 및 수출 정보등록</a></li>
					<li><a href="/Notice">공지사항</a></li>
				</ul>
			</header>
			</>
        )
    }
}

export default Header;