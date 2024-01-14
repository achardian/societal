import { User } from "@prisma/client";
import { Briefcase, Mail, MapPinned, UserCircle } from "lucide-react";
import Link from "next/link";

const ProfileAbout = ({ profile }: { profile: User }) => {
  const { email, bio, job, location, website } = profile;
  return (
    <div className="px-3 py-5 flex flex-col gap-5">
      <div>
        <span className="flex items-center gap-2 text-basis bg-main text-white px-1 py-2 rounded-sm">
          <Mail className="h-5 w-5" />
          <span className="font-semibold">Email</span>
        </span>
        <p>{email}</p>
      </div>

      {bio && (
        <div>
          <span className="flex items-center gap-2 text-basis bg-main text-white px-1 py-2 rounded-sm">
            <UserCircle className="h-5 w-5" />
            <span className="font-semibold">Bio</span>
          </span>
          <p>{bio}</p>
        </div>
      )}

      {job && (
        <div>
          <span className="flex items-center gap-2 text-basis bg-main text-white px-1 py-2 rounded-sm">
            <Briefcase className="h-5 w-5" />
            <span className="font-semibold">Occupation</span>
          </span>
          <p>{job}</p>
        </div>
      )}

      {location && (
        <div>
          <span className="flex items-center gap-2 text-basis bg-main text-white px-1 py-2 rounded-sm">
            <MapPinned className="h-5 w-5" />
            <span className="font-semibold">Address</span>
          </span>
          <p>{location}</p>
        </div>
      )}

      {website && (
        <div>
          <span className="flex items-center gap-2 text-basis bg-main text-white px-1 py-2 rounded-sm">
            <UserCircle className="h-5 w-5" />
            <span className="font-semibold">Website</span>
          </span>
          <Link href={website} className="italic hover:text-blue-700">
            {website}
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileAbout;
