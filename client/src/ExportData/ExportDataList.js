import React from 'react';
import { useEffect, useState } from 'react';
import Header from "../inc/header";

function ListMapping({key, type, sex, id}){
    const onExportBind = (e) => {
        window.location.href = "/ExportDataWrite?itemCode=" + id;
    }
    const onExportViewBind = (e) => {
        window.location.href = "/ExportDataView?itemCode=" + id;
    }
	
	return (
		<>
			<tr key={key}>
                <td><input type="checkbox" id={"export" + id} className="checkbox" /></td>
                <td>{type}-{sex}-{id}</td>
                <td>
                    <button onClick={onExportViewBind} className="btn-modify">보기</button>
					<button onClick={onExportBind} className="btn-delete">입력</button>
                </td>
			</tr>
		</>
	)
}


export default function ExportDataList(){
    const [BoardData, setBoardData] = useState([]);

	useEffect(() => {
        fetch('/api/board')
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
			return <ListMapping key={i.IDCODE} id={i.MTYPE, i.SEX, i.IDCODE} sex={i.SEX} type={i.MTYPE} />
		}
	})

    return(
        <>
            <Header />

            <hr />

            <div className="content">
                <table className="data-list" style={{ marginTop : "0" }}>
                    <colgroup>
                        <col style={{ width : "10%" }} />
                        <col style={{ width : "45%" }} />
                        <col style={{ width : "45%" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th scope="col">선택</th>
                            <th scope="col">IDCODE</th>
                            <th scope="col">기타</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isDelete}
                    </tbody>
                </table>
            </div>
        </>
    )
}