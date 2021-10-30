import React from "react";
import { Header } from "components/Header";
import BackButton from "components/BackButton";
import Room from "components/Room";
import Axios from "core/axios";
import { TConversationCard } from "components/ConversationCard";

interface IRoomProps {
  room: TConversationCard;
}

export default function RoomPage(props: IRoomProps) {
  const { room } = props;
  return (
    <>
      <Header />
      <div className="container mt-40">
        <BackButton title="All rooms" href="/rooms" />
      </div>
      <Room title={room?.title || "Новая комната"} />
    </>
  );
}

export const getServerSideProps = async (context) => {
  try {
    const { id } = context;
    const { data: rooms } = await Axios.get("/rooms.json");
    const room = (rooms as TConversationCard[]).find((room) => room.id === id);
    return {
      props: { room: room ?? null },
    };
  } catch (e) {
    return {
      props: { room: [] },
    };
  }
};
