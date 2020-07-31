package com.garv.satta.fantasy.fantasyenum;

public enum PlayerEnum {
    BATSMAN("B"), BOWLER("BW"), WICKETKEEPER("WK"), ALLROUNDER("AR");

    private String shortname;
    PlayerEnum(String shortname) {
        this.shortname = shortname;
    }

    public String getShortname() {
        return shortname;
    }

    public String getShortname(PlayerEnum playerEnum) {
        return playerEnum.shortname;
    }
}
