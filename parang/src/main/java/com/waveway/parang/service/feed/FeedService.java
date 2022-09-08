package com.waveway.parang.service.feed;

import com.waveway.parang.dto.FeedDTO;
import com.waveway.parang.dto.UserDTO;
import com.waveway.parang.model.BoardTagEntity;
import com.waveway.parang.model.FeedEntity;
import com.waveway.parang.repository.FeedRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class FeedService {

    @Autowired
    private FeedRepository feedRepository;

    public List<FeedEntity> getAllBoard(){
        return feedRepository.findAll();
    }


    public FeedEntity save(final FeedEntity feed){

        return feedRepository.save(feed);
    }

    public List<BoardTagEntity> saveTag(final BoardTagEntity boardTagEntity){
        return null;
    }


}
