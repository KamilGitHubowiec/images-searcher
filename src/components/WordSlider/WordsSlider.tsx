import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./WordsSlider.module.scss";
import axios from "axios";
import { Icons } from "../../helpers/Icons";
import { getTopicsUrl } from "../../helpers/API";

const WordsSlider: React.FC = () => {
  const [topics, setTopics] = useState<any>([]);
  const [query, setQuery] = useState<string>("");
  const [x, setX] = useState<number>(0);
  const history = useHistory();

  useEffect(() => {
    fetchTopics();
  }, [])


  const fetchTopics = () => {
    const url: string = getTopicsUrl();

    axios.get(url).then((response) => {
      setTopics(response.data);
    })
  }

  const setSearchQuery = (e: any) => {
    history.push(e.target.textContent);
  }

  const renderButtonLeft = () => {
    const goLeft = () => {
      if (x >= 0) return;
      setX(x + 230);
    }

    return (
      <button className={`${styles.button_slider_nav} ${styles.button_slider_nav__left}`} onClick={() => goLeft()}>
        {Icons.iconChevronLeft}
      </button>
    )
  }

  const renderButtonRight = () => {
    const goRight = () => {
      if (x <= -180 ) return
      setX((x) => x - 230);
    }

    return (
      <button className={`${styles.button_slider_nav} ${styles.button_slider_nav__right}`} onClick={() => goRight()}>
        {Icons.iconChevronRight}
      </button>
    )
  }

  const renderSlider = () => {
    return (
      <div className={styles.words_slider_content}>
        {topics.slice(0, 14).map((topic: any) => {
          return (
            <div onClick={(e) => setSearchQuery(e)} className={styles.topic_container} style={{transform: `translateX(${x}px)`}}>
              {topic.title}
            </div>
          )
        })}
      </div>
    )
  }

  return( 
    <div className={styles.words_slider_container}>
      {renderButtonRight()}
      {topics && renderSlider()}
      {renderButtonLeft()}
    </div>
  )
}

export default WordsSlider;