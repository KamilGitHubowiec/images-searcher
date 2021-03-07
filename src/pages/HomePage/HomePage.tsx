import React from "react";
import styles from "./HomePage.module.scss";
import SearchBar from "../../components/SearchBar/SearchBar";

const HomePage: React.FC = () => {
  return( 
    <header>
      <img className={styles.img} /> 
      <div className={styles.search_box_container}>
        <div className={styles.search_box_content}>
          <h1>Unsplash</h1>
          <h2> 
            <span>The internet’s source of </span> 
            <a href="https://unsplash.com/license" target="__blank" >freely-usable images.</a> 
          </h2>
          <h2>Powered by creators everywhere.</h2>
          <SearchBar />
          <p><b>Trending</b>: flower, wallpapers, backgrounds, happy, love</p>
        </div>
      </div>
    </header>
  )
}

export default HomePage;