package com.garv.satta.fantasy.external.service.cricinfo.parser;

import lombok.extern.slf4j.Slf4j;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CommonParser {

    public String getText(Element node) {
        return node.text().trim();
    }

    public String getText(Elements nodes, int index) {
        Element node = nodes.get(index);
        return node.text().trim();
    }

    public static Float getFloat(Elements nodes, int index) {
        try {
            Element node = nodes.get(index);
            String number = node.text().trim();
            return Float.valueOf(number);
        } catch (Exception e) {
            log.error(e.getMessage());
            return 0F;
        }
    }


    public static Float getFloat(Element node) {
        try {
            String number = node.text().trim();
            return Float.valueOf(number);
        } catch (Exception e) {
            log.error(e.getMessage());
            return 0F;
        }
    }

    public static Integer getInteger(Elements nodes, int index) {
        try {
            Element node = nodes.get(index);
            String number = node.text().trim();
            return Integer.parseInt(number);
        } catch (Exception e) {
            log.error(e.getMessage());
            return 0;
        }
    }

    public static Integer getInteger(Element node) {
        try {
            String number = node.text().trim();
            return Integer.parseInt(number);
        } catch (Exception e) {
            log.error(e.getMessage());
            return 0;
        }
    }
}
