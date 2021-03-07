import React, { useEffect, useState } from "react";
import styles from "./PopupModal.module.scss";
import { Icons } from "../../helpers/Icons";
import { convertDateToYearAndMonth } from "../../helpers/convertDate";

interface Props {
  photos: [],
  selectedPhotoId: string,
  closeModal: any
}

const PopupModal: React.FC<Props> = ({ photos = [], selectedPhotoId = '', closeModal}) => {
  const [currentPhotoIndex, setcurrentPhotoIndex] = useState<number>(0);

  const findSelectedPhotoIndex = () => {
    return photos.findIndex((photo: any) => photo.id === selectedPhotoId);
  }

  useEffect(() => {
    setcurrentPhotoIndex(findSelectedPhotoIndex());
  }, [])

  const getPreviousPhoto = () => {
    if(currentPhotoIndex <= 0) return;
    setcurrentPhotoIndex(currentPhotoIndex - 1);
  }

  const getNextPhoto = () => {
    if(currentPhotoIndex >= photos.length - 1) return;
    setcurrentPhotoIndex(currentPhotoIndex + 1);
  }

  const renderModal = () => {
    const photoData: any = photos[currentPhotoIndex];

    if(photoData){ return(
      <div className={styles.popup_modal}>
        <div className={styles.top_info}>
          <div className={styles.author}>
            <div className={styles.author__profile_img} style={{backgroundImage: `url(${photoData.user.profile_image.small})`}} />
            <div className={styles.author__name}>
              <span>{photoData.user.name}</span>
              <a href={photoData.user.links.html} target="__blank">{`@${photoData.user.username}`}</a>
            </div>
          </div>

          <div className={styles.buttons_group}>
            <div className={`${styles.like} ${styles.button_squared}`}>{Icons.iconHeart}</div>
            <div className={`${styles.add} ${styles.button_squared}`}>{Icons.iconAdd}</div>
          </div>
        </div>
        
        <div className={styles.img_container}>
          <div className={styles.img} style={{backgroundImage: `url(${photoData.urls.regular})`}} />
        </div>

        <div className={styles.bottom_info}>
          <div className={styles.location_and_time}>{Icons.iconLocation} {photoData.user.location}, {convertDateToYearAndMonth(photoData.created_at)}</div>
          <div className={styles.buttons_group}>
            <div className={`${styles.share} ${styles.button_squared}`}>{Icons.iconShare} Share</div>
            <div className={`${styles.info} ${styles.button_squared}`}>{Icons.iconInfo} Info</div>
          </div>
        </div>
      </div>
      )
    }
  }

  return (
    <div className={styles.popup_modal_container}>
      <div onClick={() => closeModal()} className={styles.backdrop} />
      <div onClick={() => closeModal()} className={styles.button_close}>{Icons.iconClose}</div>
      <div onClick={() => getPreviousPhoto()} className={`${styles.button_nav} ${styles.button_nav__go_previous}`} >{Icons.iconChevronLeft}</div>
      <div onClick={() => getNextPhoto()} className={`${styles.button_nav} ${styles.button_nav__go_next}`} >{Icons.iconChevronRight}</div>
      {renderModal()}
    </div>
  )
}

export default PopupModal;