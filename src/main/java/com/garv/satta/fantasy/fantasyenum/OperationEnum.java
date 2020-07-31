package com.garv.satta.fantasy.fantasyenum;

public enum OperationEnum {

    ADD("A"), REMOVE("RM");

    private String shortname;
    OperationEnum(String shortname) {
        this.shortname = shortname;
    }

    public String getShortname() {
        return shortname;
    }

    public String getShortname(OperationEnum operationEnum) {
        return operationEnum.shortname;
    }

}
