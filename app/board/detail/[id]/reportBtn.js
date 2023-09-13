'use client'

import { useRouter } from "next/navigation";

const ReportBtn = (props) => {
    const router = useRouter();

    const reportBtnHandler = async () => {
        if (!props.session) {
            alert('로그인이 필요합니다.');
            new Notification('로그인이 필요합니다.');
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

        let warning = data.warning;
        // console.log(warning);

        if (data.status === 200) {
            if (warning === 5) {
                let sendData = {
                    email: props.checkPost.authorEmail,
                    warning
                };

                const request = await fetch('/api/auth/signOut', {
                    method: 'DELETE',
                    headers: { 'content-type' : 'application/json' },
                    body: JSON.stringify(sendData)
                });

                const data = await request.json();

                if (data.status === 200) {
                    alert('신고완료 되었습니다. 감사합니다.');
                    new Notification('신고완료 되었습니다. 감사합니다.');
                    router.back();
                    return;
                };
            };

            alert('신고완료 되었습니다. 감사합니다.');
            new Notification('신고완료 되었습니다. 감사합니다.');
        } else {
            alert(data.message);
            new Notification(data.message);
            return;
        }
    }

    return <button type="button" onClick={reportBtnHandler}>신고하기</button>
}

export default ReportBtn;