import React, { useEffect } from 'react';
import { useHistory } from "react-router";
import qs from "qs";
import Header from "../inc/header";

function MonKeyWrite({location}){
	const query = qs.parse(location.search, {
		ignoreQueryPrefix : true
	})

	const itemCode = query.itemCode;

	const router = useHistory();
	const apt = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	const aptList = apt.map((i, index) => {
		return <option value={i} key={index}>{i}</option>;
	})

	let lastIndexCheck = null;

	let CageData1 = [];
	let CageData2 = [];
	let RowData = [];
	let matchCode = false;

	for (let i = 1; i <= 100; i++) {
		CageData1.push(<option key={"cageData1-" + i} value={i}>{i}</option>);
	}

	for (let i = 1; i <= 100; i++) {
		CageData2.push(<option key={"cageData2-" + i} value={i}>{i}</option>);
	}

	for (let i = 1; i <= 100; i++) {
		RowData.push(<option key={"RowData-" + i} value={i}>{i}</option>);
	}

	useEffect(() => {
        fetch('/api/board')
            .then(async response => {
                const data = await response.json();

				data.map((i, index) => {
					if(index == 0) {
						lastIndexCheck = i.IDCODE + 1;
					}

					if(i.IDCODE == itemCode) {
						matchCode = i.IDCODE == itemCode
						document.getElementById('idCode').value = itemCode;
						document.getElementById('type').value = i.MTYPE;
						document.getElementById('father').value = i.FATHER;
						document.getElementById('mother').value = i.MOTHER;
						document.getElementById('sex').value = i.SEX;
						document.getElementById('nWeight').value = i.WEIGHT;
						document.getElementById('birthday').value = i.BIRTHDAY;
						document.getElementById('weaned').value = i.WEANED;
						document.getElementById('weanedWeight').value = i.WEANEDWEIGHT;
						document.getElementById('Row1').value = i.ROW1;
						document.getElementById('CageData1').value = i.CAGE1;
						document.getElementById('Row2').value = i.ROW2;
						document.getElementById('CageData2').value = i.CAGE2;
					}
				})

				 if(matchCode){
					document.getElementById('modify').style.display = "inline-block"
					document.getElementById('send').style.display = "none"
				 } else if(!matchCode) {
					document.getElementById('modify').style.display = "none"
					document.getElementById('send').style.display = "inline-block"
					router.push('/MonkeyDataWrite');
					document.getElementById('idCode').value = lastIndexCheck
				 }
           })
            .catch(error => {
                console.error('There was an error!', error);
            });
	}, []);

	const MonkeyCancel = (e) => {
		router.push('/MonkeyDataList');
		e.preventDefault();
	}

	const MonkeyModify = (e) => {
		if (window.confirm("정말 수정 하시겠습니까?")) {
			fetch('/api/board', {
				method : 'PUT',
				headers : {
					'Accept': 'application/json',
					'Content-type': 'application/json'
				},
				body : JSON.stringify({
					IDCODE : itemCode,
					MTYPE : document.getElementById('type').value,
					FATHER : document.getElementById('father').value,
					MOTHER : document.getElementById('mother').value,
					SEX : document.getElementById('sex').value,
					WEIGHT : document.getElementById('nWeight').value,
					BIRTHDAY : document.getElementById('birthday').value,
					WEANED : document.getElementById('weaned').value, 
					WEANEDWEIGHT : document.getElementById('weanedWeight').value,
					ROW1 : document.getElementById('Row1').value,
					CAGE1 : document.getElementById('CageData1').value,
					ROW2 : document.getElementById('Row2').value,
					CAGE2 : document.getElementById('CageData2').value
				})
			})
			.then(function(text) {
				console.log('Request successful', text);
				alert("수정이 완료 되었습니다.");
				router.push('/MonkeyDataList');
			})
			.catch(function(error) {
				console.log('Request failed', error)
			});
		}

		e.preventDefault();
	}

	const MonkeySend = (e) => {
		if(document.getElementById('nWeight').value == "") {
			alert("N. Weight 값이 없습니다.")
			document.getElementById('nWeight').focus();
			return;
		}

		if(document.getElementById('birthday').value == "") {
			alert("Date of Birth 값이 없습니다.")
			document.getElementById('birthday').focus();
			return;
		}

		if (window.confirm("정말 등록 하시겠습니까?")) {
			fetch('/api/board', {
				method : 'POST',
				headers : {
					'Accept': 'application/json',
					'Content-type': 'application/json'
				},
				body : JSON.stringify({
					IDCODE : document.getElementById('idCode').value,
					MTYPE : document.getElementById('type').value,
					FATHER : document.getElementById('father').value,
					MOTHER : document.getElementById('mother').value,
					SEX : document.getElementById('sex').value,
					WEIGHT : document.getElementById('nWeight').value,
					BIRTHDAY : document.getElementById('birthday').value,
					WEANED : document.getElementById('weaned').value, 
					WEANEDWEIGHT : document.getElementById('weanedWeight').value,
					ROW1 : document.getElementById('Row1').value,
					CAGE1 : document.getElementById('CageData1').value,
					ROW2 : document.getElementById('Row2').value,
					CAGE2 : document.getElementById('CageData2').value
				})
			})
			.then(function(text) {
				console.log('Request successful', text);
				alert("정상적으로 등록이 완료되었습니다.")
				router.push('/MonkeyDataList');
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
			<table className="data-view-write">
				<colgroup>
					<col style={{width:"15%"}} />
					<col style={{width:"35%"}} />
					<col style={{width:"15%"}} />
					<col style={{width:"35%"}} />
				</colgroup>
				<tbody>
					<tr>
						<th scope="row">ID *</th>
						<td>
							<select id="type" className="selectbox" style={{ width:"100%" }} title="종류 선택">
								<option value="S">S</option>
								<option value="R">R</option>
							</select>
							<select id="sex" className="selectbox" style={{ width:"100%" }} title="성별 선택">
								<option value="M">M</option>
								<option value="F">F</option>
							</select>
							<input type="text" id="idCode" style={{ width:"100%" }} disabled="disabled" className="text" />
						</td>
						<th scope="row">N. Weight *</th>
						<td>
							<input type="number" id="nWeight" style={{ width:"100%" }} title="N. Weight 입력" className="text" />
						</td>
					</tr>
					<tr>
						<th scope="row">Date of Birth *</th>
						<td colSpan="3">
							<input type="text" id="birthday" disabled="disabled" style={{ width:"80%" }} title="Date of Birth 입력" className="text calender" />
						</td>
					</tr>
					<tr>
						<th scope="row">Weaned</th>
						<td>
							<input type="text" id="weaned" disabled="disabled" style={{ width:"80%" }} title="Weaned 입력" className="text calender" />
						</td>
						<th scope="row">Weaned Weight</th>
						<td>
							<input type="number" id="weanedWeight" style={{ width:"80%" }} title="Weaned Weight 입력" className="text" />
						</td>
					</tr>
					<tr>
						<th scope="row">Father ID</th>
						<td>
							<input type="number" id="father" style={{ width:"100%" }} title="Father ID 입력" className="text" />
						</td>
						<th scope="row">Mother ID</th>
						<td>
							<input type="number" id="mother" style={{ width:"100%" }} title="Mother ID 입력" className="text" />
						</td>
					</tr>
					<tr>
						<th scope="row">Row / Cage * </th>
						<td colSpan="3">
							<ul className="pack-list">
								<li>
									<strong className="name">ROW</strong>
									<select id="Row1" className="selectbox">
										{aptList}
									</select>
								</li>
								<li>
									<strong className="name">Cage</strong>
									<select id="CageData1" className="selectbox">
										{CageData1}
									</select>
								</li>
								<li>
									<strong className="name">ROW</strong>
									<select id="Row2" className="selectbox">
										{RowData}
									</select>
								</li>
								<li>
									<strong className="name">Cage</strong>
									<select id="CageData2" className="selectbox">
										{CageData2}
									</select>
								</li>
							</ul>
						</td>
					</tr>
				</tbody>
			</table>
			<div className="btn-center">
				<button className="btn-cancel" onClick={MonkeyCancel}>취소</button>
				<button className="btn-black" id="modify" onClick={MonkeyModify}>수정</button>
				<button className="btn-black" id="send" onClick={MonkeySend}>등록</button>
			</div>
		</>
	)
}

export default MonKeyWrite;