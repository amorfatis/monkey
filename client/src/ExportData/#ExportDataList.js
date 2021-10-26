import React from 'react';
import Header from '../inc/header'
import { ndateNowToday } from '../inc/getDate'

const pageNote = {
    id : '리스트',
    today : ndateNowToday
}

class ExportDataList extends React.Component {
    state = {
        item : ""
    }

    componentDidMount(){
        this.callApi()
        .then(res => this.setState({item : res}))
        .catch(err => console.log(err));
    }

    callApi = async () => {
        const respone = await fetch('/api/board');
        const body = await respone.json();
        return body;
    }

    render(){
        return (
           <>
            <Header id={pageNote.id} />
            <section className="contents">
            <p className="date">
                Date of export : {pageNote.today}
            </p>

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
                        this.state.item ? this.state.item.map(c => {
                            return (
                                <>
                                <tr>
                                    <td>{c.IDCODE}</td>
                                    <td>{c.SEX}</td>
                                    <td>{c.WEIGHT}</td>
                                    <td>{c.BIRTHDAY}</td>
                                </tr>
                                </>
                            )
                        }) : 
                        <tr>
                            <td colspan="4">데이터가 없습니다.</td>
                        </tr>
                    }
                    </tbody>
                </table>
            <div className="btn-right">
                <button className="btn-black">엑셀다운로드</button>
                <button className="btn-black">엑셀다운로드</button>
            </div>
            </section>
           </>
        )
    }
}

export default ExportDataList;