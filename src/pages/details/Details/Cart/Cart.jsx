import React, { useContext, useEffect, useState } from "react";
import VideoPopup from "../../../../components/VideoPopoup/VideoPopup";
import "./Cart.scss";
import ContentWrapper from "../../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import Img from "../../../../components/lazyLoadingImage/img";
import { PlayIcon } from "../PlayIcon/PlayIcon";
import { TOKEN } from "../../../../Shared/TOKEN";
import { AuthContext } from "../../../../components/Provider/AuthProvider";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const Cart = ({ video, crew }) => {
  const { user } = useContext(AuthContext);

  // const { mediaType, id } = useParams();
  // const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  // console.log(data);

  const [show, setShow] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const {
    data: cart,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/api/v1/cart?email=${user?.email}`
      );
      const jsonData = await res.json();
      return jsonData.data; // Assuming your data is inside a 'data' property
    },
  });

  console.log(cart);

  const loadingSkeleton = () => {
    return (
      <div className="skItem">
        <div className="thumb skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/api/v1/cart/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.data) {
              refetch();
            }
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="videoSkeleton">
        {loadingSkeleton()}
        {loadingSkeleton()}
        {loadingSkeleton()}
        {loadingSkeleton()}
      </div>
    );
  }

  return (
    <div className="videosSections">
      <ContentWrapper>
        <div className="sectionHeading">
          <div className="videos">
            {cart?.map((vd) => (
              <div key={vd.id}>
                <div
                  key={vd.id}
                  className="videoItem"
                  // onClick={() => {
                  //   setVideoId(video?.key);
                  //   setShow(true);
                  // }}
                >
                  <Link to={`${vd?.productId}`}>
                    <div className="videoThumbnail">
                      <Img src={vd?.image} />
                      <PlayIcon />
                      <div className="videoTitle">
                        {vd?.name && vd.name.slice(0, 20)}
                        {vd?.name2 && vd.name2.slice(0, 20)}
                      </div>
                    </div>
                  </Link>
                </div>
                <div
                  onClick={() => handleDelete(vd?.id)}
                  style={{ display: "flex", color: "red" }}
                >
                  <MdDelete />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentWrapper>
      <VideoPopup
        show={show}
        setShow={setShow}
        videoId={videoId}
        setVideoId={setVideoId}
      />
    </div>
  );
};

export default Cart;
