import Button from "components/Button";
import ConversationCard, {
  TConversationCard,
} from "components/ConversationCard";
import { Header } from "components/Header";
import Link from "next/link";
import Axiox from "core/axios";
import React from "react";

export default function Rooms({ rooms }: { rooms: TConversationCard[] }) {
  return (
    <>
      <Header />
      <div className="container">
        <div className="mt-40 d-flex align-items-center justify-content-between">
          <h1>All conversations</h1>
          <Button color="green">+ Start room</Button>
        </div>
        <div className="mt-40 grid gap-50">
          {rooms.map((room) => (
            <Link key={room.id} href={`/rooms/${room.id}`}>
              <a>
                <ConversationCard {...room} />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  try {
    const { data: rooms }: { data: TConversationCard } = await Axiox.get(
      "/rooms.json"
    );
    return { props: { rooms } };
  } catch (e) {
    return { props: { rooms: [] } };
  }
};
