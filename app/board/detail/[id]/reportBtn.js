'use client'

const ReportBtn = (props) => {
    const reportBtnHandler = async () => {
        if (!props.session) {
            alert('로그인이 필요합니다.');
            return;
        };

        let sendData = {
            postId: props.checkPost._id.toString(),
            reportClickUser: props.session.user.email,
            reportedUser: props.checkPost.authorEmail
        };

        const response = await fetch('/api/delete', {
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

    return <button type="button" onClick={reportBtnHandler}>신고하기</button>
}

export default ReportBtn;