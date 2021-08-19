<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="frontend/assets/images/app_logo.jpg" alt="Logo" width="100" height="100">
  </a>

  <h3 align="center">ShareBook</h3>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">Đôi nét về ứng dụng</a>
      <ul>
        <li><a href="#built-with">Các công nghệ sử dụng</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Bắt đầu</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#run">Chạy ứng dụng</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Trao đổi sách với nhau, why not??

Bạn đang sở hữu quá nhiều sách cũ và không biết làm gì với chúng?

Bạn chỉ muốn đọc sách để lấy kiến thức chứ không muốn giữ sách?

Bạn mong muốn tìm kiếm những cuốn sách cũ mà giờ đây không còn xuất bản nữa?

Bạn mong muốn sở hữu cuốn sách mà không mất một đồng nào?

📙📙 **Ứng dụng ShareBook sẽ giải đáp những thắc mắc trên** 📙📙

🖐️ Xin chào mọi người, bọn mình là nhóm sinh viên đến từ ngành Kỹ Thuật Phần Mềm của Đại Học FPT. Hiện tại bọn mình đang phát triển một ứng dụng di động hỗ trợ người dùng kết nối vào trao đổi sách cũ với nhau. Vì thế nên bọn mình tạo ra khảo sát này để hiểu rõ hơn về thói quen cũng như nhu cầu khi sử dụng sách của mọi người nhằm xây dựng một ứng dụng chỉn chu và sát với nhu cầu của mọi người nhất có thể. Mỗi mẫu khảo sát của mọi người sẽ là một nguồn tư liệu quý giá giúp ích cho chúng mình rất nhiều trong quá trình phát triển ứng dụng sau này. App chúng mình có tên là ReBook 😌

👀 Rebook có nghĩa là gì?

ReBook là Re là “sự trở lại” – Book là “sách”. Ở đây chúng mình muốn nhấn mạnh app sẽ hỗ trợ bạn trao đổi sách của bạn với những người khác

**Những dịch vụ mà App ReBook sẽ mang đến cho các bạn:**

👉 Hỗ trợ tìm đối tượng trao đổi phù hợp

👉 Hỗ trợ tìm đối tượng trao đổi nếu bạn ở xa

👉 Kết nối được với mọi người

👉 Tìm được thể loại sách mà bạn đang tìm kiếm mà không mất công phải đến nhà sách

👉 Tiết kiệm được nguồn chi tiêu của bạn

🔥 Thú vị lắm đúng không các cậu, chính vị vậy bọn mình cần sự trợ giúp từ các cậu thông qua việc khảo sát về nhu cầu sử dụng sách của mọi người. Hãy giúp chúng mình bỏ thời gian 1 xíu phút để bọn mình có thể hoàn thiện ứng dụng này một cách hiệu quả nhất 🔥

### Built With

Những công nghệ mà chúng mình sử dụng trong project này:

- [React Native](https://reactnative.dev/)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)

<!-- GETTING STARTED -->

## Getting Started

Tiến hành cài đặt và chạy project.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

## Installation

### Front End

1. Clone the repo
   ```sh
   git clone https://github.com/doannhatquang27/booksharingdemo.git
   ```
2. Di chuyển đến thư mục frontend
   ```sh
   cd frontend
   ```
3. Install NPM packages
   ```sh
   npm install
   ```

## Run

### Run Frontend

1. Di chuyển đến thư mục docker
   ```sh
   cd frontend
   ```
2. Run command
   ```sh
   npx react-native run-android
   ```

### Run Backend Với Docker

1. Di chuyển đến thư mục docker
   ```sh
   cd backend/src/main/docker
   ```
2. Build Docker Image
   ```sh
   docker-compose build
   ```
3. Run Docker Image
   ```sh
   docker-compose up
   ```
