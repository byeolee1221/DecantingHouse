import WriteNewFormPage from "../../writeNewForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import classes from "../../write.module.css";

const WriteNewPage = async () => {
    let session = await getServerSession(authOptions);
    const country = 'france';

    return (
        <div className={classes.board_write_container}>
            <div className={classes.write_wrapper}>
                <div className={classes.write_titleBox}>
                    <h1>게시글 작성하기</h1>
                </div>
                <form action="/api/write/france" method="POST" className={classes.write_userForm} >
                    <WriteNewFormPage country={country} session={session} />
                </form>
            </div>
        </div>
    );
}

export default WriteNewPage;