// 6개로 나눠진 파일들을 하나로 합칠 수 있는지 확인하는 용도

import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const CountryBoardPage = async () => {
    const db = (await connectDB).db('DecantingHouse');
    let session = await getServerSession(authOptions);

    const countries = ['france', 'usa', 'italy', 'chile', 'australia', 'germany'];

    let popularPost = {};

    const popularPostMap = await Promise.all(
        countries.map(async (country) => {
            const result = await db.collection('Forum').find({country: country, count: {$gt: 0}}).sort({ count: -1 }).limit(4).toArray();
            popularPost[country] = result;
        })
    );

    popularPost = popularPost.map((data) => {
        data._id = data._id.toString();
        return data;
    });

    let sessionUserPost = {};

    const sessionUserPostMap = await Promise.all(
        countries.map(async (country) => {
            const result = await db.collection('Forum').find({country: country, authorEmail: session?.user.email}).toArray();
            sessionUserPost[country] = result;
        })
    );

    sessionUserPost = sessionUserPost.map((data) => {
        data._id = data._id.toString();
        return data;
    });

    const category = ['품종', '페어링', '제품', '맛', '기타'];

    let categoryPost = {};

    const categoryMap = await Promise.all(
        category.map(async (data) => {
            countries.map(async (country) => {
                const result = await db.collection('Forum').find({ country: country, category: data }).toArray();
            })
        })
    );

    let category1Post = categoryPost['품종'];
    let category2Post = categoryPost['페어링'];
    let category3Post = categoryPost['제품'];
    let category4Post = categoryPost['맛'];
    let category5Post = categoryPost['기타'];

    const boardMapData = [
        {country: 'FRANCE', countryImg: '/france-vineyard.jpg', imgAlt: '프랑스 포도밭', img2: '/france-road.jpg', img2Alt: '프랑스 포도밭 도로'},
        {country: 'U.S.A', countryImg: '/napa.jpg', imgAlt: '미국 포도밭', img2: '/usa-winery.jpg', img2Alt: '미국 나파밸리'},
        {country: 'ITALY', countryImg: '/italy-evening.jpg', imgAlt: '이탈리아 포도밭', img2: '/italy-vineyard.jpg', img2Alt: '이탈리아 포도밭'},
        {country: 'CHILE', countryImg: '/chile-wine.jpg', imgAlt: '칠레 포도밭', img2: '/chile.jpg', img2Alt: '칠레'},
        {country: 'AUSTRALIA', countryImg: '/longview-winery.jpg', imgAlt: '오스트레일리아 포도밭', img2: '/australia.jpg', img2Alt: '오스트레일리아 포도밭'},
        {country: 'GERMANY', countryImg: '/germany-vineyards.jpg', imgAlt: '독일 포도밭', img2: '/wood-germany.jpg', img2Alt: '독일 와인병'}
    ];

    return (
        <div className={classes.board_container}>
            <div className={classes.board_wrapper}>
                <div className={classes.board_titleBox}>
                    <div className={classes.title_left}>
                        <h1 className={classes.board_title}>FRANCE</h1>
                    </div>
                    <div className={classes.board_titleBox_right}>
                        <img src="/france-vineyard.jpg" alt="프랑스 포도밭" id={classes.title_rightTop} />
                        <img src="/france-road.jpg" alt="프랑스 포도밭 도로" id={classes.title_rightBottom} />
                    </div>
                </div>
                <FranceBoard 
                    popular={popularPost} 
                    sessionUserPost={sessionUserPost} 
                    session={session} 
                    category1={category1Post} 
                    category2={category2Post}
                    category3={category3Post}
                    category4={category4Post}
                    category5={category5Post}
                />
            </div>
        </div>
    );
}

export default CountryBoardPage;