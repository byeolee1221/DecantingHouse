'use client'

import { useState } from "react";

const LikeBtn = (props) => {
    const [count, setCount] = useState(0);

    const likeBtnHandler = async () => {
        if (props.session) {
            setCount(count + 1);
        } else {
            alert('로그인이 필요합니다.');
        }

        const response = await fetch(`/api/write?count=${count}`, {
            method: 'GET'
        })

        let data = await response.json();
        
    }

    return <button type="button" onClick={likeBtnHandler}>🧡 좋아요 : {count}</button>
}

export default LikeBtn;