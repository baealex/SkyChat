export interface InputProps {

}

export function Input(props: InputProps) {
    console.log(props);

    return (
        <>
            <div className="outBox existence">
                <div className="inputBox">
                    <input type="text" name="" />
                    <label>트래킹 아이디 (X-YY-DDD)</label>
                </div>
            </div>
            <style jsx>{`
                .outBox {
                    margin: 50px auto;
                    padding: 20px;
                    max-width:320px;
                    border: 1px solid #999;
                    border-radius: 6px;
                }
                .outBox .inputBox {
                    position: relative;
                    height: 50px;
                }
                .outBox .inputBox input {
                    padding: 0 10px;
                    width: 100%;
                    height: 50px;
                    font-size: 14px;
                    box-sizing: border-box;
                    border: 1px solid #999;
                    outline: none;
                }
                .outBox .inputBox label {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    padding: 0 6px;
                    color: #999;
                    font-size: 14px;
                    font-weight: normal;
                    background: #fff;
                    transform: scale(1) translate(4px, -18px);
                    transition: all .15s;
                    pointer-events: none;
                }
                .outBox .inputBox input:focus,
                .outBox.existence .inputBox input {
                    border: 2px solid red;
                }
                .outBox .inputBox input:focus + label,
                .outBox.existence .inputBox label {
                    color: red;
                    transform: scale(.85) translate(-10px, -48px);
                }
            `}</style>
        </>
    );
}