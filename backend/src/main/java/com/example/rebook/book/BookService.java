package com.example.rebook.book;

import com.example.rebook.category.Category;
import com.example.rebook.category.CategoryRepository;
import com.example.rebook.dtos.NewBookRequest;
import com.example.rebook.dtos.UpdateBookRequest;
import com.example.rebook.dtos.UploadImage;
import com.example.rebook.dtos.book.CheckBookDTO;
import com.example.rebook.dtos.notification.NewBookNotificationDTO;
import com.example.rebook.exception.ResourceNotFoundException;
import com.example.rebook.member.Member;
import com.example.rebook.member.MemberRepository;
import com.example.rebook.notification.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class BookService {
    private final BookRepository bookRepository;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;
    private final NotificationService notificationService;

    @Autowired
    public BookService(BookRepository bookRepository, MemberRepository memberRepository,
                       CategoryRepository categoryRepository, NotificationService notificationService) {
        this.bookRepository = bookRepository;
        this.memberRepository = memberRepository;
        this.categoryRepository = categoryRepository;
        this.notificationService = notificationService;
    }

    public List<Book> getBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book with id " + id + " does not exists"));
    }

    public void addBook(NewBookRequest newBook) {
        Long memberId = newBook.getMemberId();
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResourceNotFoundException("Member with id " + memberId + " does not exists"));
        Category category = categoryRepository.findById(newBook.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category with id " + newBook.getCategoryId() + " does not exists"));
        Book book = new Book(
                newBook.getBookName(),
                newBook.getAuthor(),
                newBook.getDescription(),
                newBook.getFrontSideImage(),
                newBook.getBackSideImage(),
                newBook.getTotalImage(),
                newBook.getPublisher(),
                "Việt Nam",
                300,
                newBook.getBookPrice(),
                newBook.getBookQuality(),
                false,
                member,
                category
        );
        bookRepository.save(book);
    }

    @Transactional
    public void updateBook(Long bookId, UpdateBookRequest updatedBook) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new IllegalStateException("Book"));
        Category updatedCategory = categoryRepository.findById(updatedBook.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category with id " + updatedBook.getCategoryId() + " does not exists"));
        book.setName(updatedBook.getBookName());
        book.setAuthor(updatedBook.getAuthor());
        book.setCategory(updatedCategory);
        book.setPublisher(updatedBook.getPublisher());
        book.setPrice(updatedBook.getPrice());
        book.setQuality(updatedBook.getQuality());
        book.setTransferStatus(updatedBook.getStatus());
        bookRepository.save(book);
    }

    public void deleteBook(Long bookId) {
        boolean exists = bookRepository.existsById(bookId);
        if (!exists) {
            throw new IllegalStateException("Book with id " + bookId + " does not exists");
        }
        bookRepository.deleteById(bookId);
    }

    public void uploadImage(UploadImage data) {
        System.out.println(data.getName());
    }

    public void setBookDisplay(Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Not Found"));
        book.setDisplay(true);
        bookRepository.save(book);
    }

    public void setBookHide(Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResourceNotFoundException("Not Found"));
        book.setDisplay(false);
        bookRepository.save(book);
    }

    public void checkBook(CheckBookDTO dto) {
        Long bookId = dto.getBookId();
        boolean status = dto.isStatus();

        Book book = bookRepository.getById(bookId);
        book.setChecked(status);
        bookRepository.save(book);

        NewBookNotificationDTO notificationDTO = new NewBookNotificationDTO(bookId, status);
        notificationService.newBookNotification(notificationDTO);
    }
}
