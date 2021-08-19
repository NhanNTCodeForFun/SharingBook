package com.example.rebook.member;

import com.example.rebook.book.Book;
import com.example.rebook.book.BookRepository;
import com.example.rebook.dtos.member.*;
import com.example.rebook.feedback.FeedbackService;
import com.example.rebook.notification.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final BookRepository bookRepository;
    private final FeedbackService feedbackService;
    private final NotificationService notificationService;

    @Autowired
    public MemberService(MemberRepository memberRepository, BookRepository bookRepository, FeedbackService feedbackService, NotificationService notificationService) {
        this.memberRepository = memberRepository;
        this.bookRepository = bookRepository;
        this.feedbackService = feedbackService;
        this.notificationService = notificationService;
    }

    public List<GetMemberInformationDTO> getMembers() {
        List<GetMemberInformationDTO> memberInformationDTOList = null;
        List<Member> memberList = memberRepository.findAll();
        for (Member member : memberList) {
            GetMemberInformationDTO dto = convertMemberToGetMemberInformationDTO(member);
            if (memberInformationDTOList == null) {
                memberInformationDTOList = new ArrayList<>();
            }
            memberInformationDTOList.add(dto);
        }
        return memberInformationDTOList;
    }

    public GetMemberInformationDTO convertMemberToGetMemberInformationDTO(Member member) {
        Long memberId = member.getMemberId();
        String username = member.getUsername();
        String name = member.getName();
        String avatar = member.getAvatar();
        String address = member.getAddress();
        Integer cityId = member.getCityId();
        Integer districtId = member.getDistrictId();
        Integer wardId = member.getWardId();
        String addressDetail = member.getAddressDetail();
        String email = member.getEmail();
        String phoneNumber = member.getPhoneNumber();
        boolean isAdmin = member.isAdmin();
        Integer averageStar = feedbackService.calculateAverageStar(memberId);
        boolean isActive = member.isActive();
        return new GetMemberInformationDTO(memberId, username, name, avatar, address, cityId, districtId, wardId, addressDetail, email, phoneNumber, averageStar, isActive, isAdmin);
    }

    public GetMemberInformationDTO getMemberById(Long id) {
        GetMemberInformationDTO responseDTO = null;
        Optional<Member> memberOptional = memberRepository.findById(id);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            responseDTO = convertMemberToGetMemberInformationDTO(member);
        }
        return responseDTO;
    }

    public Optional<List<Book>> getBooksByMember(Long memberId) {
        return  bookRepository.findByMemberMemberId(memberId);
    }

    public GetMemberInformationDTO checkLogin(LoginRequestDTO dto) {
        String username = dto.getUsername();
        String password = dto.getPassword();
        GetMemberInformationDTO responseDTO = null;
        Optional<Member> memberOptional = memberRepository.checkLogin(username, password);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            responseDTO = convertMemberToGetMemberInformationDTO(member);
        }
        return responseDTO;
    }

    public boolean signup(SignUpDTO signUpDTO) {
        Optional<Member> memberOptional = memberRepository.findMemberByEmail(signUpDTO.getEmail());
        if (memberOptional.isPresent()) {
            return false;
        }
        Member member = new Member(
                signUpDTO.getUsername(),
                signUpDTO.getPassword(),
                signUpDTO.getFullName(),
                signUpDTO.getAvatar(),
                signUpDTO.getAddress(),
                signUpDTO.getCityId(),
                signUpDTO.getDistrictId(),
                signUpDTO.getWardId(),
                signUpDTO.getAddressDetail(),
                signUpDTO.getEmail(),
                signUpDTO.getPhoneNumber(),
                false
        );
        memberRepository.save(member);
        return true;
    }

    public boolean updateMemberInformation(Long memberId, UpdateMemberDTO dto) {
        boolean result = false;
        Optional<Member> memberOptional = memberRepository.findById(memberId);
        if (memberOptional.isPresent()) {
            result = true;
            Member member = memberOptional.get();
            member.setName(dto.getName());
            member.setAddress(dto.getAddress());
            member.setCityId(dto.getCityId());
            member.setDistrictId(dto.getDistrictId());
            member.setWardId(dto.getWardId());
            member.setEmail(dto.getEmail());
            member.setPhoneNumber(dto.getPhoneNumber());
            member.setAddressDetail(dto.getAddressDetail());
            memberRepository.save(member);
        }
        return result;
    }

    public boolean changePassword(Long memberId, ChangePasswordDTO dto) {
        boolean result = false;
        Optional<Member> memberOptional = memberRepository.findById(memberId);
        if (memberOptional.isPresent() && memberOptional.get().getPassword().equals(dto.getOldPassword())) {
            result = true;
            Member member = memberOptional.get();
            member.setPassword(dto.getNewPassword());
            memberRepository.save(member);
        }
        return result;
    }

    public boolean changeAvatar(Long memberId, ChangeAvatarDTO changeAvatarDTO) {
        boolean result = false;
        Optional<Member> memberOptional = memberRepository.findById(memberId);
        if (memberOptional.isPresent()) {
            result = true;
            Member member = memberOptional.get();
            member.setAvatar(changeAvatarDTO.getNewAvatar());
            memberRepository.save(member);
        }
        return result;
    }

    public boolean banMember(Long memberId) {
        boolean response = false;
        Optional<Member> memberOptional = memberRepository.findById(memberId);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            member.setActive(false);
            memberRepository.save(member);
            notificationService.newBanMemberNotification(memberId);
            response = true;
        }
        return response;
    }

    public boolean activeMember(Long memberId) {
        boolean response = false;
        Optional<Member> memberOptional = memberRepository.findById(memberId);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            member.setActive(true);
            memberRepository.save(member);
            response = true;
        }
        return response;
    }
}
