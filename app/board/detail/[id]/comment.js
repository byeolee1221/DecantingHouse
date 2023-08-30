'use client'

import { useEffect, useState } from "react";
import classes from "./comment.module.css";

const CommentPage = (props) => {

    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [getData, setGetData] = useState([]);

    const commentChangeHandler = (event) => {
        setComment(event.target.value);
    }

    const commentSubmitHandler = async (event) => {
        event.preventDefault();

        let commentData = {
            comment,
            commentUser: props.session.user.name,
            commentUserEmail: props.session.user.email,
            parent: props.checkPost._id
        };

        const response = await fetch('/api/write/comment', {
            method: 'POST',
            headers: { 'content-type' : 'application/json' },
            body: JSON.stringify(commentData)
        })

        const data = await response.json();

        if (data.status === 500) {
            setError(data.message);
        } 
    }

    useEffect(() => {
        const getDataHandler = async () => {
            const response = await fetch(`/api/write/comment?id=${props.checkPost._id}`, {
                method: 'GET'
            })
    
            const commentData = await response.json();
            // console.log(commentData);
            setGetData(commentData);
        }

        getDataHandler();

    }, [])

    return (
        <div className={classes.comment_container}>
            <div className={classes.comment_wrapper}>
                <div className={classes.comment_titleBox}>
                    <h3>댓글</h3>
                </div>
                <div className={classes.comment_contentsBox}>
                    <div className={classes.contents_inner}>
                        <p>{props.session.user.name}</p>
                        <textarea name="userComment" cols={100} rows={5} placeholder=" 내용을 입력하세요." onChange={commentChangeHandler} value={comment} />
                        <div className={classes.contents_BtnBox}>
                            <button type="submit" onClick={commentSubmitHandler}>등록</button>
                            <p>{error}</p>
                        </div>
                    </div>
                    {getData.length > 0 ? getData.map((data, i) => {
                        return (
                            <div className={classes.commentBox} key={i}>
                                <p>
                                    <span>{data.commentUser}</span>: {data.comment}
                                </p>
                                <div className={classes.commentBtnBox}>
                                    <button type="button">수정</button>
                                    <button type="button">삭제</button>
                                </div>
                            </div>
                        );
                    })
                     : ''}
                </div>
            </div>
        </div>
    );
}

export default CommentPage;