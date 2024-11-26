import { PenToolIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PostType, SuggestContent } from "@/utils/types";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useGetSuggestPostContentMutation } from "@/stores/api/postApi";

const SuggestPostContent = ({
  postType,
  onSubmit,
}: {
  postType: PostType;
  onSubmit: (content: string) => void;
}) => {
  const [suggestQuery, setSuggestQuery] = useState<SuggestContent>({
    amenity: "",
    area: 0,
    budget: 0,
    location: "",
    post_type: postType,
  });
  const handleInputChange = (type: string, value: string) => {
    setSuggestQuery((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  useEffect(() => {
    handleInputChange("post_type", postType);
  }, [postType]);
  const [getSuggestContent] = useGetSuggestPostContentMutation();
  const handleClickCreate = async () => {
    const { data } = await getSuggestContent(suggestQuery);
    onSubmit(data?.result || "");
    setOpen(false);
  };
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={() => setOpen(!open)}>
      <PopoverTrigger asChild>
        <Button
          size={"sm"}
          variant={"ghost"}
          className="absolute bottom-1 right-1 text-xs text-main-yellow"
        >
          Tạo nội dung với AI
          <PenToolIcon size={16} className="ml-1"></PenToolIcon>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="area">Diện tích</Label>
            <Input
              id="area"
              className="col-span-2 h-8"
              value={suggestQuery?.area}
              onChange={(e) => handleInputChange("area", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="budget">Ngăn sách</Label>
            <Input
              id="budget"
              className="col-span-2 h-8"
              value={suggestQuery?.budget}
              onChange={(e) => handleInputChange("budget", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="location">Vị trí</Label>
            <Input
              id="location"
              className="col-span-2 h-8"
              value={suggestQuery?.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="amenity">Tiện ích</Label>
            <Input
              id="amenity"
              className="col-span-2 h-8"
              value={suggestQuery?.amenity}
              onChange={(e) => handleInputChange("amenity", e.target.value)}
            />
          </div>
          <Button size={"sm"} onClick={handleClickCreate}>
            Tạo
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SuggestPostContent;
