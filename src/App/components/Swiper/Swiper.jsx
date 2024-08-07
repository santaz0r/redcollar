import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import styles from './swiper.module.scss';
import common from '../../../styles/_common.module.scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { filesEndpoint } from '../../config.json';

export const GallerySwiper = ({ elements }) => {
  const items = elements ? elements : [];

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      pagination
      navigation={{ nextEl: `.${common.swiper__btn_next}`, prevEl: `.${common.swiper__btn_prev}` }}
      spaceBetween={16}
      slidesPerView={3}
    >
      {items.map((i) => (
        <SwiperSlide key={i.id}>
          <div className={styles.swiper__img}>
            <img src={`${filesEndpoint}${i.url}`} alt={i.name.replace(i.ext, '')} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
