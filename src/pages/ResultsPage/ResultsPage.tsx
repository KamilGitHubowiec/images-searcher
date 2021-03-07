import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import styles from "./ResultsPage.module.scss";
import useWindowDimensions from "../../helpers/useWindowDimensions";
import { getPhotosUrl } from "../../helpers/API";
import { Icons } from "../../helpers/Icons";
import SearchBar from "../../components/SearchBar/SearchBar";
import PopupModal from "../../components/PopupModal/PopupModal";
import WordsSlider from "../../components/WordSlider/WordsSlider";

const ResultsPage: React.FC = () => {
  const { query }: any = useParams();
  const [page, setPage] = useState<number>(1);
  const [photos, setPhotos] = useState<any>([]);
  const [photoId, setPhotoId] = useState<string>('');
  const [columnsToDisplay, setColumnsToDisplay] = useState<number>(3)
  const { windowHeight, windowWidth } = useWindowDimensions();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const url = getPhotosUrl(query, page);
    axios.get(url).then((response) => {
      setPhotos([...photos, ...response.data.results]);
    })
  }, [page])

  useEffect(() => {
    const url = getPhotosUrl(query, page);
    axios.get(url).then((response) => {
      setPhotos([...response.data.results]);
    })
  }, [query])

  useEffect(() => {
    if (windowWidth < 765) setColumnsToDisplay(1);
    if (windowWidth > 765 && windowWidth < 990) setColumnsToDisplay(2);
    else setColumnsToDisplay(3);
  }, [windowWidth])

  const openPopupModal = (e: any) => {
    setPhotoId(e.target.dataset.id);    
    setIsModalOpen(true);
  }
  
  const closePopupModal = () => {
    setIsModalOpen(false);
  }

  const columnWithPhotos = (firstElement = 0, iterator = 3) => {
    let photosToRenderArray: any = [];
      for (let i = firstElement; i < photos.length; i = i + iterator) {
        photosToRenderArray.push(photos[i]);
      }

    return (
      photosToRenderArray.map((photo: any) => {
        return(
          <div className={styles.result_container} key={photo.id}>
            <img 
              alt={photo.alt_description}
              onClick={(e) => openPopupModal(e)} 
              data-id={photo.id} 
              className={styles.img} 
              src={`${photo.urls.regular}`}/>
            <div className={styles.tags}> 
              {photo.tags.map((tag: any) => <span className={styles.tag}>{tag.title}</span>)}
            </div>
          </div>  
        )
      })
    )
  }

  const renderResults = () => {
    return (
      <div className={styles.results_container}>
        <div className={styles.results_header}>
          <h1>{query.charAt(0).toUpperCase() + query.slice(1).toLowerCase()}</h1>
          <WordsSlider />
        </div>
          <InfiniteScroll 
            dataLength={photos.length} 
            hasMore={true} 
            next={() => setPage(page + 1)} 
            loader={"Make something awesome"}
            className={styles.results_grid}>
              <div>
                {columnWithPhotos(0, columnsToDisplay)}
              </div>
              {windowWidth > 765 &&
                <div>
                  {columnWithPhotos(1, columnsToDisplay)}
                </div>
              }
              {windowWidth > 990 &&
                <div>
                  {columnWithPhotos(2, columnsToDisplay)}
                </div>
              }
          </InfiniteScroll>
      </div>
    )
  }

  return (
    <div>
      <nav className={styles.navbar}>
        <Link className={styles.logo} to="/">{Icons.iconUnsplash}</Link>
        <SearchBar containerStyling={true}/>
      </nav>
      {photos.length > 0 && renderResults()}
      {isModalOpen && <PopupModal photos={photos} selectedPhotoId={photoId} closeModal={closePopupModal}/>}
    </div>
  )
}

export default ResultsPage;