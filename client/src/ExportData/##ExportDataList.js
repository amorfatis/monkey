import React, { useState } from 'react';

export class BoardList extends React.Component {
    render(){
		return (
			<>
			<tr>
                <td>{this.props.searchId}</td>
                <td>{this.props.searchSex}</td>
                <td>{this.props.searchWeight}</td>
                <td>{this.props.searchBirthday}</td>
            </tr>
			</>
        )
    }
}

class ExportDataList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            item : '',
            sex : '',
            weight : '',
            birthday : '',
            selectOptions : '',
            inSearchData :''
        }
    }

    componentDidMount() {
        fetch('/api/board')
            .then(async response => {
                const data = await response.json();
                this.setState({ item : data });

            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }
    onSearchDataChange = (e) => {
        let searchKeyword = {};
        searchKeyword[e.target.name] = e.target.value;
        this.setState(searchKeyword);
    }
    onSearchSelectbox = (e) => {
        this.setState({ selectOptions : e.target.value })
    }

    render(){
        const datafillter = (data) => {
            data = data.filter((c) => {
                return String(c.IDCODE).indexOf(this.state.inSearchData) > -1
            });

             return data.map((c) => {
                 return <BoardList key={c.IDCODE} searchId={c.IDCODE} searchSex={c.SEX} searchWeight={c.WEIGHT} searchBirthday={c.BIRTHDAY} />
             });
        }
       
        return (
            <>
            <fieldset className="search">
				<legend>검색</legend>
				<select className="selectbox" title="수출여부 선택" onChange={this.onSearchSelectbox}>
					<option>전체</option>
					<option>F</option>
					<option>M</option>
				</select>
				<input type="text" name="inSearchData" value={this.state.inSearchData} onChange={this.onSearchDataChange} placeholder="ID NO." title="검색어 입력" />
				<button className="btn-black">검색</button>
			</fieldset>
            <table className="data-list">
                <caption></caption>
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">SEX</th>
                        <th scope="col">WEIGHT</th>
                        <th scope="col">BIRTHDAY</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.item ? datafillter(this.state.item) : 
                        <tr>
                            <td colSpan="4">데이터가 없습니다.</td>
                        </tr>
                    }
                </tbody>
            </table>
            </>
        )
    }
}

export default ExportDataList;