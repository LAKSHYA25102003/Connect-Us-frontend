import {
  fetchPostsLoading,
  fetchPostsSuccess,
  fetchPostsFail,
} from "./postSlice";

export const getPosts = () => async (dispatch, getState) => {
  dispatch(fetchPostsLoading, true);
  const url = `${process.env.REACT_APP_BASE_URL}api/user/post/timeline/all`;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    },
  });
  response = await response.json();
  dispatch(fetchPostsSuccess(response.posts));
};

export const specificUserPosts = (id) => async (dispatch, getState) => {
  const url = `${process.env.REACT_APP_BASE_URL}api/user/post/profile/${id}`;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    },
  });
  response = await response.json();
  dispatch(fetchPostsSuccess(response.posts));
};

export const deletePost = (id) => async (dispatch, getState) => {
  const currentPosts = getState().post.posts;
  const updatedPosts = currentPosts.filter((post) => {
    return post._id !== id;
  });

  updatedPosts.sort((x, y) => {
    return new Date(x.timestamp) < new Date(y.timestamp) ? 1 : -1;
  });

  dispatch(fetchPostsSuccess(updatedPosts));
};
