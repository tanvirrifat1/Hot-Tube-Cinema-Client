import React from "react";
import "./DetailsBanner.scss";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadingImage/img";
import PosterFallback from "../../../assets/img/no-poster.png";
import dayjs from "dayjs";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/CircleRating/CircleRating";
import { PlayIcon } from "./PlayIcon/PlayIcon";

export default function DetailsBanner() {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}`);

  const { url } = useSelector((state) => state.home);

  const _genres = data?.genres?.map((g) => g?.id);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <>
              <div className="backdrop-img">
                <Img src={url?.backdrop + data?.backdrop_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data.poster_path ? (
                      <Img
                        className="posterImg"
                        src={url.backdrop + data.poster_path}
                      />
                    ) : (
                      <Img className="posterImg" src={PosterFallback} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data?.name || data?.title} (${dayjs(
                        data?.release_date
                      ).format("YYYY")})`}
                    </div>
                    <div className="subtitle">{data?.tagline}</div>
                    <Genres data={_genres} />
                    <div className="row">
                      <CircleRating rating={data?.vote_average.toFixed(1)} />
                      <div className="playbtn">
                        <PlayIcon />
                        <span className="text">Watch Video</span>
                      </div>
                    </div>
                    <div className="overview">
                      <div className="heading">overview</div>
                      <div className="description">{data?.overview}</div>
                    </div>
                  </div>
                </div>
              </ContentWrapper>
            </>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton">
              <div className="right">
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row skeleton"></div>
              </div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
}
