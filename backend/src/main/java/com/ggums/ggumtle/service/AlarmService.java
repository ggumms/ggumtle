package com.ggums.ggumtle.service;

import com.ggums.ggumtle.common.exception.CustomException;
import com.ggums.ggumtle.common.exception.ExceptionType;
import com.ggums.ggumtle.dto.response.AlarmResponseDto;
import com.ggums.ggumtle.entity.Alarm;
import com.ggums.ggumtle.entity.User;
import com.ggums.ggumtle.repository.AlarmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AlarmService {

    private final AlarmRepository alarmRepository;

    // count unread alarms
    public int alarmCount(User user){
        return alarmRepository.countByReceiverAndIsReadIsFalse(user);
    }

    // read unread alarm
    public String alarmRead(User user, Long alarmId){
        Alarm alarm = alarmRepository.findById(alarmId).orElseThrow(() -> new CustomException(ExceptionType.ALARM_NOT_FOUND));

        if(!alarm.getReceiver().getId().equals(user.getId())){
            throw new CustomException(ExceptionType.ALARM_NOT_VALID);
        }

        if(!alarm.getIsRead()){
            alarm.setIsRead(true);
        }

        return alarmId + " 알람을 " + user.getUserNickname() + "님이 읽음 처리하였습니다.";
    }

    // getting list of alarm
    public Page<AlarmResponseDto> alarmList(User user, Pageable pageable){
        Page<Alarm> alarms = alarmRepository.findByReceiver(user, pageable);
        return alarms.map(this::convertToAlarmResponseDto);
    }

    private AlarmResponseDto convertToAlarmResponseDto(Alarm alarm){
        return null;
    }

}
