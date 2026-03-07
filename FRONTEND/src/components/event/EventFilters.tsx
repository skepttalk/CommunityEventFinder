import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EventFiltersProps {
  search: string;
  city: string;
  type: string;
  sort: string;
  cities: string[];
  onSearchChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export default function EventFilters({
  search,
  city,
  type,
  sort,
  cities,
  onSearchChange,
  onCityChange,
  onTypeChange,
  onSortChange,
}: EventFiltersProps) {
  const handleCityChange = (value: string) => {
    if (value === "all") {
      onCityChange("");
    } else {
      onCityChange(value);
    }
  };

  const handleTypeChange = (value: string) => {
    if (value === "all") {
      onTypeChange("");
    } else {
      onTypeChange(value);
    }
  };

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Input
        placeholder="Search events..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <Select value={city || "all"} onValueChange={handleCityChange}>
        <SelectTrigger>
          <SelectValue placeholder="City" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Cities</SelectItem>

          {cities.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={type || "all"} onValueChange={handleTypeChange}>
        <SelectTrigger>
          <SelectValue placeholder="Type" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Events</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="upcoming">Upcoming</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sort} onValueChange={onSortChange}>
        <SelectTrigger>
          <SelectValue placeholder="Sort" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="latest">Latest</SelectItem>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="popular">Popular</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
