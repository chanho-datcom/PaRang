package com.waveway.parang.controller.feed;


import com.waveway.parang.dto.FeedDTO;
import com.waveway.parang.dto.UserDTO;
import com.waveway.parang.model.FeedEntity;
import com.waveway.parang.model.UserEntity;
import com.waveway.parang.service.feed.FeedService;
import com.waveway.parang.service.user.UserService;
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
    private FeedService feedService;

    @Autowired
    private UserService userService;

    /** 
     * 게시물 불러오기
     * 박재현
     * */
    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<FeedEntity> getAllBoard(){
        return feedService.getAllBoard();
    }


    @RequestMapping(value = "/feedwrite", method = RequestMethod.POST)
    public ResponseEntity<?> writeBoard(@AuthenticationPrincipal Long userId, @RequestBody FeedDTO feedDTO){
        log.info( "작성자 고유 id " + userId);
        FeedEntity feed = FeedDTO.toEntity(feedDTO);


        FeedEntity feedData = feedService.save(feed);

        UserEntity user = userService.getUserInfo(userId);

        final FeedDTO responseFeedDTO = FeedDTO.builder()
                .boardId(feedData.getBoardId())
                .boardWriterNickName(feed.getBoardWriterNickName())
                .boardWriterId(user.getUserId())
                .boardCategory(feedData.getBoardCategory())
                .boardContent(feedData.getBoardContent())
                .boardLikes(feedData.getBoardLikes())
                .boardHates(feedData.getBoardHates())
                .boardTitle(feedData.getBoardTitle())
                .boardWriterId(feedData.getBoardWriterId())
                .boardImg(feedData.getBoardImg())
                .build();

               return ResponseEntity.ok().body(responseFeedDTO);
    }
}
