import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Option = {
  label: string;
  value: string;
};

const SelectBox = ({
  options,
  onSelectChange,
}: {
  options: Option[];
  onSelectChange: (value:string) => void;
}) => {
  return (
    <Select onValueChange={(value) => onSelectChange(value)}>
      <SelectTrigger className="w-full mb-2 ">
        <SelectValue defaultValue={options[0].value} placeholder={options[0].label} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem value={option.value} key={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectBox;
