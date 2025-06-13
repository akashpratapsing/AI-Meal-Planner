package com.mealplanner.utils;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import org.apache.commons.io.output.ByteArrayOutputStream;

import com.mealplanner.model.AuditLog;

public class CsvExportUtil {

    public static byte[] exportToCsv(List<AuditLog> logs) throws IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PrintWriter writer = new PrintWriter(out);

        writer.println("Username,Email,Roles,Method,Endpoint,Timestamp");

        for (AuditLog log : logs) {
            writer.printf("%s,%s,%s,%s,%s,%s%n",
                    log.getUsername(),
                    log.getEmail(),
                    String.join("|", log.getRoles()),
                    log.getMethod(),
                    log.getEndpoint(),
                    log.getTimestamp().toString()
            );
        }

        writer.flush();
        writer.close();
        return out.toByteArray();
    }
}

