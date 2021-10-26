import React, { useState } from 'react';
import Header from '../inc/header';
import { ndateNowToday } from '../inc/getDate';

function ExportDataList(){
	const [inputs, setInputs] = useState({
		idcode: '',
		sex : '',
		weight : '',
		birthday : ndateNowToday
	});
	
	const { idcode, sex, weight } = inputs;

	const inputChangeData = (e) => {
		const { value, name } = e.target;
			setInputs({
			...inputs,
			[name]: value
		});
	};

	const onBoardClickData = (e) => {
		if (window.confirm("정말 등록 하시겠습니까?")) {
			fetch('/api/board', {
				method : 'POST',
				headers : {
					'Accept': 'application/json',
					'Content-type': 'application/json'
				},
				body : JSON.stringify({
					idcode: inputs.idcode,
					sex : inputs.sex,
					weight : inputs.weight,
					birthday : document.getElementById('birthday').value
				})
			})
			.then(function(text) {
				console.log('Request successful', text);
				window.location="/ExportDataList"
			})
			.catch(function(error) {
				console.log('Request failed', error)
			});
		}

		e.preventDefault();
	}

	return(
		<>
			<Header />
			<section className="contents">
			<p className="date">
				Date of export : {ndateNowToday}
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
					<tr>
						<td><input type="text" id="idcode" name="idcode" value={idcode} className="text" title="ID 입력" onChange={inputChangeData} style={{width:100}} /></td>
						<td><input type="text" id="sex" name="sex" value={sex} className="text" title="SEX 입력" onChange={inputChangeData} style={{width:100}} /></td>
						<td><input type="text" id="weight" name="weight" value={weight} className="text" title="N. Weight 입력" onChange={inputChangeData} style={{width:100}} /></td>
						<td><input type="text" id="birthday" className="text calender" title="Date of Birth 입력" style={{width:80}} /></td>
					</tr>
				</tbody>
			</table>
			<div className="btn-right">
				<button className="btn-black" onClick={onBoardClickData}>등록</button>
			</div>
			</section>
		</>
	)
}

export default ExportDataList;