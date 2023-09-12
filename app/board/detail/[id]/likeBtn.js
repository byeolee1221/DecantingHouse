'use client'

import { useEffect, useState } from "react";

const LikeBtn = (props) => {
    const [count, setCount] = useState(0);
    const [getLike, setGetLike] = useState(0);
    const [isLike, setIsLike] = useState(false);

    const likeBtnHandler = async () => {
        if (!props.session) {
            alert('로그인이 필요합니다.');
            new Notification('로그인이 필요합니다.');
            return;
        };

        if (props.session) {
            setCount(getLike + 1);

            let sendData = {
                count: count + 1,
                parent: props.checkPost._id,
                likeUser: props.session?.user.email,
                finalCount: getLike + 1
            };

            const response = await fetch('/api/write/like/like', {
                    method: 'POST',
                    headers: { 'content-type' : 'application/json' },
                    body: JSON.stringify(sendData)
            })

            const data = await response.json();
    
            if (data.status === 200) {
                setIsLike(true);
            } else {
                alert('좋아요는 한 번만 할 수 있습니다.');
                new Notification('좋아요는 한 번만 할 수 있습니다.');
                return;
            }
        };
    }

    useEffect(() => {
        const getLikeData = async () => {
            const response = await fetch(`/api/write/like/like?id=${props.checkPost._id}`, {
                method: 'GET'
            })

            const data = await response.json();
            // console.log(data);

            setGetLike(data);
        }

        getLikeData();

    }, [isLike])

    return <button type="button" onClick={likeBtnHandler}>🧡 좋아요 : {getLike}</button>
}

export default LikeBtn;
