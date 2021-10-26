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
function BoardExportPreviewList({cites, customer, destination, exp, contract, weight}) {
	return(
		<>
		<tr>
			<th scope="row">CITES. NO</th>
			<td>{cites}</td>
			<th scope="row">Customer</th>
			<td>{customer}</td>
		</tr>
		<tr>
			<th scope="row">Destination</th>
			<td>{destination}</td>
			<th scope="row">Exp. Date</th>
			<td>{exp}</td>
		</tr>
		<tr>
			<th scope="row">Contract. NO</th>
			<td>{contract}</td>
			<th scope="row">Exp. Weight(kg)</th>
			<td>{weight}</td>
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
	const [AllBoardList, setAllBoardList] = useState([]);
	const [ExportBoardList, setExportBoardList] = useState([]);
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

        fetch('/api/exportBoard')
            .then(async response => {
                const data = await response.json();
				setExportBoardList(data)
				
				data.map((i) => {
					if(i.IDCODE == itemCode && i.DELETED == 1) {
						window.location = "/ExportDataList";
						alert("원숭이 정보가 없습니다.");
						return
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
				return 
			}

		fetch('/api/exportBoard')
            .then(async response => {
                const data = await response.json();
				setAllBoardList(data);
	        })
            .catch(error => {
                console.error('There was an error!', error);
            });
			if(!itemCode) {
				alert("잘못된 접근입니다.");
				router.push('/ExportDataList');
				return 
			}
    }, []);

	const isAvailList = ExportBoardList.map((i) => {
		if(i.IDCODE == itemCode){
			return <ExportListUp id={i.IDCODE} type={i.MTYPE} sex={i.SEX} birth={i.BIRTHDAY} father={i.FATHER} mother={i.MOTHER} weaned={i.WEANED} weanedWeight={i.WEANEDWEIGHT}/>
		}
	})

	const isAllBoardList = ExportBoardList.map((i) => {
		if(i.IDCODE == itemCode){
			return <BoardExportPreviewList cites={i.CITES} customer={i.CUSTOMER} destination={i.DESTINATION} exp={i.EXPDATE} contract={i.CONTRACT} weight={i.EXPWEIGHT} />
		}
	})

	return(
		<>
			<Header />
			<hr />
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
						{isAllBoardList}
					</tbody>
				</table>

				<h2 className="ctitle">기본정보</h2>
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
							ExportTestDataItemCodeList.length ? ExportTestDataItemCodeList.map((i) => {
								return <ExportTestDateView key={i.INDEXCODE} modify={modify} index={i.INDEXCODE} date={i.TESTDATE} examination={i.TESTEXAMINATION} result={i.RESULT} treatment={i.TREATMENT}  />
							}) : 
							<tr>
								<td colSpan="4">테스트 정보가 없습니다.</td>
							</tr>
						}
					</tbody>
				</table>
				<div className="btn-right">
					authorized By / Mr. Xuan Quang / Date
				</div>
			</div>
		</>
	)
}