import Link from "next/link";
import { connectDB } from "@/util/database";
import MainBoardPage from "./mainBoard/mainBoard";

import classes from "./page.module.css";

export default async function Home () {
  const db = (await connectDB).db('DecantingHouse');
  let popularPostFrance = await db.collection('Forum').find({country: 'france', count: {$gt: 0}}).sort({ count: -1 }).limit(1).toArray();
  let popularPostUsa = await db.collection('Forum').find({country: 'usa', count: {$gt: 0}}).sort({ count: -1 }).limit(1).toArray();
  let popularPostItaly = await db.collection('Forum').find({country: 'italy', count: {$gt: 0}}).sort({ count: -1 }).limit(1).toArray();
  let popularPostChile = await db.collection('Forum').find({country: 'chile', count: {$gt: 0}}).sort({ count: -1 }).limit(1).toArray();
  let popularPostAustralia = await db.collection('Forum').find({country: 'australia', count: {$gt: 0}}).sort({ count: -1 }).limit(1).toArray();
  let popularPostGermany = await db.collection('Forum').find({country: 'germany', count: {$gt: 0}}).sort({ count: -1 }).limit(1).toArray();

  let postArrFrance = await db.collection('Forum').find({country: 'france'}).limit(5).toArray();
  let postArrUsa = await db.collection('Forum').find({country: 'usa'}).limit(5).toArray();
  let postArrItaly = await db.collection('Forum').find({country: 'italy'}).limit(5).toArray();
  let postArrChile = await db.collection('Forum').find({country: 'chile'}).limit(5).toArray();
  let postArrAustralia = await db.collection('Forum').find({country: 'australia'}).limit(5).toArray();
  let postArrGermany = await db.collection('Forum').find({country: 'germany'}).limit(5).toArray();

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
            <Link href={`/board/detail/${popularPostFrance[0]?._id}`} className={classNameOfFrance}>   
              <div className={classes.popularPost_item_inner}>
                <h3>{popularPostFrance[0]?.userTitle}</h3>
                <p>{popularPostFrance[0]?.country.toUpperCase()} | {popularPostFrance[0]?.uploadDate}</p>
                <p>{popularPostFrance[0]?.userContents}</p>
              </div>
              <p>by {popularPostFrance[0]?.author}</p>
            </Link>
            <Link href={`/board/detail/${popularPostUsa[0]?._id}`} className={classNameOfUsa}>   
              <div className={classes.popularPost_item_inner}>
                <h3>{popularPostUsa[0]?.userTitle}</h3>
                <p>{popularPostUsa[0]?.country.toUpperCase()} | {popularPostUsa[0]?.uploadDate}</p>
                <p>{popularPostUsa[0]?.userContents}</p>   
              </div>  
              <p>by {popularPostUsa[0]?.author}</p>
            </Link>
            <Link href={`/board/detail/${popularPostItaly[0]?._id}`} className={classNameOfItaly}> 
              <div className={classes.popularPost_item_inner}>
                <h3>{popularPostItaly[0]?.userTitle}</h3>
                <p>{popularPostItaly[0]?.country.toUpperCase()} | {popularPostItaly[0]?.uploadDate}</p>
                <p>{popularPostItaly[0]?.userContents}</p>           
              </div>    
              <p>by {popularPostItaly[0]?.author}</p>
            </Link>
            <Link href={`/board/detail/${popularPostChile[0]?._id}`} className={classNameOfChile}>
              <div className={classes.popularPost_item_inner}>
                <h3>{popularPostChile[0]?.userTitle}</h3>
                <p>{popularPostChile[0]?.country.toUpperCase()} | {popularPostChile[0]?.uploadDate}</p>
                <p>{popularPostChile[0]?.userContents}</p>
              </div>     
              <p>by {popularPostChile[0]?.author}</p>
            </Link>
            <Link href={`/board/detail/${popularPostAustralia[0]?._id}`} className={classNameOfAustralia}>  
              <div className={classes.popularPost_item_inner}>
                <h3>{popularPostAustralia[0]?.userTitle}</h3>
                <p>{popularPostAustralia[0]?.country.toUpperCase()} | {popularPostAustralia[0]?.uploadDate}</p>
                <p>{popularPostAustralia[0]?.userContents}</p>
              </div>   
              <p>by {popularPostAustralia[0]?.author}</p>
            </Link>
            <Link href={`/board/detail/${popularPostGermany[0]?._id}`} className={classNameOfGermany}>
              <div className={classes.popularPost_item_inner}>
                <h3>{popularPostGermany[0]?.userTitle}</h3>
                <p>{popularPostGermany[0]?.country.toUpperCase()} | {popularPostGermany[0]?.uploadDate}</p>
                <p>{popularPostGermany[0]?.userContents}</p>
              </div>     
              <p>by {popularPostGermany[0]?.author}</p>
            </Link>
          </div>
        </div>
        <MainBoardPage post={arrData} />
      </div>
    </main>
  )
}
