function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
            <style jsx>{`
                .square {
                    width: 33.333%;
                    padding-top:16.6665%;
                    padding-bottom:16.6665%;
                    height:33.333%;
                    background: #fff;
                    border: 1px solid #999;
                    font-size: 15vw;
                    font-weight: bold;
                    line-height: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .square:focus {
                    outline: none;
                }
                .kbd-navigation .square:focus {
                    background: #ddd;
                }
            `}</style>
        </button>
    );
}

export default Square;