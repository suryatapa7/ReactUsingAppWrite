import React, { useEffect, useState } from "react";

import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

const PostCard = ({ $id, image, title }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    appwriteService.getFilePreview(image).then((url) => {
      setImageUrl(url);
    });
  }, [image]);

  console.log("image: " + imageUrl);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-indigo-300 h-80 rounded-xl p-4 text-amber-300" key={$id}>
        <div className="w-full justify-center mb-4">
          <img src={imageUrl} alt={title} className="rounded-xl h-36" />
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default PostCard