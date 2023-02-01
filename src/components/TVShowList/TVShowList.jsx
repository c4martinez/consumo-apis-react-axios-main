import TVShowListItem from "../TVShowListItem/TVShowListItem";
import s from "./style.module.css";
const TVShowList = ({ onClickItem, TVShowList}) => (
  <div>
    <div className={s.title}>surely you would like to see these shows</div>
    <div className={s.list}>
      {TVShowList.map((tvShow) =>{
        return(
          <span key={tvShow.id}>
            <TVShowListItem tvShow={tvShow} onClick={onClickItem}/>
          </span>
        );
      })}
    </div>
  </div>
)

export default TVShowList