import Link from "next/link";

import classes from "../legal.module.css";

const PolicyPage = () => {
    return (
        <div className={classes.legal_container}>
            <div className={classes.legal_wrapper}>
                <div className={classes.legal_title}>
                    <h1>LEGAL</h1>
                    <p>마지막 업데이트 2023.09.08</p>
                    <nav className={classes.legal_title_navLeft}>
                        <ul className={classes.navLeft_list}>
                            <li>
                                <Link href="/siteTerms" className={classes.list_link}>사이트 이용약관</Link>
                            </li>
                            <li>
                                <Link href="/policy" className={classes.list_link}>개인정보처리방침</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className={classes.legal_contents}>
                    <div className={classes.contents_main}>
                        <p>
                            Decanting House(이하 디캔팅하우스)은(는) 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인
                            정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다. 
                        </p>
                        <p>
                            디캔팅하우스는 개인정보처리방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.
                        </p>
                        <p>○ 본 방침은 서비스 개시일부터 시행됩니다.</p>
                    </div>  
                    <div className={classes.contents_main}>
                        <h2>1. 개인정보의 처리 목적</h2>
                        <p>
                            디캔팅하우스는 개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는 다음의 목적 이외의 용도로는 사용되지 않으며
                            이용 목적이 변경될 시에는 사전동의를 구할 예정입니다.
                        </p>
                        <h3>가. 홈페이지 회원가입 및 관리</h3>
                        <p>
                            회원가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지, 고충처리, 분쟁 조정을 위한
                            기록 보존 등을 목적으로 개인정보를 처리합니다.
                        </p>
                        <h3>나. 민원사무 처리</h3>
                        <p>
                            민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 등을 목적으로 개인정보를 처리합니다.
                        </p>
                        <h3>다. 재화 또는 서비스 제공</h3>
                        <p>
                            서비스 제공, 콘텐츠 제공, 본인인증 등을 목적으로 개인정보를 처리합니다.
                        </p>
                    </div>  
                    <div className={classes.contents_main}>
                        <h2>2. 개인정보 파일 현황</h2>
                        <ul className={classes.legal_contents_list}>
                            <li>개인정보 파일명 : user, accounts, users</li>
                            <li>개인정보 항목 : ID, 비밀번호, 이름, 이메일</li>
                            <li>수집방법 : 홈페이지</li>
                            <li>보유근거 : 개인정보처리방침</li>
                            <li>보유기간 : 3년</li>
                            <li>관련법령 : 소비자의 불만 또는 분쟁처리에 관한 기록 : 3년, 신용정보의 수집/처리 및 이용 등에 관한 기록 : 3년, 계약 또는 청약철회
                                등에 관한 기록 : 5년
                            </li>
                        </ul>
                    </div>  
                    <div className={classes.contents_main}>
                        <h2>3. 개인정보의 처리 및 보유 기간</h2>
                        <p>
                            ① 디캔팅하우스는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집시에 동의 받은 개인정보 보유, 이용기간 내에서 개인
                            정보를 처리, 보유합니다.
                        </p>
                        <p>
                            ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
                        </p>
                        <p>
                            1. 홈페이지 회원가입 및 관리
                        </p>
                        <p>
                            홈페이지 회원가입 및 관리와 관련한 개인정보를 수집·이용에 관한 동의일로부터 3년까지 위 이용목적을 위하여 보유·이용됩니다.
                        </p>
                        <ul className={classes.legal_contents_list}>
                            <li>보유근거 : 개인정보처리방침</li>
                            <li>관련법령 : 1) 소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
                        </ul>
                    </div>  
                    <div className={classes.contents_main}>
                        <h2>4. 정보주체의 권리·의무 및 그 행사방법</h2>
                        <p>
                            이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.
                        </p>
                        <p>
                            ① 정보주체는 디캔팅하우스에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
                        </p>
                        <ol className={classes.legal_contents_list}>
                            <li>개인정보 열람요구</li>
                            <li>오류 등이 있을 경우 정정 요구</li>
                            <li>삭제요구</li>
                            <li>처리정지 요구</li>
                        </ol>
                        <p>
                            ② 제1항에 따른 권리 행사는 디캔팅하우스에 대해 개인정보 보호법 시행규칙 별지 제8호 서식에 따라 전자우편을 통해 하실 수 있으며
                            '기관/회사명'('사이트URL' 이하 사이트명)은(는) 이에 대해 지체 없이 조치하겠습니다.
                        </p>
                        <p>
                            ③ 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 '기관/회사명'('사이트URL' 이하 사이트명)은(는) 정정 또는 삭제
                            를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.
                        </p>
                        <p>
                            ④ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙
                            별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
                        </p>
                    </div>  
                    <div className={classes.contents_main}>
                        <h2>5. 처리하는 개인정보의 항목 작성</h2>
                        <p>
                            ① 디캔팅하우스는 다음의 개인정보 항목을 처리하고 있습니다.
                        </p>
                        <p>
                            1. 홈페이지 회원가입 및 관리
                        </p>
                        <ul className={classes.legal_contents_list}>
                            <li>필수항목 : ID, 비밀번호, 이름, 이메일</li>
                        </ul>
                    </div>
                    <div className={classes.contents_main}>
                        <h2>6. 개인정보의 파기</h2>
                        <p>
                            디캔팅하우스는 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.
                        </p>
                        <ul className={classes.legal_contents_list}>
                            <li>파기절차</li>
                        </ul>
                        <p>
                            이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져 내부 방침 및 기타 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다.
                            이 때, DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다.
                        </p>
                        <ul className={classes.legal_contents_list}>
                            <li>파기기한</li>
                        </ul>
                        <p>
                            이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터 5일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지, 사업의
                            종료 등 그 개인정보가 불필요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를 파기합니다.
                        </p>
                        <p>- 파기방법</p>
                        <p>전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.</p>
                    </div>
                    <div className={classes.contents_main}>
                        <h2>7. 개인정보의 안전성 확보 조치</h2>
                        <p>
                            디캔팅하우스는 개인정보보호법 제29조에 따라 다음과 같이 안정성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.
                        </p>
                        <p>① 개인정보에 대한 접근 제한</p>
                        <p>② 개인정보의 암호화</p>
                    </div>
                    <div className={classes.contents_main}>
                        <h2>8. 개인정보관리책임자 및 담당자의 연락처</h2>
                        <p>
                            귀하께서는 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보관리책임자에게 신고하실 수 있습니다.
                            디캔팅하우스는 이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다.
                        </p>
                    </div>
                    <div className={classes.contents_main}>
                        <h2>개인정보 관리책임자</h2>
                        <ul className={classes.legal_contents_list}>
                            <li>이 름 : 문창기</li>
                            <li>소 속 : 디캔팅하우스 대표</li>
                            <li>메 일 : decantinghouse.official@gmail.com</li>
                        </ul>
                        <p>기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.</p>
                        <ul className={classes.legal_contents_list}>
                            <li>개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)</li>
                            <li>대검찰청 사이버범죄수사단 (www.spo.go.kr / 02-3480-3571)</li>
                            <li>경찰청 사이버안전국 (www.ctrc.go.kr / 국번없이 182)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PolicyPage;