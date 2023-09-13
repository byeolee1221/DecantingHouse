'use client'

import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import classes from "./writeNewForm.module.css";

const WriteNewFormPage = (props) => {
    const router = useRouter();

    const cancelHandler = () => {
        router.back();
    }

    let reportWarning = props.session.user.reportWarning;

    if (reportWarning === undefined) {
        reportWarning = 0;
    };

    const [author, setAuthor] = useState(props.session.user.name);
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [fileName, setFileName] = useState('');
    const [src, setSrc] = useState('');

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

    const fileChangeHandler = async (event) => {
        setFileName(event.target.files[0].name);

        let file = event.target.files[0];
        const response = await fetch(`/api/write/image?file=${fileName}`, {
            method: 'GET'
        });

        const data = await response.json();

        let imageData = new FormData();
        Object.entries({ ...response.Fields, file}).forEach(([key, value]) => {
            imageData.append(key, value)
        });

        let uploadResult = await fetch(response.url, {
            method: 'POST',
            body: imageData
        })

        console.log(uploadResult);

        if (uploadResult.ok) {
            setSrc(`uploadResult.url/${fileName}`)
        } else {
            console.log('image upload fail');
        };
    }

    let isCompleted = false;

    if (author && category && title && contents) {
        isCompleted = true;
    }

    let uploadTime = new Date();

    let uploadYear = uploadTime.getFullYear();
    let uploadMonth = uploadTime.getMonth() + 1;
    let uploadDay = uploadTime.getDate();
    let uploadHour = uploadTime.getHours();
    let uploadMinute = uploadTime.getMinutes();
    let uploadSeconds = uploadTime.getSeconds();

    let uploadDate = `${uploadYear}.${uploadMonth}.${uploadDay}`;
    let uploadDate2 = `${uploadHour}:${uploadMinute}:${uploadSeconds}`;

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
                <textarea name="userContents" id="user-contents" cols="50" rows="15" onChange={contentsChangeHandler} value={contents} placeholder={` 게시글은 10회 이상 신고되면 경고없이 삭제되며 계정경고가 누적됩니다. (현재 계정경고: ${reportWarning})`} />
            </div>
            <div className={classes.write_formContents} id={classes.formContents_file}>
                <input className={classes.uploadFile_name} value={fileName} disabled />
                <label htmlFor="user-file">이미지 첨부</label>
                <input type="file" id="user-file" name="userFile" accept="image/*" onChange={fileChangeHandler} />
                <img src={src}></img>
            </div>
            <div className={classes.upload_timeBox}>
                <input type="text" name="uploadDate" value={uploadDate} />
            </div>
            <div className={classes.upload_timeBox}>
                <input type="text" name="uploadDate2" value={uploadDate2} />
            </div>
            <div className={classes.country_box}>
                <input type="text" name="country" value={props.country} />
            </div>
            <div className={classes.write_formBtnBox}>
                <button type="submit" id={classes.write_submitBtn} disabled={!isCompleted}>완료</button>
                <button type="button" onClick={cancelHandler}>취소</button>
            </div>
        </Fragment>
    );
}

export default WriteNewFormPage;