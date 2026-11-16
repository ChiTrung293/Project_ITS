# Project_ITS — Hệ thống Cho thuê Phương tiện Giao thông Chia sẻ (Shared Mobility)

Dự án được xây dựng cho môn **Chuyên đề Hệ thống Giao thông Thông minh (ITS)**, tái sử dụng và nâng cấp từ nền tảng kiến trúc `PBMS` (`Java-Project`) sang mô hình **Shared Mobility & Fleet Management** gồm 3 phân hệ:

1. **Backend API (`backend/`)**: Java 17 + Spring Boot 3.5 + Microsoft SQL Server + Spring Security (JWT) + Swagger OpenAPI + VNPay Sandbox + SSE Realtime + Module Giả lập IoT & Pessimistic Lock Concurrency Control.
2. **Web Admin (`frontend/`)**: Next.js + React + TypeScript + Tailwind CSS + Recharts + **Bản đồ số VietMap (Leaflet)** giám sát đội xe theo thời gian thực qua SSE + Bảng điều khiển giả lập IoT & Kiểm thử Concurrency.
3. **Mobile App (`mobile-android/`)**: Native Android viết bằng **Kotlin + Jetpack Compose** (Material 3) + **Google Maps Compose kết hợp lớp bản đồ VietMap** + Quét mã QR mở khóa + Điều khiển chuyến đi (IoT Simulator) + Thanh toán **VNPay Sandbox**.

---

## Cấu trúc thư mục

```text
Project_ITS/
├── backend/                     # Spring Boot REST API (Port 8080)
├── frontend/                    # Web Admin Next.js + VietMap (Port 3000)
├── mobile-android/              # Android Native App (Kotlin + Jetpack Compose)
├── docs/                        # Tài liệu kỹ thuật & Kết quả thực nghiệm tiểu luận
├── start-its.bat                # Script khởi động nhanh Backend + Web Admin
└── README.md
```

---

## Hướng dẫn cài đặt & khởi chạy

### 1. Cơ sở dữ liệu (Microsoft SQL Server)
- Database mặc định: `project_its_db` trên `localhost:1433`.
- Cấu hình nằm sẵn trong `backend/.env`. Khi Backend khởi chạy lần đầu, `DataSeeder` sẽ tự động tạo **6 trạm xe tại TP.HCM** (UTH Cơ sở 1, Ga Metro Văn Thánh, Vinhomes Tân Cảng, Phố đi bộ Nguyễn Huệ, NVH Thanh Niên, UTH Cơ sở 3) và **16 phương tiện** (`ITS-BK-*`, `ITS-EB-*`, `ITS-ES-*`, `ITS-KS-*`).

### 2. Chạy Backend & Web Admin
Chạy file `start-its.bat` hoặc mở 2 terminal riêng biệt:

```powershell
# Terminal 1: Backend (yêu cầu JDK 17)
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
$env:PATH = "C:\Program Files\Java\jdk-17\bin;$env:PATH"
cd backend
.\mvnw.cmd spring-boot:run
```

```powershell
# Terminal 2: Web Admin
cd frontend
npm install
npm run dev
```

- **Web Admin**: http://localhost:3000
- **Bản đồ Đội xe & Giả lập IoT**: http://localhost:3000/admin/fleet-map
- **Swagger UI**: http://localhost:8080/swagger-ui/index.html

### 3. Chạy Mobile App Android (`mobile-android/`)
1. Mở thư mục `Project_ITS/mobile-android` bằng **Android Studio**.
2. Chạy trên **Android Emulator** (API 26–35). App tự động kết nối Backend qua địa chỉ `http://10.0.2.2:8080/api/v1/`.
3. Tài khoản thử nghiệm nhanh:
   - Khách thuê: `user` / `password` (hoặc `thanh.tu` / `password`)
   - Quản trị viên (Web Admin): `admin` / `password`

---

## Kiểm thử thực nghiệm Concurrency (Chương 5)

Chạy kiểm thử 50 luồng đồng thời đặt giữ cùng 1 phương tiện (`ITS-EB-001`):

```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-17"
$env:PATH = "C:\Program Files\Java\jdk-17\bin;$env:PATH"
cd backend
.\mvnw.cmd test -Dtest=ConcurrencyReservationTest
```
