package com.garv.satta.fantasy.service;

import com.garv.satta.fantasy.exceptions.GenericException;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Iterator;

/**
 * Reference
 * https://bezkoder.com/spring-boot-upload-excel-file-database/
 */
@Service
public class ExcelFileService {

    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    public static boolean hasExcelFormat(MultipartFile file) {

        if (!TYPE.equals(file.getContentType())) {
            return false;
        }

        return true;
    }

    public Iterator<Row> readData(MultipartFile file) {
        try {
            if (!hasExcelFormat(file)) {
                throw new GenericException("Invalid file format");
            }
            Workbook workbook = new XSSFWorkbook(file.getInputStream());
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();
            return rows;
        } catch (Exception e) {
            throw new GenericException("exception while reading file " + e.getMessage());
        }
    }
}
