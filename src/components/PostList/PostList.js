import React, { useEffect, useState } from "react";
import PostCard from "../PostCard/PostCard";
import "./PostList.scss";
import { useSelector } from "react-redux";

const PostList = ({ data }) => {
  const state = useSelector((state) => state);

  return (
    <div className="PostList">
      <div className="post-list__inner">
        {data && (data.length > 0) && data.map((post) => {
          return <div key={'post-list-' + post.id}>
            <PostCard data={post} />
          </div>;
        })}
      </div>
    </div>
  );
};

export default PostList;
