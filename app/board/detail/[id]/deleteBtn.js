'use client'

import { useRouter } from "next/navigation";

const DeleteBtn = (props) => {
    const router = useRouter();

    const deleteBtnHandler = async () => {
        let deleteInfo = {
            id: props.checkPost._id,
            authorEmail: props.checkPost.authorEmail
        };

        const response = await fetch('/api/delete', {
            method: 'DELETE',
            headers: { 'content-type' : 'application/json' },
            body: JSON.stringify(deleteInfo)
        })

        const data = await response.json();

        if (data.status === 200) {
            alert('게시글이 삭제되었습니다.');
            router.push(`/board/${props.checkPost.country}`);
        } else {
            alert('본인만 삭제가능합니다.');
            return;
        };
    }

    return <button type="button" onClick={deleteBtnHandler}>삭제하기</button>
}

export default DeleteBtn;