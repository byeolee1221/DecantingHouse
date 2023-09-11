import Link from "next/link";
import { connectDB } from "@/util/database";
import MainBoardPage from "./mainBoard/mainBoard";

import classes from "./page.module.css";

export default async function Home () {
  const db = (await connectDB).db('DecantingHouse');
  const country = ['france', 'usa', 'italy', 'chile', 'australia', 'germany'];

  let popularPostByCountry = {};

  let popularPostMap = await Promise.all(
    country.map(async (data) => {
      const result = await db.collection('Forum').find({country: data, count: {$gt: 0}}).sort({ count: -1 }).limit(1).toArray();
      popularPostByCountry[data] = result[0];
    })
  );

  let popularPostFrance = popularPostByCountry['france'];
  let popularPostUsa = popularPostByCountry['usa'];
  let popularPostItaly = popularPostByCountry['italy'];
  let popularPostChile = popularPostByCountry['chile'];
  let popularPostAustralia = popularPostByCountry['australia'];
  let popularPostGermany = popularPostByCountry['germany'];

  let postArrByCountry = {};

  let postArrMap = await Promise.all(
    country.map(async (data) => {
      const result = await db.collection('Forum').find({country: data}).sort({_id: -1}).limit(5).toArray();
      postArrByCountry[data] = result;
    })
  )

  let postArrFrance = postArrByCountry['france'];
  let postArrUsa = postArrByCountry['usa'];
  let postArrItaly = postArrByCountry['italy'];
  let postArrChile = postArrByCountry['chile'];
  let postArrAustralia = postArrByCountry['australia'];
  let postArrGermany = postArrByCountry['germany'];

  const arrData = {
    france: postArrFrance,
    usa: postArrUsa,
    italy: postArrItaly,
    chile: postArrChile,
    australia: postArrAustralia,
    germany: postArrGermany
  };

  const classNameOfFrance = `${classes.popularPost_item} ${classes.france}`;
  const classNameOfUsa = `${classes.popularPost_item} ${classes.usa}`;
  const classNameOfItaly = `${classes.popularPost_item} ${classes.italy}`;
  const classNameOfChile = `${classes.popularPost_item} ${classes.chile}`;
  const classNameOfAustralia = `${classes.popularPost_item} ${classes.australia}`;
  const classNameOfGermany = `${classes.popularPost_item} ${classes.germany}`;

  const mapData = [
    {postName: popularPostFrance, className: classNameOfFrance},
    {postName: popularPostUsa, className: classNameOfUsa},
    {postName: popularPostItaly, className: classNameOfItaly},
    {postName: popularPostChile, className: classNameOfChile},
    {postName: popularPostAustralia, className: classNameOfAustralia},
    {postName: popularPostGermany, className: classNameOfGermany},
  ];

  return (
    <main className={classes.home_container}>
      <div className={classes.home_wrapper}>
        <div className={classes.home_titleImg}>
          <h1>Decanting House</h1>
        </div>
        <div className={classes.home_popularPost_box}>
          <div className={classes.popularPost_title}>
            <h2>인기게시물</h2>
          </div>
          <div className={classes.popularPost_itemBox}>
            {mapData.map((data) => {
              return (
                <Link href={`/board/detail/${data.postName._id.toString()}`} className={data.className}>   
                  <div className={classes.popularPost_item_inner}>
                    <h3>{data.postName.userTitle}</h3>
                    <p>{data.postName.country.toUpperCase()} | {data.postName.uploadDate}</p>
                    <p>{data.postName.userContents}</p>
                  </div>
                  <p>by {data.postName.author}</p>
                </Link>
              );
            })} 
          </div>
        </div>
        <MainBoardPage post={arrData} />
      </div>
    </main>
  )
}
