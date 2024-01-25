"use client";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { User } from "@prisma/client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDebounce } from "use-debounce";
import ProfileImg from "./profile-img";
import OvalLoader from "./oval-loader";
import Image from "next/image";
import { cn } from "@/lib/utils";
import SearchIllustration from "@/assets/user-research.svg";

const SearchUser = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState<User[] | []>([]);
  const [value] = useDebounce(name, 1000);

  const getUsers = async () => {
    try {
      if (value) {
        const { data } = await axios.get(`/api/users?name=${value}`);
        return data;
      } else {
        return;
      }
    } catch (error) {
      return error;
    }
  };

  const { isFetching, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    onSuccess: (data) => {
      setUsers(data as User[]);
    },
  });

  useEffect(() => {
    refetch();
  }, [value, refetch]);

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput
        value={name}
        placeholder="Search user by a name or username"
        onChangeCapture={(e) => setName(e.currentTarget.value)}
      />
      {isFetching && (
        <div className="w-full my-5 flex items-center justify-center">
          <OvalLoader />
        </div>
      )}
      <CommandList>
        {users?.map((user) => (
          <Link
            key={user.id}
            href={`/profile/${user.username}`}
            className="flex items-center gap-3 w-full hover:bg-secondary p-3"
          >
            <ProfileImg src={user.image as string} className="w-12 h-12" />
            <div className="flex flex-col">
              <span className="text-[15px] font-semibold">{user.name}</span>
              <small className="italic">@{user.username}</small>
            </div>
          </Link>
        ))}
      </CommandList>

      <CommandEmpty
        className={cn(
          "relative w-full flex items-center justify-center",
          !value && "h-[300px]"
        )}
      >
        {!value && <Image src={SearchIllustration} alt="illustration" fill />}
        {value && !users && !isFetching && <span>No User Found!</span>}
      </CommandEmpty>
    </Command>
  );
};

export default SearchUser;
