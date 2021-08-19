package com.example.rebook.transference;

import com.example.rebook.book.Book;
import com.example.rebook.book.BookRepository;
import com.example.rebook.dtos.NewReminderDTO;
import com.example.rebook.dtos.NewTransference;
import com.example.rebook.dtos.notification.NewRequestNotificationDTO;
import com.example.rebook.exception.ResourceNotFoundException;
import com.example.rebook.notification.NotificationService;
import com.example.rebook.reminder.Reminder;
import com.example.rebook.reminder.ReminderRepository;
import com.example.rebook.reminder.ReminderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransferenceService {
    private final TransferenceRepository transferenceRepository;
    private final ReminderRepository reminderRepository;
    private final BookRepository bookRepository;
    private final ReminderService reminderService;
    private final NotificationService notificationService;

    @Autowired
    public TransferenceService(TransferenceRepository transferenceRepository, ReminderRepository reminderRepository, BookRepository bookRepository, ReminderService reminderService, NotificationService notificationService) {
        this.transferenceRepository = transferenceRepository;
        this.reminderRepository = reminderRepository;
        this.bookRepository = bookRepository;
        this.reminderService = reminderService;
        this.notificationService = notificationService;
    }

    public List<Transference> getAllUserRequest(Long userId) {
        return transferenceRepository.findByFromBookMemberMemberId(userId);
    }

    public Optional<Transference> getTransferenceById(Long transferenceId) {
        return transferenceRepository.findById(transferenceId);
    }

    public List<Transference> getAllRequestToUser(Long usedId) {
        return transferenceRepository.findByToBookMemberMemberId(usedId);
    }

    // cập nhật reminder mới cho request và thêm request đó vào reminder mới
    private void updateTransferenceReminder(Long transferenceId, Long reminderId) {
        Optional<Transference> transference = transferenceRepository.findById(transferenceId);
        Optional<Reminder> reminder = reminderRepository.findById(reminderId);
        if (transference.isPresent() && reminder.isPresent()) {
            Transference existedTransference = transference.get();
            Reminder existedReminder = reminder.get();
            existedTransference.setReminder(existedReminder);
            transferenceRepository.save(existedTransference);
            reminderService.addTransferenceToReminder(reminderId, transferenceId);
        }
    }

    // cập nhật reminder cho tất cả request giữa 2 người đó
    public void updateOtherTransferenceReminder(Long firstMemberId, Long secondMemberId, Long reminderId) {
        List<Transference> transferenceListFromAtoB = transferenceRepository.findByFromBookMemberMemberIdAndToBookMemberMemberId(firstMemberId, secondMemberId);
        List<Transference> transferenceListFromBtoA = transferenceRepository.findByFromBookMemberMemberIdAndToBookMemberMemberId(secondMemberId, firstMemberId);

        transferenceListFromAtoB.forEach(transference -> updateTransferenceReminder(transference.getTransferenceId(), reminderId));

        transferenceListFromBtoA.forEach(transference -> updateTransferenceReminder(transference.getTransferenceId(), reminderId));
    }

    /*
    * Tạo một trao đổi mới
    *
    * Nếu chưa có reminder giữa 2 người thì tạo mới một cái
    * Gán reminder đó vào trao đổi
    * Thêm trao đổi đó vào danh sách trao đổi của reminder
    * */
    public void createNewTransference(NewTransference newTransference) {
        Long fromBookId = newTransference.getFromBookId();
        Long toBookId = newTransference.getToBookId();
        Book fromBook = bookRepository.getById(fromBookId);
        Book toBook = bookRepository.getById(toBookId);

        Long fromMemberId = fromBook.getMember().getMemberId();
        Long toMemberId = toBook.getMember().getMemberId();

        NewRequestNotificationDTO newRequestNotificationDTO = new NewRequestNotificationDTO(
            fromMemberId, toMemberId, fromBookId, toBookId
        );

        boolean isReminderExisted = reminderService.isExistedReminder(fromMemberId, toMemberId);

        if (isReminderExisted) {
            Optional<Reminder> reminder = reminderService.getReminderFromAtoB(fromMemberId, toMemberId);
            if (reminder.isPresent()) {
                Reminder existedReminder = reminder.get();
                // nếu reminder vẫn còn trong thời gian hoặc chưa được active
                if (existedReminder.getStatus() == null || (existedReminder.getStatus() != null && existedReminder.getStatus().equals("Pending"))) {
                    Transference transference = new Transference(fromBook, toBook, existedReminder);
                    Transference latestTransference = transferenceRepository.save(transference);
                    reminderService.addTransferenceToReminder(existedReminder.getReminderId(), latestTransference.getTransferenceId());
                    notificationService.newRequestNotification(newRequestNotificationDTO);
                } else {
                    // nếu reminder quá thời gian hoặc bị xóa
                    assert existedReminder.getStatus() != null;
                    if (existedReminder.getStatus().equals("Deactivate") || existedReminder.getStatus().equals("Cancel")) {
                        NewReminderDTO dto = new NewReminderDTO(fromMemberId, toMemberId);
                        Reminder newReminder = reminderService.addNewReminder(dto);
                        Transference transference = new Transference(fromBook, toBook, newReminder);
                        Transference abc = transferenceRepository.save(transference);
                        updateOtherTransferenceReminder(fromMemberId, toMemberId, newReminder.getReminderId());
                        reminderService.addTransferenceToReminder(newReminder.getReminderId(), abc.getTransferenceId());
                        notificationService.newRequestNotification(newRequestNotificationDTO);
                    }
                }
            }
        } else {
            NewReminderDTO dto = new NewReminderDTO(fromMemberId, toMemberId);
            Reminder newReminder = reminderService.addNewReminder(dto);
            Transference transference = new Transference(fromBook, toBook, newReminder);
            Transference abc = transferenceRepository.save(transference);
            reminderService.addTransferenceToReminder(newReminder.getReminderId(), abc.getTransferenceId());
            notificationService.newRequestNotification(newRequestNotificationDTO);
        }
    }

    public void acceptTransference(Long transferenceId) {
        Transference transference = transferenceRepository.findById(transferenceId)
                .orElseThrow(() -> new ResourceNotFoundException("Transference with id " + transferenceId + " does not exists"));
        transference.setRequestStatus("Accepted");
        refuseOtherRequest(transference.getToBook().getBookId());
        transferenceRepository.save(transference);
        notificationService.newRequestStatusNotification(transferenceId, true);
    }

    private void reActiveOtherRequest(Long bookId) {
        List<Transference> transferenceList = transferenceRepository.findByToBookBookId(bookId);
        transferenceList.forEach(transference -> {
            if (transference.getRequestStatus().equals("Refused")) {
                Book fromBook = bookRepository.getById(transference.getToBook().getBookId());
                if (!fromBook.getTransferStatus()) {
                    transference.setRequestStatus("Pending");
                }
            }
        });
    }

    public void refuseRequest(Long transferenceId) {
        Transference transference = transferenceRepository.findById(transferenceId)
                .orElseThrow(() -> new ResourceNotFoundException("Transference with id " + transferenceId + " does not exists"));
        transference.setRequestStatus("Refused");
        transferenceRepository.save(transference);
        notificationService.newRequestStatusNotification(transferenceId, false);
    }

    private void refuseOtherRequest(Long bookId) {
        List<Transference> transferenceList = transferenceRepository.findByToBookBookId(bookId);
        transferenceList.forEach(transference -> {
            if (transference.getRequestStatus().equals("Pending")) {
                transference.setRequestStatus("Refused");
            }
        });
    }

    public void cancelRequest(Long transferenceId) {
        Transference transference = transferenceRepository.findById(transferenceId)
                .orElseThrow(() -> new ResourceNotFoundException("Transference with id \" + transferenceId + \" does not exists"));
        transference.setRequestStatus("Canceled");
        transferenceRepository.save(transference);
    }

    private void cancelOtherRequest(Long bookId) {
        List<Transference> transferenceList = transferenceRepository.findByToBookBookId(bookId);
        transferenceList.forEach(transference -> {
            if (transference.getRequestStatus().equals("Pending")) {
                transference.setRequestStatus("Cancel");
            }
        });
    }

    public void markProcessSuccessfully(Long transferenceId) {
        Transference transference = transferenceRepository.findById(transferenceId)
                .orElseThrow(() -> new ResourceNotFoundException("Transference with id \" + transferenceId + \" does not exists"));
        transference.setProcessStatus("Success");
        transference.getFromBook().setTransferStatus(true);
        transference.getToBook().setTransferStatus(true);
        cancelOtherRequest(transference.getToBook().getBookId());
        transferenceRepository.save(transference);
    }

    public void markProcessFailed(Long transferenceId) {
        Transference transference = transferenceRepository.findById(transferenceId)
                .orElseThrow(() -> new ResourceNotFoundException("Transference with id \" + transferenceId + \" does not exists"));
        transference.setProcessStatus("Failed");
        reActiveOtherRequest(transference.getToBook().getBookId());
        transferenceRepository.save(transference);
    }

    public void cancelProcess(Long transferenceId) {
        Transference transference = transferenceRepository.findById(transferenceId)
                .orElseThrow(() -> new ResourceNotFoundException("Transference with id \" + transferenceId + \" does not exists"));
        reActiveOtherRequest(transference.getToBook().getBookId());
        transference.setProcessStatus("Pending");
        transference.setRequestStatus("Pending");
        transferenceRepository.save(transference);
    }
}
