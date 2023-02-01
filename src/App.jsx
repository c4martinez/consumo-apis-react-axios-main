// shif + alf + f para formatear
import { useState, useEffect, useMemo, useCallback } from "react";
import Logo from "./components/Logo/Logo";
import SearchBar from "./components/SearchBar/SearchBar";
import TVShowDetail from "./components/TVShowDetail/TvShowDetail";
import TVShowList from "./components/TVShowList/TVShowList";
import { TVShowAPI } from "./api/tv-show";
import { BACKDROP_BASE_URL } from "./config";
import logoImg from "./assets/images/logo.png";
import s from "./style.module.css";

function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const [ recomendationList, setrecomendationList ] = useState([]);

  // version normal
  async function fetchPopulars() {
    const popularTVShowList = await TVShowAPI.fetchPopulars();
    if (popularTVShowList && popularTVShowList.length > 0) {
      setCurrentTVShow(popularTVShowList[0]);
    }
  }

  // version con useCallback
  // const fetchPopulars = useCallback(async() => {
  //   const popularTVShowList = await TVShowAPI.fetchPopulars();
  //   if(popularTVShowList.length > 0){
  //     setCurrentTVShow(popularTVShowList[0]);
  //   }
  // }, [currentTVShow]);

  // version con useMemo
  // const fetchPopulars = useMemo(() => {
  //   return async()=> {
  //     const popularTVShowList = await TVShowAPI.fetchPopulars();
  //     if(popularTVShowList.length > 0){
  //       setCurrentTVShow(popularTVShowList[0]);
  //     }
  //   }
  // }, [currentTVShow]);

  async function fetchByTitle(title) {
    const searchResponse = await TVShowAPI.fetchByTitle(title);
    if (searchResponse.length >= 0) {
      setCurrentTVShow(searchResponse[0]);
    }
  }

  async function fetchRecomendaciones(tvShowId) {
    const recomendaciones = await TVShowAPI.fetchRecomendaciones(tvShowId);
    if (recomendaciones.length > 0) {
      setrecomendationList(recomendaciones.slice(0, 10));
    }
  }

  function updateCurrentTVShow(tvShow){
    setCurrentTVShow(tvShow)
  }

  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
    if(currentTVShow){
      fetchRecomendaciones(currentTVShow.id);
    }
  }, [currentTVShow]);

  

  console.log(currentTVShow);

  return (
    <div className={s.main_container}
    style={{
      background: currentTVShow
      ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
      url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
      : "black",
    }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo
              title="WatchShows"
              subtitle="Find a show you may like"
              image={logoImg}
            />
          </div>
          <div className="col-md-12 col-lg-4">
            <SearchBar onSubmit={fetchByTitle} />
          </div>
        </div>
      </div>
      <div className="s.tv_show_details">
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommended_shows}>
        {currentTVShow && (
          < TVShowList
          onClickItem={updateCurrentTVShow}
          TVShowList={recomendationList}
          />
        )}
        </div>
    </div>
  );
}

export default App;
