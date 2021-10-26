import React, { useState, useEffect } from 'react';

const BoardList = (inData) => {
    const [defaultBoardData, setBoardData] = useState([]);
    const [SelectSearchData, setSelectSearchData] = useState("A");

    useEffect(() => {
        fetch('/api/board')
            .then(async response => {
                const data = await response.json();
                setBoardData(data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const onSearchBtn = (e) => {
        const selectBoxData = document.getElementById('choice').options.selectedIndex;
        const selectValue =  document.getElementById('choice').options[selectBoxData].value;

        setSelectSearchData(selectValue)
        e.preventDefault();
    }

    const dataList = defaultBoardData && defaultBoardData.map((i) => {
        if(SelectSearchData == "A") {
            return <li key={i.IDCODE}>{i.IDCODE}</li>
        } else if(i.SEX == SelectSearchData){
            return <li key={i.IDCODE}>{i.IDCODE}</li>
        }
    })

    return (
        <>
            <fieldset className="search">
				<legend>검색</legend>
				<select id="choice" className="selectbox" title="수출여부 선택">
					<option value="A">전체</option>
					<option value="F">F</option>
					<option value="M">M</option>
				</select>
				<button className="btn-black" onClick={onSearchBtn}>검색</button>
			</fieldset>
            {dataList}
        </>
    )
}

export default BoardList;