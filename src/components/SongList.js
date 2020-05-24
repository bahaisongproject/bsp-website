import React from "react";
import SongCard from "./SongCard";

const SongList = ({ songList }) => (
    <div className="flex justify-center">
        <div className="flex flex-wrap max-w-5xl">
            {songList.map((hit) => (
            <SongCard song={hit} key={hit.objectID} />
            ))}
        </div>
    </div>
);

export default SongList;