package com.mm.greenstep.domain.web.api;

import com.mm.greenstep.domain.plogging.service.AmazonS3Service;
import com.mm.greenstep.domain.web.service.WebService;
import com.opencsv.CSVWriter;
import io.netty.handler.codec.http.HttpResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Slf4j
@RestController
@RequestMapping("/web")
@RequiredArgsConstructor
public class WebController {
    private final WebService webService;
    private final AmazonS3Service amazonS3Service;

    /**
     * CSV파일 생성 및 결과 메모리 저장
     * @throws IOException
     */
    @GetMapping("/update")
    public String csvDown() throws IOException {
       return amazonS3Service.uploadCsvFile(webService.getUploadFile());
    }

}
