import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificationError } from "../store/notification/notification";
// import { postsRequestAsync } from "../store/posts/posts";
import postsSlice from "../store/requests/postsSlice";

export const usePosts = (page) => {
  const dispatch = useDispatch();
  const posts = useSelector((store) => store.posts.data);
  const token = useSelector((store) => store.token.token);
  const loading = useSelector((store) => store.posts.loading);
  const isLast = useSelector((store) => store.posts.isLast);

  useEffect(() => {
    if (!token) {
      dispatch(notificationError("Необходимо авторизоваться на странице."));
      return;
    }

    // dispatch(postsRequestAsync(page));
    dispatch(postsSlice.actions.request({ page }));
  }, [page]);
  return { posts, loading, isLast };
};
