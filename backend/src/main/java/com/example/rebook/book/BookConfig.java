package com.example.rebook.book;

import com.example.rebook.category.Category;
import com.example.rebook.category.CategoryRepository;
import com.example.rebook.member.Member;
import com.example.rebook.member.MemberRepository;
import com.example.rebook.notification.notificationType.NotificationType;
import com.example.rebook.notification.notificationType.NotificationTypeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class BookConfig {
    @Bean
    CommandLineRunner commandLineRunner(BookRepository repository,
                                        CategoryRepository categoryRepository,
                                        NotificationTypeRepository notificationTypeRepo,
                                        MemberRepository memberRepository) {
        return args -> {
            Member quangdoan = new Member(
                    "quangdoan",
                    "123456",
                    "Nhật Quang",
                    "https://pyxis.nymag.com/v1/imgs/5e4/dfd/c59573793cc957a78d232f82d3832af173-17-thor.rsquare.w700.jpg",
                    "123,Xã Long Phước,Huyện Long Hồ,Tỉnh Vĩnh Long",
                    86,
                    857,
                    29599,
                    "123",
                    "quangdoan@gmail.com",
                    "0964455667",
                    false
            );

            Member lucas = new Member(
                    "lucas",
                    "123456",
                    "Lucas",
                    "https://i.pinimg.com/originals/86/f8/7a/86f87a9b855061d98211da0dd24e0534.jpg",
                    "Khu Tan Cang, 720A Dien Bien Phu,Phường 22,Quận Bình Thạnh,Thành phố Hồ Chí Minh",
                    79,
                    765,
                    26956,
                    "Khu Tan Cang, 720A Dien Bien Phu",
                    "lucas@gmail.com",
                    "0964499887",
                    false
            );

            Member percy = new Member(
                    "percy",
                    "123456",
                    "Percy",
                    "https://pyxis.nymag.com/v1/imgs/8fa/98e/3a01cd0da4f1558b478d5bf7a74e488f1d-05-evans-america.rsquare.w330.jpg",
                    "72 Lê Thánh Tôn,Phường Bến Nghé,Quận 1,Thành phố Hồ Chí Minh",
                    79,
                    760,
                    26740,
                    "72 Lê Thánh Tôn",
                    "percy@gmail.com",
                    "0964411223",
                    false
            );

            Member admin1 = new Member(
                    "admin",
                    "admin",
                    "First Admin",
                    "https://pyxis.nymag.com/v1/imgs/8fa/98e/3a01cd0da4f1558b478d5bf7a74e488f1d-05-evans-america.rsquare.w330.jpg",
                    "",
                    1,
                    1,
                    1,
                    "",
                    "",
                    "",
                    true
            );

            memberRepository.save(admin1);

            Category category1 = new Category("Sách Thiếu Nhi");
            Category category2 = new Category("Sách Văn Học");
            Category category3 = new Category("Sách Kỹ Năng Sống");
            Category category4 = new Category("Sách Kinh Tế");
            Category category5 = new Category("Sách Học Ngoại Ngữ");
            Category category6 = new Category("Sách Tham Khảo");
            Category category7 = new Category("Truyện Tranh, Manga, Comic");
            Category category8 = new Category("Sách Kiến Thức Tổng Hợp");
            Category category9 = new Category("Sách Bà Mẹ - Em Bé");
            Category category10 = new Category("Sách Chính Trị - Pháp Lý");
            Category category11 = new Category("Sách Y Học");
            Category category12 = new Category("Sách Tôn Giáo - Tâm Linh");
            Category category13 = new Category("Sách Lịch sử");
            Category category14 = new Category("Sách Thường Thức - Gia Đình");
            Category category15 = new Category("Sách Khoa Học - Kỹ Thuật");
            Category category16 = new Category("Sách Văn Hóa - Địa Lý - Du Lịch");
            Category category17 = new Category("Sách Giáo Khoa - Giáo Trình");
            Category category18 = new Category("Từ Điển");
            Category category19 = new Category("Điện Ảnh - Nhạc - Họa");
            Category category20 = new Category("Sách Tâm lý - Giới tính");
            Category category21 = new Category("Thể Dục - Thể Thao");
            Category category22 = new Category("Tạp Chí - Catalogue");
            Category category23 = new Category("Sách Công Nghệ Thông Tin");
            Category category24 = new Category("Sách Nông - Lâm - Ngư Nghiệp");

            List<Category> categoryList = new ArrayList<>();
//            categoryList.add(category1);
//            categoryList.add(category2);
//            categoryList.add(category3);
            categoryList.add(category4);
            categoryList.add(category5);
            categoryList.add(category6);
            categoryList.add(category7);
            categoryList.add(category8);
            categoryList.add(category9);
            categoryList.add(category10);
            categoryList.add(category11);
            categoryList.add(category12);
            categoryList.add(category13);
            categoryList.add(category14);
            categoryList.add(category15);
            categoryList.add(category16);
            categoryList.add(category17);
            categoryList.add(category18);
            categoryList.add(category19);
            categoryList.add(category20);
            categoryList.add(category21);
            categoryList.add(category22);
            categoryList.add(category23);
            categoryList.add(category24);
            categoryRepository.saveAll(categoryList);


            Book book1 = new Book(
                    "Bố Già",
                    "Mario Puzo",
                    "Thế giới ngầm được phản ánh trong tiểu thuyết Bố Già là sự gặp gỡ giữa một bên là ý chí cương cường và nền tảng gia tộc chặt chẽ theo truyền thống mafia xứ Sicily với một bên là xã hội Mỹ nhập nhằng đen trắng, mảnh đất màu mỡ cho những cơ hội làm ăn bất chính hứa hẹn những món lợi kếch xù. Trong thế giới ấy, hình tượng Bố Già được tác giả dày công khắc họa đã trở thành bức chân dung bất hủ trong lòng người đọc. Từ một kẻ nhập cư tay trắng đến ông trùm tột đỉnh quyền uy, Don Vito Corleone là con rắn hổ mang thâm trầm, nguy hiểm khiến kẻ thù phải kiềng nể, e dè, nhưng cũng được bạn bè, thân quyến xem như một đấng toàn năng đầy nghĩa khí. Nhân vật trung tâm ấy đồng thời cũng là hiện thân của một pho triết lí rất “đời” được nhào nặn từ vốn sống của hàng chục năm lăn lộn giữa chốn giang hồ bao phen vào sinh ra tử, vì thế mà có ý kiến cho rằng “Bố Già là sự tổng hòa của mọi hiểu biết. Bố Già là đáp án cho mọi câu hỏi”.",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/bo-gia-front-side.jpg?alt=media&token=3024cf7e-9b03-4452-9853-c85af0a67d1d",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/bo-gia-back-side.jpg?alt=media&token=d6b43ea3-4033-4e78-87d9-bc75d3692a1c",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/bo-gia-total-side.jpg?alt=media&token=f0000976-c135-41c8-b1c7-c5a1010b7836",
                    "Nhà Xuất Bản Đông A",
                    "Tiếng Việt",
                    301,
                    11000,
                    80,
                    false,
                    quangdoan,
                    category3
            );

            Book book2 = new Book(
                    "Tôi Là Bêtô",
                    "Nguyễn Nhật Ánh",
                    "Tôi Là Bêtô là tác phẩm mới nhất của nhà văn chuyên viết cho thanh thiếu niên của Nguyễn Nhật Ánh. Anh đã được đông đảo bạn đọc biết đến qua các tác phẩm quen thuộc như Thằng quỷ nhỏ, Trại hoa vàng, Bong bóng lên trời, Cô gái đến từ hôm qua… và hai bộ truyện nhiều tập Kính vạn hoa và Chuyện xứ Lang Biang. Với Tôi là Bêtô, đây là lần đầu tiên anh viết một tác phẩm qua lời kể của một chú cún. Trong thiên truyện này, thế giới được nhìn một cách trong trẻo nhưng lồng trong đó không thiếu những ý tứ thâm trầm, khiến người đọc phải ngẫm nghĩ. Đây chắc chắn là tác phẩm không chỉ dành cho trẻ em.",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/toi-la-beto-front-side.jpg?alt=media&token=801a0c9b-b399-48d4-ae48-0c28888cecb1",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/toi-la-beto-back-side.jpg?alt=media&token=44f40ed6-f3da-4564-9251-364d28e4a0a9",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/toi-la-beto-total-side.jpg?alt=media&token=d01871f1-bcb8-43e1-a3d9-cc6c82c02c3b",
                    "Nhà xuất bản trẻ",
                    "Việt Nam",
                    229,
                    60000,
                    85,
                    false,
                    quangdoan,
                    category2
            );

            Book book3 = new Book(
                    "Mười Người Da Đen Nhỏ",
                    "Agatha Christine",
                    "One of the most famous and beloved mysteries from The Queen of Suspense — Agatha Christie — now a Lifetime TV movie.",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/muoi-nguoi-da-den-nho-front-side.jpg?alt=media&token=1fdbc934-846b-4d9c-979f-ca39594ada25",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/muoi-nguoi-da-den-nho-back-side.jpg?alt=media&token=e5911397-c3c5-41c0-961f-985ddea9d4a4",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/muoi-nguoi-da-den-nho-total-side.jpg?alt=media&token=9ef276c8-4e8c-4fa1-93ef-7c6a5d159495",
                    "Nhà xuất bản trẻ",
                    "Việt Nam",
                    269,
                    85000,
                    90,
                    false,
                    quangdoan,
                    category2
            );

            Book book4 = new Book(
                    "Cánh Đồng Bất Tận",
                    "Nguyễn Ngọc Tư",
                    "Cánh đồng bất tận bao gồm những truyện hay và mới nhất của nhà văn Nguyễn Ngọc Tư. Đây là tác phẩm đang gây xôn xao trong đời sống văn học, bởi ở đó người ta tìm thấy sự dữ dội, khốc liệt của đời sống thôn dã qua cái nhìn của một cô gái. Bi kịch về nỗi mất mát, sự cô đơn được đẩy lên đến tận cùng, khiến người đọc có lúc cảm thấy nhói tim...",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/canh-dong-bat-tan-front-end.jpg?alt=media&token=93fcdc74-ed8a-4ca8-9e98-437b26278a29",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/canh-dong-bat-tan-back-end.jpg?alt=media&token=3c539957-c56a-4d2c-86d2-1ca2d7499bfd",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/canh-dong-bat-tan-total-end.jpg?alt=media&token=9b809d76-ee26-451b-83b3-e2daf3434255",
                    "Nhà xuất bản trẻ",
                    "Việt Nam",
                    269,
                    85000,
                    90,
                    false,
                    percy,
                    category2
            );

            Book book5 = new Book(
                    "Con Trai Người Thợ Gốm",
                    "Tony Mitton",
                    "Tại nước Nhật Bản xưa, ở một ngôi làng nhỏ bên dòng sông hiền hòa, Ryo - con trai người thợ gốm đang sống những ngày hết sức bình yên và tĩnh lặng. Đột ngột một ngày bọn cướp kéo đến, hùng hổ đe dọa dân làng để rồi bị một người lạ mặt hình dung giản dị đánh tan. Bị ấn tượng, Ryo quyết phải trở thành một người hùng như thế và ra đi tìm thầy học nghệ để làm chủ vận mệnh của mình…",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/con-trai-nguoi-tho-gom-front-side.jpg?alt=media&token=e9d08488-83ae-4ca3-bacf-535eb26a1681",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/con-trai-nguoi-tho-gom-back-side.jpg?alt=media&token=ad2b87b9-2c3f-487c-9cae-3ff71e649ec1",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/con-trai-nguoi-tho-gom-total-side.jpg?alt=media&token=e68344eb-3a92-4867-ae1d-2578d8d06bb0",
                    "Nhà Xuất Bản Văn Học",
                    "Việt Nam",
                    269,
                    108000,
                    90,
                    false,
                    percy,
                    category2
            );

            Book book6 = new Book(
                    "Factfulness - Sự Thật Về Thế Giới",
                    "Hans Rosling",
                    "Khi được hỏi những câu hỏi đơn giản về các xu hướng toàn cầu - có bao nhiêu phần trăm dân số thế giới sống trong đói nghèo; tại sao dân số thế giới gia tăng; có bao nhiêu bé gái được đến trường - ta thường có những câu trả lời sai một cách có hệ thống. Sai đến mức mà ngay cả những chú khỉ đột chọn những câu trả lời ngẫu nhiên mà vẫn còn cho kết quả tốt hơn một cách nhất quán so với các giáo viên, nhà báo, các nhà ngân hàng đầu tư, và cả những người đoạt giải Nobel.",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/factfullness-front-side.jpg?alt=media&token=aada5bd9-f334-458a-a08c-cc6f6385c7f3",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/factfullness-back-side.jpg?alt=media&token=f899c995-a3cf-427b-9f44-5408565ca076",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/factfullness-total-side.jpg?alt=media&token=9347db5e-8afc-4115-8591-346d2f37834e",
                    "Nhà xuất bản trẻ",
                    "Việt Nam",
                    269,
                    160000,
                    90,
                    false,
                    percy,
                    category3
            );

            Book book7 = new Book(
                    "Xách Va Li Đến Xứ Anh Đào",
                    "Phong Phương, An Nhiên",
                    "Những năm gần đây, số lượng sinh viên Việt Nam đến sinh sống và học tập tại Nhật Bản tăng cao. Từ sau năm 2016, số lượng các bạn trẻ Việt đến Nhật đã vượt qua đối tượng tương ứng ở Mĩ. Xứ sở hoa anh đào chính thức trở thành điểm đến du học lí tưởng đối với du học sinh Việt Nam.",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/xach-vali-den-xu-anh-dao-front-side.jpg?alt=media&token=c3047e15-a76b-4233-971e-21570d675fe1",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/xach-vali-den-xu-anh-dao-back-side.jpg?alt=media&token=43794ae3-6533-4220-8687-6fd4de081066",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/xach-vali-den-xu-anh-dao-total-side.jpg?alt=media&token=5d807986-3452-41f2-aeed-6d57241e14ee",
                    "Nhà xuất bản Kim Đồng",
                    "Việt Nam",
                    269,
                    82000,
                    90,
                    false,
                    lucas,
                    category1
            );

            Book book8 = new Book(
                    "Sáu Tỉ Đường Đến Hạnh Phúc",
                    "Stefan Klein",
                    "Với Sáu tỉ đường đến hạnh phúc, nhà báo khoa học hàng đầu Stefan Klein đã bao quát những chuyên ngành mới nhất của khoa học thần kinh và tâm lý học để giải thích hạnh phúc được hình thành trong não bộ của ta như thế nào, nó phục vụ mục đích sinh học gì, và những điều kiện cần để hỗ trợ cho cuộc “mưu cầu hạnh phúc”.",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/sau-ti-duong-den-hanh-phuc-front-side.jpg?alt=media&token=f26ef033-10ea-46a3-80f5-046e1e26abbb",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/sau-ti-duong-den-hanh-phuc-back-side.jpg?alt=media&token=eb82d81c-76e8-41a9-b674-22bcae8d14c0",
                    "https://firebasestorage.googleapis.com/v0/b/sharebook-e4418.appspot.com/o/sau-ti-duong-den-hanh-phuc-total-side.jpg?alt=media&token=7b6be117-d07c-4432-97d2-f03c40ffe874",
                    "Nhà xuất bản Nhã Nam",
                    "Việt Nam",
                    269,
                    118000,
                    90,
                    false,
                    lucas,
                    category3
            );

            List<Book> bookList = new ArrayList<>();
            bookList.add(book1);
            bookList.add(book2);
            bookList.add(book3);
            bookList.add(book4);
            bookList.add(book5);
            bookList.add(book6);
            bookList.add(book7);
            bookList.add(book8);
            repository.saveAll(bookList);

            NotificationType type1 = new NotificationType("Request Notification");
            NotificationType type2 = new NotificationType("Request Status Notification");
            NotificationType type3 = new NotificationType("Reminder Notification");
            NotificationType type4 = new NotificationType("Cancel Reminder Notification");
            NotificationType type5 = new NotificationType("Cancel Request Notification");
            NotificationType type6 = new NotificationType("Book Notification");
            NotificationType type7 = new NotificationType("Member Banned Notification");
            notificationTypeRepo.save(type1);
            notificationTypeRepo.save(type2);
            notificationTypeRepo.save(type3);
            notificationTypeRepo.save(type4);
            notificationTypeRepo.save(type5);
            notificationTypeRepo.save(type6);
            notificationTypeRepo.save(type7);
        };
    }
}
