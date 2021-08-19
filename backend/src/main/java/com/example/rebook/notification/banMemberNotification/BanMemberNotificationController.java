package com.example.rebook.notification.banMemberNotification;

import com.example.rebook.dtos.member.MemberBannedNotificationDTO;
import com.example.rebook.notification.Notification;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/banMemberNotification")
public class BanMemberNotificationController {
    private final BanMemberNotificationRepository banMemberNotificationRepository;

    public BanMemberNotificationController(BanMemberNotificationRepository banMemberNotificationRepository) {
        this.banMemberNotificationRepository = banMemberNotificationRepository;
    }

    @GetMapping
    public List<MemberBannedNotificationDTO> getAllBanNotificationToMember(@RequestParam Long memberId) {
        Optional<List<BanMemberNotification>> list = banMemberNotificationRepository.findByMemberMemberId(memberId);
        List<MemberBannedNotificationDTO> responseList = null;
        if (list.isPresent()) {
            if (!list.get().isEmpty()) {
                responseList = new ArrayList<>();
                for (int i = 0; i < list.get().size(); i++) {
                    BanMemberNotification notificationItem = list.get().get(i);
                    Notification notification = notificationItem.getNotification();
                    MemberBannedNotificationDTO dto = new MemberBannedNotificationDTO(notification);
                    responseList.add(dto);
                }
            }
        }
        return responseList;
    }
}
