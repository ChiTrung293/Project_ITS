// ---------------------------------------------
// Breadcrumbs
// Dynamic breadcrumb navigation
// ---------------------------------------------

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Map các segment URL sang nhãn tiếng Việt
 */
const SEGMENT_LABELS: Record<string, string> = {
  admin: "Quản trị viên",
  manager: "Quản lý đội xe",
  dashboard: "Dashboard",
  "fleet-map": "Bản đồ Đội xe & IoT",
  users: "Tài khoản",
  settings: "Cấu hình",
  buildings: "Trạm xe công cộng",
  pricing: "Bảng giá thuê xe",
  feedbacks: "Sự cố & Phản hồi",
  reports: "Thống kê Doanh thu",
  profile: "Hồ sơ",
  forbidden: "Truy cập bị từ chối",
  bookings: "Đặt giữ & Chuyến đi",
  "vehicle-types": "Loại xe cho thuê",
};

interface BreadcrumbsProps {
  className?: string;
}

export function Breadcrumbs({ className }: BreadcrumbsProps) {
  const pathname = usePathname();

  // Lọc bỏ route groups (auth), (dashboard), (driver)
  const segments = pathname
    .split("/")
    .filter((s) => s && !s.startsWith("("));

  if (segments.length === 0) return null;

  return (
    <nav
      className={cn("flex items-center gap-1.5 text-sm", className)}
      aria-label="Breadcrumb"
    >
      <Link
        href="/"
        className="flex items-center text-muted-foreground/60 hover:text-foreground transition-colors duration-200"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>

      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;
        const label = SEGMENT_LABELS[segment] || segment;

        return (
          <span key={href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 text-muted-foreground/30" />
            {isLast ? (
              <span className="font-medium text-foreground">{label}</span>
            ) : (
              <Link
                href={href}
                className="text-muted-foreground/60 hover:text-foreground hover:underline underline-offset-4 transition-colors duration-200"
              >
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
