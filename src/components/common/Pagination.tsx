import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as UIPagination,
} from "../ui/pagination";

const Pagination = ({ current, max }: { current: number; max: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const handleUpdateParam = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <UIPagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handleUpdateParam(current - 1)}
            className={`${current == 1 && "pointer-events-none opacity-50"}`}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() => handleUpdateParam(1)}
            isActive={current == 1}
          >
            1
          </PaginationLink>
        </PaginationItem>

        {current > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {current > 2 && (
          <PaginationItem>
            <PaginationLink onClick={() => handleUpdateParam(current - 1)}>
              {current - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {current > 1 && current < max && (
          <PaginationItem>
            <PaginationLink isActive onClick={() => handleUpdateParam(current)}>
              {current}
            </PaginationLink>
          </PaginationItem>
        )}

        {current < max - 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => handleUpdateParam(current + 1)}>
              {current + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {current < max - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {max > 1 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => handleUpdateParam(max)}
              isActive={current == max}
            >
              {max}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => handleUpdateParam(current + 1)}
            className={`${current == max && "pointer-events-none opacity-50"}`}
          />
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
};

export default Pagination;
