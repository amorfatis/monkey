import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router";
import Header from '../inc/header';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import qs from "qs";

function ExportListUp({ type, id, sex, birth, father, mother, weaned, weanedWeight}){
	return (
		<>
		<tr>
			<th scope="row">Species</th>
			<td>{type}</td>
			<th scope="row">ID</th>
			<td>{type}-{sex}-{id}</td>
		</tr>
		<tr>
			<th scope="row">Date of Birth</th>
			<td>{birth}</td>
			<th scope="row">SEX</th>
			<td>{sex}</td>
		</tr>
		<tr>
			<th scope="row">father ID</th>
			<td>{father}</td>
			<th scope="row">mother ID</th>
			<td>{mother}</td>
		</tr>
		<tr>
			<th scope="row">Date of Weaned</th>
			<td>{weaned}</td>
			<th scope="row">Weaned Weight</th>
			<td>{weanedWeight}</td>
		</tr>
		</>
	)
}

function ExportTestDateCreate({index}){
	const [startDate, setStartDate] = useState(new Date());

	return(
		<>
		<tr key={index}>
			<td><DatePicker id={"calender" + index} selected={startDate} onChange={date => setStartDate(date)} /></td>
			<td>
				<select id={"test" + index} className="selectbox" style={{ width:"90%" }} >
					<option>dfadfsdf</option>
				</select>
			</td>
			<td>
				<select id={"result" + index} className="selectbox" style={{ width:"90%" }}>
					<option value="Normal">Normal</option>
					<option value="Neg">Neg</option>
				</select>
			</td>
			<td>
				<select id={"treatment" + index} className="selectbox" style={{ width:"90%" }}>
					<option value="111">111</option>
					<option value="222">222</option>
					<option value="333">333</option>
					<option value="4444">444</option>
				</select>
			</td>
		</tr>
		</>
	)
}

function ExportTestDateView({index, date, examination, result, treatment, modify}){
	return(
		<>
		<tr key={index}>
			<td>{date}</td>
			<td>{examination}</td>
			<td>{result}</td>
			<td>{treatment}</td>
			{
				modify == "Y" ? 
				<td>{index}</td> : ""
			}
		</tr>
		</>
	)
}

export default function ExportDataWrite( {location} ){
	const router = useHistory();
	const query = qs.parse(location.search, {
		ignoreQueryPrefix : true
	})

	const itemCode = query.itemCode;
	const modify = query.modify;
	const [ExportBoardList, setExportBoardList] = useState([]);
	const [ExportTestDataWriteList, setExportTestDataWriteList] = useState([]);	
	const [ExportTestDataList, setExportTestDataList] = useState([]);
	const [ExportTestDataItemCodeList, setExportTestDataItemCodeList] = useState([]);

	useEffect(() => {
		fetch('/api/testdata/IDCODE=' + itemCode)
			.then(async response => {
				const data = await response.json();
				setExportTestDataItemCodeList(data)
			})
			.catch(error => {
				console.error('There was an error!', error);
			});
		
		fetch('/api/testdata')
			.then(async response => {
				const data = await response.json();
				setExportTestDataList(data)
			})
			.catch(error => {
				console.error('There was an error!', error);
			});

        fetch('/api/exportBoard')
            .then(async response => {
                const data = await response.json();
				setExportBoardList(data)
				
				data.map((i) => {
					if(i.IDCODE == itemCode && i.DELETED == 1) {
						window.location = "/ExportDataList";
					}
					if(i.IDCODE == itemCode){
						document.getElementById('cites').value = i.CITES
						document.getElementById('customer').value = i.CUSTOMER
						document.getElementById('destination').value = i.DESTINATION
						document.getElementById('expDate').value = i.EXPDATE
						document.getElementById('contract').value = i.CONTRACT
						document.getElementById('expWeight').value = i.EXPWEIGHT
					}
				})
	        })
            .catch(error => {
                console.error('There was an error!', error);
            });
			if(!itemCode) {
				alert("잘못된 접근입니다.");
				router.push('/ExportDataList');
			}
    }, []);

	const isAvailList = ExportBoardList.map((i) => {
		if(i.IDCODE == itemCode){
			return <ExportListUp id={i.IDCODE} type={i.MTYPE} sex={i.SEX} birth={i.BIRTHDAY} father={i.FATHER} mother={i.MOTHER} weaned={i.WEANED} weanedWeight={i.WEANEDWEIGHT}/>
		}
	})

	const onCreateSelectbox = (e) => {
		e.preventDefault();
		if(ExportTestDataWriteList.length >= 5) {
			alert("한번에 최대 5개까지 추가 가능합니다.")
			return 
		}
		setExportTestDataWriteList(ExportTestDataWriteList.concat(<ExportTestDateCreate />))
	}

	const onDeleteSelectbox = (e) => {
		ExportTestDataWriteList.pop();
		setExportTestDataWriteList(ExportTestDataWriteList)
	}

	const onExpDataIn = (e) => {
		if (window.confirm("정말 수정 하시겠습니까?")) {
			fetch('/api/exportBoard', {
				method : 'PUT',
				headers : {
					'Accept': 'application/json',
					'Content-type': 'application/json'
				},
				body : JSON.stringify({
					IDCODE : itemCode,
					CITES : document.getElementById('cites').value,
					CUSTOMER : document.getElementById('customer').value,
					DESTINATION : document.getElementById('destination').value,
					EXPDATE : document.getElementById('expDate').value,
					CONTRACT : document.getElementById('contract').value,
					EXPWEIGHT : document.getElementById('expWeight').value
				})
			})
			.then(function(text) {
				console.log('Request successful', text);
				alert("수정이 완료 되었습니다.");
				router.push('/ExportDataList');
			})
			.catch(function(error) {
				console.log('Request failed', error)
			});
		}

		e.preventDefault();
	}

	const onCreateSend = (e) => {
		let createLengCheck = ExportTestDataWriteList.length - 1;

		if(createLengCheck < 0){
			alert("테스트 정보를 추가해주세요.")
		}

		 for(let i = 0; i <= createLengCheck; i++) {
			 let indexCheck = ExportTestDataList.length;

			fetch('/api/testdata', {
				method : 'POST',
				headers : {
					'Accept': 'application/json',
					'Content-type': 'application/json'
				},
				body : JSON.stringify({
					INDEXCODE : indexCheck + i,
					IDCODE : itemCode,
					TESTDATE : document.getElementById('calender' + i).value,
					TESTEXAMINATION : document.getElementById('test' + i).value,
					RESULT : document.getElementById('result' + i).value,
					TREATMENT : document.getElementById('treatment' + i).value
				})
			})
			.then(function(text) {
				console.log('Request successful', text);
				window.location.reload();
			})
			.catch(function(error) {
				console.log('Request failed', error)
			});
		 }
	}

	return(
		<>
			<Header />
			<div className="content">
				VINAMEKONG GROIP<br />
				THANH BAC COMMUNE, TAN BIEN DIST, TAYNINH PROVINCE
				<table className="data-view-write">
					<colgroup>
						<col style={{ width : "25%" }} />
						<col style={{ width : "25%" }} />
						<col style={{ width : "25%" }} />
						<col style={{ width : "25%" }} />
					</colgroup>
					<tbody>
						{isAvailList}
						<tr>
							<th scope="row">CITES. NO</th>
							<td><input type="text" id="cites" style={{ width : "100%" }} className="text" /></td>
							<th scope="row">Customer</th>
							<td><input type="text" id="customer" style={{ width : "100%" }} className="text" /></td>
						</tr>
						<tr>
							<th scope="row">Destination</th>
							<td><input type="text" id="destination" style={{ width : "100%" }} className="text" /></td>
							<th scope="row">Exp. Date</th>
							<td><input type="text" id="expDate" disabled="disabled" style={{ width : "90%" }} className="text calender" /></td>
						</tr>
						<tr>
							<th scope="row">Contract. NO</th>
							<td><input type="text" id="contract" style={{ width : "100%" }} className="text" /></td>
							<th scope="row">Exp. Weight(kg)</th>
							<td><input type="text" id="expWeight" style={{ width : "100%" }} className="text" /></td>
						</tr>
					</tbody>
				</table>
				<div className="btn-right">
					<button onClick={onExpDataIn} className="btn-black">정보등록</button>
				</div>
				<h2 className="ctitle">기본정보(최근 5개의 정보만 보여짐)</h2>
				<table className="data-list">
					<colgroup>
						<col style={{ width : "20%" }} />
						<col style={{ width : "20%" }} />
						<col style={{ width : "20%" }} />
						<col style={{ width : "20%" }} />
						{
								modify == "Y" ? 
								<col style={{ width : "20%" }} /> : ""
						}
						
					</colgroup>
					<thead>
						<tr>
							<th scope="row">Date</th>
							<th scope="row">Test/Examination</th>
							<th scope="row">Result</th>
							<th scope="row">Treatment</th>
							{
								modify == "Y" ? 
								<th scope="row">index / 삭제</th> : ""
							}
						</tr>
					</thead>
					<tbody>
						{
							ExportTestDataItemCodeList.length ? ExportTestDataItemCodeList.map((i, index) => {
								if(index < 5){
									return <ExportTestDateView key={i.INDEXCODE} modify={modify} index={i.INDEXCODE} date={i.TESTDATE} examination={i.TESTEXAMINATION} result={i.RESULT} treatment={i.TREATMENT}  />
								}
							}) : 
							<tr>
								<td colSpan="4">테스트 정보가 없습니다.</td>
							</tr>
						}
					</tbody>
				</table>

				<h2 className="ctitle">추가등록(최대 한번에 5개 : 조정가능)</h2>
				<table className="data-list">
					<colgroup>
						<col style={{ width : "25%" }} />
						<col style={{ width : "25%" }} />
						<col style={{ width : "25%" }} />
						<col style={{ width : "25%" }} />
					</colgroup>
					<thead>
						<tr>
							<th scope="row">Date</th>
							<th scope="row">Test/Examination</th>
							<th scope="row">Result</th>
							<th scope="row">Treatment</th>
						</tr>
					</thead>
					<tbody>
						{
							ExportTestDataWriteList.map((i, index) => {
								return <ExportTestDateCreate index={index} />
							})
						}
					</tbody>
				</table>
				
				<div className="btn-right">
					<a href="#id" onClick={onDeleteSelectbox} className="btn-black">삭제</a>
					<a href="#" onClick={onCreateSelectbox} className="btn-black">추가</a>
					<a href="#" onClick={onCreateSend} className="btn-black">등록</a>
				</div>
			</div>
		</>
	)
}