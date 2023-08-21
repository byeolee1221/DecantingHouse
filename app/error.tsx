'use client'

const Error = ({error, reset}) => {
    return (
        <div>
            <h4>사이트 오류 감지 | 잠시 후 다시 시도해주세요.</h4>
            <button onClick={() => {reset()}}>다시 시도</button>
        </div>
    );
}

export default Error;