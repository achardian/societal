import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils";

import ProfileForm from "@/components/forms/profile-form";
import db from "@/lib/db";

const getProfile = async (userId: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    return user;
  } catch (error) {
    console.log("[USER_ID]", error);
    return error;
  }
};

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);

  const profile = await getProfile(session?.user.id as string);

  return (
    <div className="px-3 py-10">
      <ProfileForm profile={profile as User} />
    </div>
  );
};

export default SettingsPage;
