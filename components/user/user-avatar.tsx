import { User } from "@prisma/client"

import { AvatarProps } from "@radix-ui/react-avatar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { FaUserAlt } from "react-icons/fa"

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <div className="flex items-center">
      <Avatar {...props}>
        {user.image ? (
          <AvatarImage alt="Picture" src={user.image} />
        ) : (
          <AvatarFallback>
            <span className="sr-only">{user.name}</span>
            <FaUserAlt />
          </AvatarFallback>
        )}
      </Avatar>
    </div>
  )
}
