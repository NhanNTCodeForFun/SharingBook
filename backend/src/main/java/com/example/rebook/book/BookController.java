package com.example.rebook.book;

import com.example.rebook.dtos.NewBookRequest;
import com.example.rebook.dtos.UpdateBookRequest;
import com.example.rebook.dtos.UploadImage;
import com.example.rebook.dtos.book.CheckBookDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/books")
public class BookController {
    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> getBooks() {
        List<Book> allBookList = bookService.getBooks();
        List<Book> availableBooks = new ArrayList<>();
        allBookList.forEach(book -> {
            if (!book.getTransferStatus()) {
                availableBooks.add(book);
            }
        });
        return availableBooks;
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id) {
        return bookService.getBookById(id);
    }

    @PostMapping
    public void postNewBook(@RequestBody NewBookRequest newBookRequest) {
        bookService.addBook(newBookRequest);
    }

    @PutMapping(path = {"/{bookId}"})
    public void updateBook(@PathVariable("bookId") Long bookId, @RequestBody UpdateBookRequest updateBookRequest) {
        bookService.updateBook(bookId, updateBookRequest);
    }

    @PutMapping(path = "/display/{bookId}")
    public void setBookDisplay(@PathVariable("bookId") Long bookId) {
        bookService.setBookDisplay(bookId);
    }

    @PutMapping(path = "/hide/{bookId}")
    public void setBookHide(@PathVariable("bookId") Long bookId) {
        bookService.setBookHide(bookId);
    }

    @DeleteMapping(path = "/{bookId}")
    public void deleteBook(@PathVariable("bookId") Long bookId) {
        bookService.deleteBook(bookId);
    }

    @PostMapping(path = "/upload")
    public void uploadImage(@ModelAttribute UploadImage data) {
        bookService.uploadImage(data);
    }

    @PostMapping(path = "/check")
    public void adminCheckBook(@RequestBody CheckBookDTO dto) {
        bookService.checkBook(dto);
    }
}
