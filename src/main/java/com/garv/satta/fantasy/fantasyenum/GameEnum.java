package com.garv.satta.fantasy.fantasyenum;

public enum GameEnum {
    CRICKET("CR"), FOOTBALL("FB"), HOCKEY("HK"), KABADDI("KB");

    private String shortname;

    GameEnum(String shortname) {
        this.shortname = shortname;
    }

    public String getShortname() {
        return shortname;
    }

    public String getShortname(GameEnum gameEnum) {
        return gameEnum.shortname;
    }


}
