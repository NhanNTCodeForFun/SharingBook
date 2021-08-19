package com.example.rebook.failreason;

import com.example.rebook.dtos.failReason.GetFailReasonDTO;
import com.example.rebook.dtos.failReason.NewFailReasonDTO;
import com.example.rebook.exception.ResourceNotFoundException;
import com.example.rebook.member.Member;
import com.example.rebook.member.MemberRepository;
import com.example.rebook.reminder.Reminder;
import com.example.rebook.reminder.ReminderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FailReasonService {
    private final FailReasonRepository failReasonRepository;
    private final MemberRepository memberRepository;
    private final ReminderRepository reminderRepository;

    @Autowired
    public FailReasonService(FailReasonRepository failReasonRepository, MemberRepository memberRepository, ReminderRepository reminderRepository) {
        this.failReasonRepository = failReasonRepository;
        this.memberRepository = memberRepository;
        this.reminderRepository = reminderRepository;
    }

    private GetFailReasonDTO convertFromFailReasonToGetFailReasonDTO(FailReason failReason) {
        return new GetFailReasonDTO(
                failReason.getFailReasonId(),
                failReason.getFromMember().getMemberId(),
                failReason.getToMember().getMemberId(),
                failReason.getReason()
        );
    }

    public GetFailReasonDTO getFailReasonById(Long failReasonId) {
        FailReason failReason = failReasonRepository.getById(failReasonId);
        return convertFromFailReasonToGetFailReasonDTO(failReason);
    }

    public void addNewFailReason(NewFailReasonDTO dto) {
        Long fromMemberId = dto.getFromMemberId();
        Long toMemberId = dto.getToMemberId();
        Reminder reminder = reminderRepository.getById(dto.getReminderId());
        Member fromMember = memberRepository.findById(fromMemberId)
            .orElseThrow(() -> new ResourceNotFoundException("Member with id " + fromMemberId + " does not exists"));
        Member toMember = memberRepository.findById(toMemberId)
                .orElseThrow(() -> new ResourceNotFoundException("Member with id " + toMemberId + " does not exists"));
        String reason = dto.getReason();
        FailReason failReason = new FailReason(reminder, fromMember, toMember, reason);
        failReasonRepository.save(failReason);
    }

    public List<GetFailReasonDTO> getAll() {
        List<FailReason> failReasonList = failReasonRepository.findAll();
        List<GetFailReasonDTO> getFailReasonDTOList = new ArrayList<>();
        for (FailReason failReason : failReasonList) {
            getFailReasonDTOList.add(convertFromFailReasonToGetFailReasonDTO(failReason));
        }
        return getFailReasonDTOList;
    }
}
