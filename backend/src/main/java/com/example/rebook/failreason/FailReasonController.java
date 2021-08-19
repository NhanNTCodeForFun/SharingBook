package com.example.rebook.failreason;

import com.example.rebook.dtos.failReason.GetFailReasonDTO;
import com.example.rebook.dtos.failReason.NewFailReasonDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/failReason")
public class FailReasonController {
    private final FailReasonService failReasonService;

    @Autowired
    public FailReasonController(FailReasonService failReasonService) {
        this.failReasonService = failReasonService;
    }

    @GetMapping
    public List<GetFailReasonDTO> getAll() {
        return this.failReasonService.getAll();
    }

    @GetMapping(path = "/{id}")
    public GetFailReasonDTO getById(@PathVariable Long id) {
        return failReasonService.getFailReasonById(id);
    }

    @PostMapping
    public void addNewFailReason(@RequestBody NewFailReasonDTO dto) {
        failReasonService.addNewFailReason(dto);
    }
}
