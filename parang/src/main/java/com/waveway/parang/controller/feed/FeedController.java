package com.waveway.parang.controller.feed;


import com.waveway.parang.dto.FeedDTO;
import com.waveway.parang.dto.UserDTO;
import com.waveway.parang.model.FeedEntity;
import com.waveway.parang.service.feed.FeedService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/feedAll")
public class FeedController {

    @Autowired
    private FeedService boardService;


    /** 
     * 게시물 불러오기
     * 박재현
     * */
    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<FeedEntity> getAllBoard(){
        return boardService.getAllBoard();
    }


    @RequestMapping(value = "/feedwrite", method = RequestMethod.POST)
    public ResponseEntity<?> writeBoard(@AuthenticationPrincipal Long userId, @RequestBody FeedDTO feedDTO){
        log.info(String.valueOf(userId));
        log.info(String.valueOf(feedDTO.getBoardContent()));
        return null;
    }
}
