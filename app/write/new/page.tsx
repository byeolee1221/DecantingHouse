'use client'

import { useRouter } from "next/navigation";
import classes from "./page.module.css";

const WriteNewPage = () => {
    const router = useRouter();

    const cancelHandler = () => {
        router.back();
    }

    return (
        <div className={classes.board_write_container}>
            <div className={classes.write_wrapper}>
                <div className={classes.write_titleBox}>
                    <h1>게시글 작성하기</h1>
                </div>
                <form action="/api/write/new" method="POST" className={classes.write_userForm}>
                    <div className={classes.write_formContents}>
                        <label htmlFor="user-id">작성자</label>
                        <input type="text" id="user-id" name="userId" />
                    </div>
                    <div className={classes.write_formContents}>
                        <label htmlFor="user-category">카테고리</label>
                        <select name="category" id="user-category">
                            <option value="title" selected disabled>--카테고리를 골라주세요--</option>
                            <option value="품종">품종</option>
                            <option value="페어링">음식 페어링</option>
                            <option value="제품">제품</option>
                            <option value="맛">느껴지는 맛</option>
                        </select>
                    </div>
                    <div className={classes.write_formContents}>
                        <label htmlFor="user-title">제목</label>
                        <input type="text" id="user-title" name="userTitle" />
                    </div>
                    <div className={classes.write_formContents}>
                        <label htmlFor="user-contents">내용</label>
                        <textarea name="userContents" id="user-contents" cols="50" rows="15" />
                    </div>
                    <div className={classes.write_formContents}>
                        <label htmlFor="user-file">이미지 첨부</label>
                        <input type="file" id="user-file" name="userFile" accept="image/*" />
                    </div>
                    <div className={classes.write_formBtnBox}>
                        <button type="submit" id={classes.write_submitBtn} disabled>완료</button>
                        <button type="button" onClick={cancelHandler}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default WriteNewPage;