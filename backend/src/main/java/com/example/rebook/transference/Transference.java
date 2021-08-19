package com.example.rebook.transference;

import com.example.rebook.book.Book;
import com.example.rebook.reminder.Reminder;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table
public class Transference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transferenceId;

    @ManyToOne
    @JoinColumn(name = "from_book_id", referencedColumnName = "bookId")
    private Book fromBook;

    @ManyToOne
    @JoinColumn(name = "to_book_id", referencedColumnName = "bookId")
    private Book toBook;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.EAGER)
    @JoinColumn(name = "reminder_id", nullable = true)
    private Reminder reminder;

    private Date date;
    private String requestStatus; //bao gồm Accept, Refuse, Cancel, Pending
    private String processStatus; //bao gồm Success, Fail, Pending

    public Transference() {
    }

    public Transference(Book fromBook, Book toBook) {
        this.fromBook = fromBook;
        this.toBook = toBook;
        this.date = new Date(System.currentTimeMillis());
        this.requestStatus = "Pending";
        this.processStatus = "Pending";
    }

    public Transference(Book fromBook, Book toBook, Reminder reminder) {
        this.fromBook = fromBook;
        this.toBook = toBook;
        this.reminder = reminder;
        this.date = new Date(System.currentTimeMillis());
        this.requestStatus = "Pending";
        this.processStatus = "Pending";
    }

    public Long getTransferenceId() {
        return transferenceId;
    }

    public void setTransferenceId(Long transferenceId) {
        this.transferenceId = transferenceId;
    }

    public Book getFromBook() {
        return fromBook;
    }

    public void setFromBook(Book fromBook) {
        this.fromBook = fromBook;
    }

    public Book getToBook() {
        return toBook;
    }

    public void setToBook(Book toBook) {
        this.toBook = toBook;
    }

    public Reminder getReminder() {
        return reminder;
    }

    public void setReminder(Reminder reminder) {
        this.reminder = reminder;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getRequestStatus() {
        return requestStatus;
    }

    public void setRequestStatus(String requestStatus) {
        this.requestStatus = requestStatus;
    }

    public String getProcessStatus() {
        return processStatus;
    }

    public void setProcessStatus(String processStatus) {
        this.processStatus = processStatus;
    }

    @Override
    public String toString() {
        return "Transference{" +
                "transferenceId=" + transferenceId +
                ", fromBook=" + fromBook +
                ", toBook=" + toBook +
                ", reminder=" + reminder +
                ", date=" + date +
                ", requestStatus='" + requestStatus + '\'' +
                ", processStatus='" + processStatus + '\'' +
                '}';
    }
}
