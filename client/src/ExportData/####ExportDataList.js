import React from 'react';

export class SelectboxOptions extends React.Component {
    onRemove = (e) => {
        console.log(this.props.id);
    }
    
    render(){
        return(
            <>
                <li key={this.props.id}>
                    <select id={this.props.id} className="selectbox">
                        <option value="11111">11111</option>
                        <option value="22222">22222</option>
                        <option value="33333">33333</option>
                        <option value="44444">44444</option>
                        <option value="55555">55555</option>
                    </select>
                    <input type="text" id="" name="" title="" className="text" />
                    <button onClick={this.onRemove}>삭제</button>
                </li>
            </>
        )
    }
}


class CreateSelectbox extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selectItemIndex : 0,
            selectboxIndex: []
        }
    }

    createSelectboxOnClick = (e) => {
        this.setState({ selectItemIndex : this.state.selectItemIndex + 1 })
        this.setState({ selectboxIndex : this.state.selectboxIndex.concat(<SelectboxOptions id={"selectbox" + this.state.selectItemIndex} />) })
        
        e.preventDefault();
    }

    sendSelectbox = (e) => {
        for(var i = 0; i <= this.state.selectItemIndex -1; i++){
            let selectboxID = document.getElementById("selectbox" + i),
                selectboxIndexCheck = selectboxID.options[selectboxID.selectedIndex].value;
            console.log(selectboxIndexCheck);
        }
        e.preventDefault();
    }

    
    
    render(){
        const selectBoxData = this.state.selectboxIndex.map((i) => {
            return <SelectboxOptions key={i.props.id} id={i.props.id} />
        })
        const la = <bbcddd />

        return(
            <>
                <ul className="selectbox">
                    {selectBoxData == 0 ? "셀렉트박스 생성을 눌러 추가해주세요." : selectBoxData}
                </ul>
                <a href="#" onClick={this.createSelectboxOnClick}>셀렉트박스 생성</a>
                <a href="#" onClick={this.sendSelectbox}>셀렉트박스 보내기</a>
            </>
        )
    }
}

export default CreateSelectbox;