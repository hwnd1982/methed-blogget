import PropTypes from 'prop-types';
import {useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import { postsSlice } from '../../../../store/requests/postsSlice';
// import {postsRequestAsync} from '../../../../store/posts/posts';
import style from './End.module.css';

export const End = () => {
  const endList = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(postsSlice.actions.request());
      }
    }, {
      rootMargin: '50px'
    });

    endList.current && observer.observe(endList.current);

    return () => {
      endList.current && observer.unobserve(endList.current);
    };
  }, [endList.current]);

  return (
    <li ref={endList} className={style.end} />
  );
};

End.propTypes = {
  ref: PropTypes.object,
};
