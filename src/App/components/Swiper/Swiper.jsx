import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import styles from './swiper.module.scss';
import common from '../../../styles/_common.module.scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const GallerySwiper = ({ elements }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      pagination
      navigation={{ nextEl: `.${common.swiper__btn_next}`, prevEl: `.${common.swiper__btn_prev}` }}
      spaceBetween={16}
      slidesPerView={2}
    >
      {elements.map((i) => (
        <SwiperSlide key={i.id}>
          <div className={styles.swiper__img}>
            <img src={`http://localhost:1337${i.url}`} alt={i.name.replace(i.ext, '')} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
