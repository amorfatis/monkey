import React, { isValidElement, useEffect, useState } from 'react';
import { useHistory } from "react-router";
import Header from "../inc/header";

function ListMapping({key, id, type, father, mother, sex, weight, birth, row1, cage1, row2, cage2}){
	const router = useHistory();
	const onDeleteData = (e) => {
		if (window.confirm("정말 삭제 하시겠습니까?")) {
			fetch('/api/board/' + id, {
				method : 'DELETE'
			})
			.then(function(text) {
				console.log('Request successful', text);
				alert("정상적으로 삭제가 완료되었습니다.")
				window.location.reload();
			})
			.catch(function(error) {
				console.log('Request failed', error)
			});
			e.preventDefault();
		}
	}

	const onModifyData = (e) => {
		window.location="/MonkeyDataWrite?itemCode=" + id
	}

	return (
		<>
			<tr key={key}>
				<td>{type} - {sex} - {id}</td>
				<td>{type}</td>
				<td>{father}</td>
				<td>{mother}</td>
				<td>{sex}</td>
				<td>{weight}</td>
				<td>{birth}</td>
				<td>{row1}</td>
				<td>{cage1}</td>
				<td>{row2}</td>
				<td>{cage2}</td>
				<td>
					<button onClick={onModifyData} className="btn-modify">수정</button>
					<button onClick={onDeleteData} className="btn-delete">삭제</button>
				</td>
			</tr>
		</>
	)
}

function MonkeyDataList() {
	const [BoardData, setBoardData] = useState([]);

	useEffect(() => {
        fetch('/api/board/')
            .then(async response => {
                const data = await response.json();
				setBoardData(data)
	        })
            .catch(error => {
                console.error('There was an error!', error);
            });
			
    }, []);

	const isDelete = BoardData && BoardData.map((i) => {
		if(i.DELETED == 0){
			return <ListMapping key={i.IDCODE} id={i.MTYPE, i.SEX, i.IDCODE} type={i.MTYPE} father={i.FATHER} mother={i.MOTHER} sex={i.SEX} weight={i.WEIGHT} birth={i.BIRTHDAY} row1={i.ROW1} cage1={i.CAGE1} row2={i.ROW2} cage2={i.CAGE2} deleted={i.DELETED}/>
		}
	})

	return(
		<>
			<Header />
			<table className="data-list">
				<colgroup>
					<col style={{ width : "10%" }} />
					<col style={{ width : "9%" }} />
					<col style={{ width : "9%" }} />
					<col style={{ width : "9%" }} />
					<col style={{ width : "9%" }} />
					<col style={{ width : "9%" }} />
					<col style={{ width : "9%" }} />
					<col style={{ width : "9%" }} />
					<col style={{ width : "9%" }} />
					<col style={{ width : "9%" }} />
				</colgroup>
				<thead>
					<tr>
						<th scope="col">IDCODE</th>
						<th scope="col">Type</th>
						<th scope="col">Father ID</th>
						<th scope="col">Mother ID</th>
						<th scope="col">Sex</th>
						<th scope="col">N. Weight</th>
						<th scope="col">date of Birth</th>
						<th scope="col">Row</th>
						<th scope="col">Cage</th>
						<th scope="col">Row</th>
						<th scope="col">Cage</th>
						<th scope="col">기타</th>
					</tr>
				</thead>
				<tbody>
					{isDelete}
				</tbody>
			</table>
			<div className="btn-right">
				<a href="/MonkeyDataWrite" role="button" className="btn-black">등록</a>
			</div>
		</>
	)
}

export default MonkeyDataList;