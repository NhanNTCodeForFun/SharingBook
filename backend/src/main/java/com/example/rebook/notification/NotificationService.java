package com.example.rebook.notification;

import com.example.rebook.book.Book;
import com.example.rebook.book.BookRepository;
import com.example.rebook.dtos.notification.NewBookNotificationDTO;
import com.example.rebook.dtos.notification.ReminderNotificationDTO;
import com.example.rebook.dtos.notification.NewRequestNotificationDTO;
import com.example.rebook.member.Member;
import com.example.rebook.member.MemberRepository;
import com.example.rebook.notification.banMemberNotification.BanMemberNotification;
import com.example.rebook.notification.banMemberNotification.BanMemberNotificationRepository;
import com.example.rebook.notification.bookNotification.BookNotification;
import com.example.rebook.notification.bookNotification.BookNotificationRepository;
import com.example.rebook.notification.notificationType.NotificationType;
import com.example.rebook.notification.notificationType.NotificationTypeRepository;
import com.example.rebook.notification.reminderNotification.ReminderNotification;
import com.example.rebook.notification.reminderNotification.ReminderNotificationRepository;
import com.example.rebook.notification.requestNotification.RequestNotification;
import com.example.rebook.notification.requestNotification.RequestNotificationRepository;
import com.example.rebook.reminder.Reminder;
import com.example.rebook.reminder.ReminderRepository;
import com.example.rebook.transference.Transference;
import com.example.rebook.transference.TransferenceRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Optional;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationTypeRepository notificationTypeRepository;
    private final RequestNotificationRepository requestNotificationRepository;
    private final ReminderNotificationRepository reminderNotificationRepository;
    private final BookNotificationRepository bookNotificationRepository;
    private final MemberRepository memberRepository;
    private final BookRepository bookRepository;
    private final TransferenceRepository transferenceRepository;
    private final ReminderRepository reminderRepository;
    private final BanMemberNotificationRepository banMemberNotificationRepository;

    public NotificationService(NotificationRepository notificationRepository, NotificationTypeRepository notificationTypeRepository, RequestNotificationRepository requestNotificationRepository, ReminderNotificationRepository reminderNotificationRepository, BookNotificationRepository bookNotificationRepository, MemberRepository memberRepository, BookRepository bookRepository, TransferenceRepository transferenceRepository, ReminderRepository reminderRepository, BanMemberNotificationRepository banMemberNotificationRepository) {
        this.notificationRepository = notificationRepository;
        this.notificationTypeRepository = notificationTypeRepository;
        this.requestNotificationRepository = requestNotificationRepository;
        this.reminderNotificationRepository = reminderNotificationRepository;
        this.bookNotificationRepository = bookNotificationRepository;
        this.memberRepository = memberRepository;
        this.bookRepository = bookRepository;
        this.transferenceRepository = transferenceRepository;
        this.reminderRepository = reminderRepository;
        this.banMemberNotificationRepository = banMemberNotificationRepository;
    }

    public void newRequestNotification(NewRequestNotificationDTO dto) {
        NotificationType type = notificationTypeRepository.getById(1L);
        Timestamp time = new Timestamp(System.currentTimeMillis());
        Notification notification = new Notification(type, time);
        Notification savedNotification = notificationRepository.save(notification);

        Long fromMemberId = dto.getFromMemberId();
        Long toMemberId = dto.getToMemberId();
        Long fromBookId = dto.getFromBookId();
        Long toBookId = dto.getToBookId();

        Book fromBook = bookRepository.getById(fromBookId);
        Book toBook = bookRepository.getById(toBookId);
        Member fromUser = memberRepository.getById(fromMemberId);
        Member toUser = memberRepository.getById(toMemberId);

        RequestNotification requestNotification = new RequestNotification(
                savedNotification, fromUser, toUser, fromBook, toBook
        );
        requestNotificationRepository.save(requestNotification);
    }

    public void cancelRequestNotification(Long fromMemberId, Long toBookId) {
        NotificationType type = notificationTypeRepository.getById(5L);
        Timestamp time = new Timestamp(System.currentTimeMillis());
        Notification notification = new Notification(type, time);
        Notification savedNotification = notificationRepository.save(notification);

        Book toBook = bookRepository.getById(toBookId);
        Member fromUser = memberRepository.getById(fromMemberId);

        RequestNotification requestNotification = new RequestNotification(
                savedNotification, fromUser, toBook
        );
        requestNotificationRepository.save(requestNotification);
    }

    public void newRequestStatusNotification(Long transferenceId, boolean status) {
        NotificationType type = notificationTypeRepository.getById(2L);
        Timestamp time = new Timestamp(System.currentTimeMillis());
        Notification notification = new Notification(type, time);
        Notification savedNotification = notificationRepository.save(notification);

        Transference transference = transferenceRepository.getById(transferenceId);
        Member fromMember = transference.getToBook().getMember();
        Member toMember = transference.getFromBook().getMember();
        Book fromBook = transference.getFromBook();
        Book toBook = transference.getToBook();
        RequestNotification requestNotification = new RequestNotification(savedNotification, fromMember, toMember, fromBook, toBook, status);
        requestNotificationRepository.save(requestNotification);
    }

    public void reminderNotification(NotificationType type, ReminderNotificationDTO dto) {
        Timestamp time = new Timestamp(System.currentTimeMillis());
        Notification notification = new Notification(type, time);
        Notification savedNotification = notificationRepository.save(notification);

        Long fromMemberId = dto.getFromMemberId();
        Long toMemberId = dto.getToMemberId();
        Long reminderId = dto.getReminderId();

        Member fromUser = memberRepository.getById(fromMemberId);
        Member toUser = memberRepository.getById(toMemberId);
        Reminder reminder = reminderRepository.getById(reminderId);

        ReminderNotification reminderNotification = new ReminderNotification(
                savedNotification, reminder, fromUser, toUser
        );
        reminderNotificationRepository.save(reminderNotification);
    }

    public void newReminderNotification(ReminderNotificationDTO dto) {
        NotificationType type = notificationTypeRepository.getById(3L);
        reminderNotification(type, dto);
    }

    public void cancelReminderNotification(ReminderNotificationDTO dto) {
        NotificationType type = notificationTypeRepository.getById(4L);
        reminderNotification(type, dto);
    }

    public void newBookNotification(NewBookNotificationDTO dto) {
        NotificationType type = notificationTypeRepository.getById(6L);
        Timestamp time = new Timestamp(System.currentTimeMillis());
        Notification notification = new Notification(type, time);
        Notification savedNotification = notificationRepository.save(notification);

        Long bookId = dto.getBookId();
        Book book = bookRepository.getById(bookId);
        BookNotification bookNotification = new BookNotification(savedNotification, book, dto.isStatus());
        bookNotificationRepository.save(bookNotification);
    }

    public void newBanMemberNotification(Long memberId) {
        NotificationType type = notificationTypeRepository.getById(7L);
        Timestamp time = new Timestamp(System.currentTimeMillis());
        Notification notification = new Notification(type, time);
        Notification savedNotification = notificationRepository.save(notification);

        Member member = memberRepository.getById(memberId);
        BanMemberNotification banMemberNotification = new BanMemberNotification(savedNotification, member);
        banMemberNotificationRepository.save(banMemberNotification);
    }

    public void markNotificationSeen(Long notificationId) {
        Optional<Notification> optionalNotification = notificationRepository.findById(notificationId);
        if (optionalNotification.isPresent()) {
            Notification notification = optionalNotification.get();
            notification.setSeen(true);
            notificationRepository.save(notification);
        }
    }
}
