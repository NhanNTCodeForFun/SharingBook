package com.example.rebook.feedback;

import com.example.rebook.dtos.NewFeedbackDTO;
import com.example.rebook.dtos.UpdateFeedbackDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/feedback")
public class FeedbackController {
    private final FeedbackService feedbackService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping("/{userid}")
    public List<Feedback> getAllFeedbackToUser(@PathVariable Long userid) {
        return feedbackService.getAllFeedbackOfUser(userid);
    }

    @PostMapping
    public void addNewFeedback(@RequestBody NewFeedbackDTO dto) {
        feedbackService.addNewFeedback(dto);
    }

    @PutMapping("/{feedbackId}")
    public Feedback updateFeedback(@PathVariable Long feedbackId, @RequestBody UpdateFeedbackDTO dto) {
        return feedbackService.updateFeedback(feedbackId, dto);
    }

    @DeleteMapping("/{feedbackId}")
    public void deleteFeedback(@PathVariable Long feedbackId) {
        feedbackService.deleteFeedback(feedbackId);
    }
}
