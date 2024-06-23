# Ghiblo

## Mục Lục
1. [Giới Thiệu](#giới-thiệu)
2. [Tổng Quan Kiến Trúc](#tổng-quan-kiến-trúc)
    - [Các Thành Phần Hệ Thống](#các-thành-phần-hệ-thống)
    - [Luồng Dữ Liệu](#luồng-dữ-liệu)
3. [Triển Khai](#triển-khai)
4. [Giám Sát và Ghi Nhật Ký](#giám-sát-và-ghi-nhật-ký)
5. [Khả Năng Mở Rộng và Hiệu Suất](#khả-năng-mở-rộng-và-hiệu-suất)
6. [Cân Nhắc Về Bảo Mật](#cân-nhắc-về-bảo-mật)
7. [Phát Triển và Kiểm Thử](#phát-triển-và-kiểm-thử)
8. [Kết Luận](#kết-luận)
9. [Phụ Lục](#phụ-lục)
    - [Thuật Ngữ](#thuật-ngữ)
    - [Tài Liệu Tham Khảo](#tài-liệu-tham-khảo)

---

## Giới Thiệu
Tài liệu này cung cấp cái nhìn tổng quan về kiến trúc sản xuất cho Ghiblo. Nó bao gồm các thành phần hệ thống, luồng dữ liệu, quy trình triển khai, giám sát, ghi nhật ký, khả năng mở rộng, hiệu suất, các biện pháp bảo mật, và các thực hành phát triển và kiểm thử.

**Lưu ý:** Do kỳ thi cuối kỳ, dự án này đã được hoàn thành trong thời gian ngắn gọn là 2,5 ngày. Mặc dù nó chưa hoàn thiện hoàn toàn, em mong muốn cải thiện nó trong tương lai và biết ơn sự thông cảm.

## Tổng Quan Kiến Trúc
### Các Thành Phần Hệ Thống
Các thành phần chính của hệ thống bao gồm:

- **Frontend:** Được xây dựng bằng React.js, chịu trách nhiệm giao diện người dùng.
- **Backend:** Phát triển bằng Nest.js, xử lý logic nghiệp vụ và các yêu cầu API.
- **Cơ sở dữ liệu:** Firebase Firestore, một cơ sở dữ liệu NoSQL để lưu trữ dữ liệu ứng dụng.
- **Xác thực:** Firebase Authentication, để quản lý và xác thực người dùng.
- **Hosting:** Firebase Hosting, để phục vụ các ứng dụng frontend và backend.
- **Chức năng:** Firebase Cloud Functions, cho logic backend serverless và các điểm cuối API.

### Luồng Dữ Liệu
Minh họa luồng dữ liệu qua hệ thống:

1. **Tương Tác Người Dùng:**
   - Người dùng tương tác với ứng dụng qua frontend React.js.
   - Hành động của người dùng kích hoạt các sự kiện như gửi biểu mẫu, nhấp chuột hoặc điều hướng trang.

2. **Yêu Cầu Frontend:**
   - Frontend React.js gửi các yêu cầu HTTP đến backend Nest.js qua các API RESTful.
   - Các yêu cầu này bao gồm dữ liệu như đầu vào của người dùng, token xác thực và tham số truy vấn.

3. **Xử Lý Backend:**
   - Backend Nest.js nhận các yêu cầu và xử lý chúng theo logic nghiệp vụ.
   - Nó xác thực đầu vào, thực hiện các tính toán cần thiết và chuẩn bị các phản hồi.

4. **Tương Tác Cơ Sở Dữ Liệu:**
   - Để lưu trữ và truy xuất dữ liệu, backend giao tiếp với Firebase Firestore.
   - Các hoạt động CRUD (Create, Read, Update, Delete) được thực hiện trên các tài liệu và bộ sưu tập của Firestore.

5. **Xác Thực:**
   - Firebase Authentication quản lý các phiên người dùng và xác minh các token xác thực được bao gồm trong các yêu cầu frontend.
   - Backend sử dụng Firebase Admin SDK để tương tác với hệ thống xác thực và thực thi các quy tắc bảo mật.

6. **Cloud Functions:**
   - Một số logic backend và các điểm cuối API được triển khai dưới dạng Firebase Cloud Functions.
   - Các chức năng này xử lý các tác vụ như xử lý dữ liệu, tích hợp API bên thứ ba và các hoạt động không đồng bộ.

7. **Phản Hồi đến Frontend:**
   - Backend gửi các phản hồi trở lại frontend, bao gồm các thông báo thành công, tải trọng dữ liệu hoặc thông tin lỗi.
   - Frontend React.js cập nhật giao diện người dùng dựa trên dữ liệu nhận được.

8. **Cập Nhật Theo Thời Gian Thực:**
   - Firestore hỗ trợ cập nhật theo thời gian thực, cho phép frontend đăng ký các thay đổi trong các tài liệu hoặc bộ sưu tập cụ thể.
   - Các thay đổi trong Firestore kích hoạt các cập nhật theo thời gian thực trong frontend React.js, cung cấp cho người dùng dữ liệu trực tiếp.

### Sơ Đồ Luồng Dữ Liệu Mẫu
```plaintext
+------------+          +-------------+          +-------------+          +-------------+
|   Người    |  ---->   |  Frontend   |  ---->   |  Backend    |  ---->   |  Cơ Sở Dữ Liệu|
|   Dùng     |          | (React.js)  |          | (Nest.js)   |          | (Firestore) |
+------------+          +-------------+          +-------------+          +-------------+
      ^                      |                      |                         |
      |                      v                      v                         v
+------------+         +-------------+          +-------------+          +-------------+
| Tương Tác  |  <----  |  Yêu Cầu    |  <----   |  Phản Hồi   |  <----   |  Truy Vấn   |
| Sự Kiện    |         |   HTTP      |          |   API       |          |  Dữ Liệu    |
+------------+               ^                        |                         |
                             |                        v                         v
                        +-------------+          +-------------+          +-------------+
                        |  Xác Thực   | <----   | Cloud Functions| <---- |  Cập Nhật   |
                        | (Firebase)  |        |  (Firebase)    |        | Theo Thời   |
                        +-------------+          +-------------+          |   Gian Thực|
                                                                         +-------------+
```

## Triển Khai
Hiện tại, triển khai được thực hiện thủ công. Trong tương lai, một quy trình CI/CD sẽ được triển khai để tự động hóa quy trình triển khai.

### Quy Trình Triển Khai Hiện Tại
1. Thay đổi mã được đẩy lên kho GitHub.
2. Frontend được xây dựng và triển khai lên Firebase Hosting.
3. Backend và Cloud Functions được triển khai lên Firebase bằng cách sử dụng Firebase CLI.

## Giám Sát và Ghi Nhật Ký
Các thực hành giám sát và ghi nhật ký rất quan trọng để duy trì sức khỏe hệ thống và chẩn đoán sự cố.

### Thực Hành Hiện Tại
- **Firebase Console:** Cung cấp các khả năng giám sát và ghi nhật ký cơ bản cho các dịch vụ Firebase.
- **Ghi Nhật Ký Firestore:** Ghi nhật ký cơ bản được triển khai trong ứng dụng Nest.js để theo dõi các sự kiện và lỗi quan trọng.

### Cải Tiến Tương Lai
- Tích hợp các công cụ giám sát toàn diện hơn như Google Cloud Monitoring và Logging.
- Triển khai ghi nhật ký có cấu trúc trong Nest.js để cải thiện khả năng truy xuất và chẩn đoán lỗi.

## Khả Năng Mở Rộng và Hiệu Suất
### Tình Trạng Hiện Tại
Kiến trúc hiện tại sử dụng các tính năng mở rộng tự động của Firebase. Firebase Hosting, Firestore và Cloud Functions tự động mở rộng dựa trên mức sử dụng.

### Cải Tiến Tương Lai
- Tối ưu hóa các truy vấn và chỉ mục của Firestore để cải thiện hiệu suất.
- Triển khai các chiến lược lưu vào bộ nhớ đệm để giảm tải cho cơ sở dữ liệu.

## Cân Nhắc Về Bảo Mật
### Tình Trạng Hiện Tại
Các biện pháp bảo mật cơ bản đã được triển khai sử dụng Firebase Authentication để quản lý người dùng.

### Cải Tiến Tương Lai
- Triển khai SSL/TLS cho tất cả các giao tiếp.
- Sử dụng các biến môi trường để quản lý các chi tiết cấu hình nhạy cảm.
- Tiến hành các cuộc kiểm tra bảo mật và đánh giá lỗ hổng thường xuyên.

## Phát Triển và Kiểm Thử
### Tình Trạng Hiện Tại
Các thực hành phát triển và kiểm thử hiện tại vẫn chưa chính thức.

### Cải Tiến Tương Lai
- Triển khai các kiểm thử đơn vị cho các thành phần React.js và dịch vụ Nest.js.
- Thiết lập các kiểm thử tích hợp cho các điểm cuối API.
- Tự động hóa các kiểm thử bằng công cụ CI như GitHub Actions hoặc Jenkins.

## Kết Luận
Tài liệu này đã phác thảo kiến trúc sản xuất cho Ghiblo, bao gồm các thành phần hệ thống, luồng dữ liệu, triển khai, giám sát, khả năng mở rộng, bảo mật và thực hành phát triển. Các cải tiến trong tương lai sẽ tập trung vào cải thiện triển khai, bảo mật và kiểm thử.

## Phụ Lục
### Thuật Ngữ
- **CI/CD:** Continuous Integration and Continuous Deployment.
- **JWT:** JSON Web Token.
- **SSL/TLS:** Secure Sockets Layer / Transport Layer Security.

### Tài Liệu Tham Khảo
- [Tài liệu React.js](https://reactjs.org/docs/getting-started.html)
- [Tài liệu Nest.js](https://docs.nestjs.com/)
- [Tài liệu Firebase](https://firebase.google.com/docs)

---
