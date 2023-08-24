'use client'

import { useRouter } from "next/navigation";
import classes from "./page.module.css";
import { ChangeEvent, useState } from "react";

const WriteNewPage = () => {
    const router = useRouter();

    const cancelHandler = () => {
        router.back();
    }

    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [postData, setPostData] = useState([]);

    type BoardEvent = React.ChangeEvent<HTMLInputElement>;

    const authorChangeHandler = (event: BoardEvent) => {
        setAuthor(event.target.value);
    }

    const categoryChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    }

    const titleChangeHandler = (event: BoardEvent) => {
        setTitle(event.target.value);
    }

    const contentsChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContents(event.target.value);
    }

    let isCompleted = false;

    if (author && category && title && contents) {
        isCompleted = true;
    }

    const boardSubmitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    // 1. 제출하면 서버를 거쳐 DB에 저장됨. useEffect로 서버로 get 요청을 따로 보내면서 작성된 글의 id를 보냄.
    // 2. 서버에서 id를 받고, DB의 NewPost에서 get 요청에 담긴 id와 같은 id의 글을 찾음.
    // 3. 해당 글을 변수에 담고, 이 컴포넌트에 응답함.
    // 4. useEffect 내에서 then()이나 await를 사용하여 응답을 받고, 이 응답을 매개변수에 담아서 postData에 담기 위해 setPostData 함수를 사용함.
    // 5. useEffect 의존성 배열에는 boardSubmitHandler 함수를 넣어서 이 함수가 실행될 때만 실행되도록 함.
    // 6. 성공적으로 실행되면 글 목록에 글이 나타남. 

    return (
        <div className={classes.board_write_container}>
            <div className={classes.write_wrapper}>
                <div className={classes.write_titleBox}>
                    <h1>게시글 작성하기</h1>
                </div>
                <form action="/api/write/new" method="POST" className={classes.write_userForm} onSubmit={boardSubmitHandler} >
                    <div className={classes.write_formContents}>
                        <label htmlFor="author">작성자</label>
                        <input type="text" id="author" name="author" onChange={authorChangeHandler} value={author} />
                    </div>
                    <div className={classes.write_formContents}>
                        <label htmlFor="user-category">카테고리</label>
                        <select name="category" id="user-category" onChange={categoryChangeHandler} value={category} >
                            <option value="title" selected disabled>--카테고리를 골라주세요--</option>
                            <option value="품종">품종</option>
                            <option value="페어링">음식 페어링</option>
                            <option value="제품">제품</option>
                            <option value="맛">느껴지는 맛</option>
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
                    <div className={classes.write_formContents}>
                        <label htmlFor="user-file">이미지 첨부</label>
                        <input type="file" id="user-file" name="userFile" accept="image/*" />
                    </div>
                    <div className={classes.write_formBtnBox}>
                        <button type="submit" id={classes.write_submitBtn} disabled={!isCompleted}>완료</button>
                        <button type="button" onClick={cancelHandler}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default WriteNewPage;