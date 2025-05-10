import { useState } from "react"
import { useSearchUser } from "@/services/userApi"
import { useAuthStore } from "@/stores/auth-store"
import { useChatStore } from "@/stores/chat-store"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const SelectUser = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [keyword, setKeyword] = useState("")
  const { setCurrentRoom } = useChatStore()
  const { user: currentUser } = useAuthStore()
  const { data } = useSearchUser(keyword)
  const users = data?.result

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? users?.find((user) => user.username === value)?.firstName +
              " " +
              users?.find((user) => user.username === value)?.lastName
            : "Select user..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search user..."
            className="h-9"
            value={keyword}
            onValueChange={(value) => setKeyword(value)}
          />
          <CommandList className="max-h-[300px] overflow-y-auto w-full">
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {users?.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.username}
                  onSelect={(currentValue: string) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                    if (currentUser)
                      setCurrentRoom({
                        id: user.id,
                        members: [user, currentUser],
                        createdAt: new Date().toISOString(),
                      })
                  }}
                >
                  <Avatar className="size-6 mr-2">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.firstName[0]}</AvatarFallback>
                  </Avatar>
                  {user.firstName} {user.lastName} - {user.email}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === user.username ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SelectUser
