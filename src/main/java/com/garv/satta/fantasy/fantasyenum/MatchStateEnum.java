package com.garv.satta.fantasy.fantasyenum;

public enum  MatchStateEnum {

    NOT_STARTED("NS"), IN_PROGRESS("IP"), TOSS_COMPLETED("TC"),
    COMPLETED("C") , ABANDONE("A") , NO_RESULT("NR"),SCORE_CALCULATION_DONE("SC");

    private String shortname;
    MatchStateEnum(String shortname) {
        this.shortname = shortname;
    }

    public String getShortname() {
        return shortname;
    }

    public String getShortname(MatchStateEnum operationEnum) {
        return operationEnum.shortname;
    }
}
