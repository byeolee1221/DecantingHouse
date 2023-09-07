'use client'

import { useEffect, useState } from "react";

const DetailHits = (props) => {
    const [getHits, setGetHits] = useState(0);

    useEffect(() => {

        const hitsCountHandler = async () => {
            let sendData = {
                postId: props.checkPost._id.toString()
            };

            const response = await fetch('/api/write/hits/hits', {
                method: 'POST',
                headers: { 'content-type' : 'application/json' },
                body: JSON.stringify(sendData)
            });

            const data = await response.json();

            if (data.status === 200) {
                setGetHits(data.getHits);
            };
        }

        hitsCountHandler();

    }, [])

    return <p>조회 <span>{getHits}</span></p>
}

export default DetailHits;