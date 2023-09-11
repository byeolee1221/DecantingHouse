'use client'

import { useEffect, useState } from "react";
import classes from "./comment.module.css";
import { useRouter } from "next/navigation";

const CommentPage = (props) => {
    const router = useRouter();

    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [getData, setGetData] = useState([]);
    const [post, setPost] = useState(false);
    const [update, setUpdate] = useState(false);
    const [updateComment, setUpdateComment] = useState('');
    const [id, setId] = useState('');

    let reportWarning = props.session?.user?.reportWarning;

    if (reportWarning === undefined) {
        reportWarning = 0;
    };

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
            parent: props.checkPost._id.toString()
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
            const response = await fetch(`/api/write/comment/comment?id=${props.checkPost._id.toString()}`, {
                method: 'GET'
            })
    
            const commentData = await response.json();
            // console.log(commentData);
           
            setGetData(commentData);
        }

        getDataHandler();
        router.refresh();

    }, [post])

    const commentDeleteHandler = async () => {  
        let commentData = {
            id : props.checkPost._id.toString(),
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

    const commentReportBtnHandler = async (commentId) => {
        if (!props.session) {
            alert('로그인이 필요합니다.');
            return;
        };

        let sendData = {
            commentId,
            reportClickUser: props.session.user.email
        };

        const response = await fetch('/api/write/comment/report', {
            method: 'POST',
            headers: { 'content-type' : 'application/json' },
            body: JSON.stringify(sendData)
        });

        const data = await response.json();

        if (data.status === 200) {
            alert('신고완료 되었습니다. 감사합니다.');
            return;
        } else {
            alert(data.message);
            return;
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
                        <textarea name="userComment" cols={100} rows={5} placeholder={` 댓글신고가 10회 이상이면 경고없이 삭제되며 계정경고가 누적됩니다. (현재 계정경고: ${reportWarning})`} onChange={commentChangeHandler} value={comment} />
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
                                    {props.session?.user.email === data.commentUserEmail && !update ? <button type="button" onClick={() => commentUpdateBtnHandler(data._id.toString())}>수정</button> : ''}
                                    {id === data._id.toString() && update ? <button type="button" onClick={commentUpdateHandler}>등록</button> : ''}
                                    {id === data._id.toString() && update ? <button type="button" onClick={updateCancelHandler}>취소</button> : ''}
                                    {props.session?.user.email === data.commentUserEmail && !update || props.isAdmin ? <button type="button" onClick={commentDeleteHandler}>삭제</button> : ''}
                                    {props.session?.user.email !== data.commentUserEmail && !update ? <button type="button" onClick={() => commentReportBtnHandler(data._id.toString())}>신고</button> : ''}
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