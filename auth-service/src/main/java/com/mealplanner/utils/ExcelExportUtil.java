package com.mealplanner.utils;

import java.io.IOException;
import java.util.List;

import org.apache.commons.io.output.ByteArrayOutputStream;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import com.mealplanner.model.AuditLog;

public class ExcelExportUtil {

    public static byte[] exportToExcel(List<AuditLog> logs) throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Audit Logs");

        Row header = sheet.createRow(0);
        String[] columns = {"Username", "Email", "Roles", "Method", "Endpoint", "Timestamp"};

        for (int i = 0; i < columns.length; i++) {
            header.createCell(i).setCellValue(columns[i]);
        }

        int rowNum = 1;
        for (AuditLog log : logs) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(log.getUsername());
            row.createCell(1).setCellValue(log.getEmail());
            row.createCell(2).setCellValue(String.join("|", log.getRoles()));
            row.createCell(3).setCellValue(log.getMethod());
            row.createCell(4).setCellValue(log.getEndpoint());
            row.createCell(5).setCellValue(log.getTimestamp().toString());
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        return out.toByteArray();
    }
}

