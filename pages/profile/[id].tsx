import React from "react";
import { Profile } from "components/Profile";
import { useRouter } from "next/router";
import { Header } from "components/Header";

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Header />
      <div className="container mt-40">
        <Profile
          fullname="Arifullin Riant"
          username="arifullin"
          avatarUrl="https://batman-on-film.com/wp-content/uploads/2021/10/THEBATMAN-batman-poster-dcfd21-banner2-534x400.jpg"
          about="About about about"
        />
      </div>
    </>
  );
};

export default ProfilePage;
