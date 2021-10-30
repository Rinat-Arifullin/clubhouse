import React from "react";
import { Header } from "components/Header";
import BackButton from "components/BackButton";
import Room from "components/Room";
import Axios from "core/axios";
import { TConversationCard } from "components/ConversationCard";
import { GetServerSideProps, NextPageContext } from "next";

interface IRoomProps {
  room: TConversationCard;
}

interface IContext extends NextPageContext {
  id: string;
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

export const getServerSideProps = async (context: IContext) => {
  try {
    const { id: roomId } = context.query;
    const { data: rooms } = await Axios.get("/rooms.json");
    const room = (rooms as TConversationCard[]).find(
      (room) => room.id === roomId
    );
    return {
      props: { room: room ?? null },
    };
  } catch (e) {
    return {
      props: { room: [] },
    };
  }
};
