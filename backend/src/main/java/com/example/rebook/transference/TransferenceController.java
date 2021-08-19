package com.example.rebook.transference;

import com.example.rebook.dtos.NewTransference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/transferences")
public class TransferenceController {
    private final TransferenceService transferenceService;

    @Autowired
    public TransferenceController(TransferenceService transferenceService) {
        this.transferenceService = transferenceService;
    }

    @GetMapping
    public Optional<Transference> getTransferenceById(@RequestParam Long id) {
        return transferenceService.getTransferenceById(id);
    }

    @GetMapping(path = "/myrequest/{userId}")
    public List<Transference> getAllUserRequest(@PathVariable Long userId) {
        List<Transference> allRequests = transferenceService.getAllUserRequest(userId);
        List<Transference> notCanceledRequests = new ArrayList<>();
        allRequests.forEach(request -> {
            if (!request.getRequestStatus().equals("Canceled")) {
                notCanceledRequests.add(request);
            }
        });
        return notCanceledRequests;
    }

    @GetMapping(path = "/transferrequest/{userId}")
    public List<Transference> getAllRequestToUser(@PathVariable Long userId) {
        List<Transference> allRequests = transferenceService.getAllRequestToUser(userId);
        List<Transference> notAcceptedRequests = new ArrayList<>();
        allRequests.forEach(request -> {
            if (request.getRequestStatus().equals("Pending") &&
                    !request.getToBook().getTransferStatus() &&
                    !request.getFromBook().getTransferStatus()) {
                notAcceptedRequests.add(request);
            }
        });
        return notAcceptedRequests;
    }

    @PostMapping
    public void createNewTransference(@RequestBody NewTransference newTransference) {
        transferenceService.createNewTransference(newTransference);
    }

    @PutMapping(path = "/accept/{transferenceId}")
    public void acceptRequest(@PathVariable Long transferenceId) {
        transferenceService.acceptTransference(transferenceId);
    }

    @PutMapping(path = "/refuse/{transferenceId}")
    public void refuseRequest(@PathVariable Long transferenceId) {
        transferenceService.refuseRequest(transferenceId);
    }

    @PutMapping(path = "/cancel/{transferenceId}")
    public void cancelRequest(@PathVariable Long transferenceId) {
        transferenceService.cancelRequest(transferenceId);
    }

    @PutMapping(path = "/process/success/{transferenceId}")
    public void markProcessSuccessfully(@PathVariable Long transferenceId) {
        transferenceService.markProcessSuccessfully(transferenceId);
    }

    @PutMapping(path = "/process/fail/{transferenceId}")
    public void markProcessFailed(@PathVariable Long transferenceId) {
        transferenceService.markProcessFailed(transferenceId);
    }

    @PutMapping(path = "/process/cancel/{transferenceId}")
    public void cancelProcess(@PathVariable Long transferenceId) {
        transferenceService.cancelProcess(transferenceId);
    }
}
