package com.garv.satta.fantasy.dto.converter;

import com.garv.satta.fantasy.dto.UserDTO;
import com.garv.satta.fantasy.model.frontoffice.User;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserConverter extends Converter<User, UserDTO> {

    public User convertToEntity(UserDTO playerDTO) {
        User player = mapper.map(playerDTO, User.class);
        return player;
    }

    public UserDTO convertToDTO(User player) {
        UserDTO playerDTO = mapper.map(player, UserDTO.class);
        return playerDTO;
    }

    @Override
    public User convertToFullEntity(UserDTO dto) {
        return null;
    }

    @Override
    public UserDTO convertToFullDTO(User entity) {
        return null;
    }

    @Override
    public User convertToShortEntity(UserDTO dto) {
        return null;
    }

    public List<UserDTO> convertToDTOList(List<User> playerList){
        return mapToDTOList(playerList, UserDTO.class);
    }

}
