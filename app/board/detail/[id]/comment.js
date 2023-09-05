'use client'

import { useEffect, useState } from "react";
import classes from "./comment.module.css";

const CommentPage = (props) => {
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [getData, setGetData] = useState([]);
    const [post, setPost] = useState(false);
    const [update, setUpdate] = useState(false);
    const [updateComment, setUpdateComment] = useState('');
    const [id, setId] = useState('');

    const commentChangeHandler = (event) => {
        setComment(event.target.value);
    }

    const updateCommentChangeHandler = (event) => {
        setUpdateComment(event.target.value);
    }

    const commentSubmitHandler = async (event) => {
        event.preventDefault();

        let commentData = {
            comment,
            commentUser: props.session.user.name,
            commentUserEmail: props.session.user.email,
            parent: props.checkPost._id
        };

        const response = await fetch('/api/write/comment/comment', {
            method: 'POST',
            headers: { 'content-type' : 'application/json' },
            body: JSON.stringify(commentData)
        })

        const data = await response.json();

        if (data.status === 200) {
            setPost(true);
            setComment('');
        } else {
            setError(data.message);
        }
    }

    useEffect(() => {
        const getDataHandler = async () => {
            const response = await fetch(`/api/write/comment/comment?id=${props.checkPost._id}`, {
                method: 'GET'
            })
    
            const commentData = await response.json();
            // console.log(commentData);
           
            setGetData(commentData);
        }

        getDataHandler();

    }, [post])

    const commentDeleteHandler = async () => {  
        let commentData = {
            id : props.checkPost._id,
            commentUserEmail: props.session?.user.email,
            commentId : id
        };

        // console.log(commentData);

        const response = await fetch('/api/write/comment/comment', {
            method: 'DELETE',
            headers: { 'content-type' : 'application/json' },
            body: JSON.stringify(commentData)
        });

        const data = await response.json();

        if (data.status === 200) {
            alert('댓글이 삭제되었습니다.');
            setPost(true);
        } else {
            alert(data.message);
        }
    }

    const commentUpdateBtnHandler = (commentId) => {
        setUpdate(true);

        setId(commentId);
        // get 요청 보내서 댓글 이메일 받기
        // 
    }

    const commentUpdateHandler = async () => {
        let updateData = {
            comment: updateComment,
            commentUserEmail: props.session?.user.email,
            id
        };

        // console.log(updateData);

        const response = await fetch('/api/write/comment/update', {
            method: 'POST',
            headers: { 'content-type' : 'application/json' },
            body: JSON.stringify(updateData)
        })

        const data = await response.json();

        if (data.status === 200) {
            setUpdate(false);
            setPost(true);
        } else {
            setUpdate(false);
            alert(data.message);
        }
    }

    const updateCancelHandler = () => {
        setUpdate(false);
    }

    return (
        <div className={classes.comment_container}>
            <div className={classes.comment_wrapper}>
                <div className={classes.comment_titleBox}>
                    <h3>댓글</h3>
                </div>
                <div className={classes.comment_contentsBox}>
                    {props.session ? <div className={classes.contents_inner}>
                        <p>{props.session?.user.name}</p>
                        <textarea name="userComment" cols={100} rows={5} placeholder=" 내용을 입력하세요." onChange={commentChangeHandler} value={comment} />
                        <div className={classes.contents_BtnBox}>
                            <button type="submit" onClick={commentSubmitHandler}>등록</button>
                            <p>{error}</p>
                        </div>
                    </div> : <p className={classes.comment_errorMsg}>로그인하시면 댓글을 작성하실 수 있습니다.</p>}
                    {getData.length > 0 ? getData.map((data, i) => {
                        return (
                            <div className={classes.commentBox} key={i}>
                                {id !== data._id.toString() || !update ? <p>
                                    <span>{data.commentUser}</span>: {data.comment}
                                </p> :
                                <p>
                                    <span>{data.commentUser}</span>: <textarea name="commentUpdate" cols={100} rows={1} defaultValue={data.comment} onChange={updateCommentChangeHandler} />
                                </p>}
                                <div className={classes.commentBtnBox}>
                                    {props.session?.user.email === data.commentUserEmail && !update ? <button type="button" onClick={() => commentUpdateBtnHandler(data._id)}>수정</button> : ''}
                                    {id === data._id && update ? <button type="button" onClick={commentUpdateHandler}>등록</button> : ''}
                                    {id === data._id && update ? <button type="button" onClick={updateCancelHandler}>취소</button> : ''}
                                    {props.session?.user.email === data.commentUserEmail && !update ? <button type="button" onClick={commentDeleteHandler}>삭제</button> : ''}
                                </div>     
                            </div>
                        );
                    })
                     : '댓글이 아직 없습니다.'}
                </div>
            </div>
        </div>
    );
}

export default CommentPage;