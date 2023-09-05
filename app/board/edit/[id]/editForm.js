'use client'

import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import classes from "../../../write/writeNewForm.module.css";

const EditFormPage = (props) => {
    const router = useRouter();

    const cancelHandler = () => {
        router.back();
    }

    const [author, setAuthor] = useState(props.session.user.name);
    const [category, setCategory] = useState(props.postInfo.category);
    const [title, setTitle] = useState(props.postInfo.userTitle);
    const [contents, setContents] = useState(props.postInfo.userContents);
    const [fileName, setFileName] = useState('');

    const authorChangeHandler = (event) => {
        setAuthor(event.target.value);
    }

    const categoryChangeHandler = (event) => {
        setCategory(event.target.value);
    }

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    }

    const contentsChangeHandler = (event) => {
        setContents(event.target.value);
    }

    const fileChangeHandler = (event) => {
        setFileName(event.target.files[0].name);
    }

    let isCompleted = false;

    if (author && category && title && contents) {
        isCompleted = true;
    }

    return (
        <Fragment>
            <div className={classes.write_formContents}>
                <label htmlFor="author">작성자</label>
                <input type="text" id="author" name="author" onChange={authorChangeHandler} value={props.session.user.name} />
            </div>
            <div className={classes.write_formContents}>
                <label htmlFor="user-category">카테고리</label>
                <select name="category" id="user-category" onChange={categoryChangeHandler} value={category} >
                    <option value="" selected disabled>--카테고리를 골라주세요--</option>
                    <option value="품종">품종</option>
                    <option value="페어링">음식 페어링</option>
                    <option value="제품">제품</option>
                    <option value="맛">느껴지는 맛</option>
                    <option value="기타">기타</option>
                </select>
            </div>
            <div className={classes.write_formContents}>
                <label htmlFor="user-title">제목</label>
                <input type="text" id="user-title" name="userTitle" onChange={titleChangeHandler} value={title} />
            </div>
            <div className={classes.write_formContents}>
                <label htmlFor="user-contents">내용</label>
                <textarea name="userContents" id="user-contents" cols="50" rows="15" onChange={contentsChangeHandler} value={contents} />
            </div>
            <div className={classes.write_formContents} id={classes.formContents_file}>
                <input className={classes.uploadFile_name} value={fileName} disabled />
                <label htmlFor="user-file">이미지 첨부</label>
                <input type="file" id="user-file" name="userFile" accept="image/*" onChange={fileChangeHandler} />
            </div>
            <div className={classes.upload_timeBox}>
                <input type="text" name="uploadDate" value={props.postInfo.uploadDate} />
            </div>
            <div className={classes.country_box}>
                <input type="text" name="country" value={props.postInfo.country} />
            </div>
            <div className={classes.id_box}>
                <input type="text" name="authorId" value={props.postInfo._id.toString()} />
            </div>
            <div className={classes.email_box}>
                <input type="text" name="authorEmail" value={props.session.user.email} />
            </div>
            <div className={classes.write_formBtnBox}>
                <button type="submit" id={classes.write_submitBtn} disabled={!isCompleted} >완료</button>
                <button type="button" onClick={cancelHandler}>취소</button>
            </div>
        </Fragment>
    );
}

export default EditFormPage;