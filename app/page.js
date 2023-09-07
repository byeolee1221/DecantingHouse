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
      const result = await db.collection('Forum').find({country: data}).limit(5).toArray();
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
            <Link href={`/board/detail/${popularPostFrance._id.toString()}`} className={classNameOfFrance}>   
              <div className={classes.popularPost_item_inner}>
                <h3>{popularPostFrance.userTitle}</h3>
                <p>{popularPostFrance.country.toUpperCase()} | {popularPostFrance.uploadDate}</p>
                <p>{popularPostFrance.userContents}</p>
              </div>
              <p>by {popularPostFrance.author}</p>
            </Link>
            <Link href={`/board/detail/${popularPostUsa._id.toString()}`} className={classNameOfUsa}>   
              <div className={classes.popularPost_item_inner}>
                <h3>{popularPostUsa.userTitle}</h3>
                <p>{popularPostUsa.country.toUpperCase()} | {popularPostUsa.uploadDate}</p>
                <p>{popularPostUsa.userContents}</p>   
              </div>  
              <p>by {popularPostUsa.author}</p>
            </Link>
            <Link href={`/board/detail/${popularPostItaly._id.toString()}`} className={classNameOfItaly}> 
              <div className={classes.popularPost_item_inner}>
                <h3>{popularPostItaly.userTitle}</h3>
                <p>{popularPostItaly.country.toUpperCase()} | {popularPostItaly.uploadDate}</p>
                <p>{popularPostItaly.userContents}</p>           
              </div>    
              <p>by {popularPostItaly.author}</p>
            </Link>
            <Link href={`/board/detail/${popularPostChile._id.toString()}`} className={classNameOfChile}>
              <div className={classes.popularPost_item_inner}>
                <h3>{popularPostChile.userTitle}</h3>
                <p>{popularPostChile.country.toUpperCase()} | {popularPostChile.uploadDate}</p>
                <p>{popularPostChile.userContents}</p>
              </div>     
              <p>by {popularPostChile.author}</p>
            </Link>
            <Link href={`/board/detail/${popularPostAustralia._id.toString()}`} className={classNameOfAustralia}>  
              <div className={classes.popularPost_item_inner}>
                <h3>{popularPostAustralia.userTitle}</h3>
                <p>{popularPostAustralia.country.toUpperCase()} | {popularPostAustralia.uploadDate}</p>
                <p>{popularPostAustralia.userContents}</p>
              </div>   
              <p>by {popularPostAustralia.author}</p>
            </Link>
            <Link href={`/board/detail/${popularPostGermany._id.toString()}`} className={classNameOfGermany}>
              <div className={classes.popularPost_item_inner}>
                <h3>{popularPostGermany.userTitle}</h3>
                <p>{popularPostGermany.country.toUpperCase()} | {popularPostGermany.uploadDate}</p>
                <p>{popularPostGermany.userContents}</p>
              </div>     
              <p>by {popularPostGermany.author}</p>
            </Link>
          </div>
        </div>
        <MainBoardPage post={arrData} />
      </div>
    </main>
  )
}
