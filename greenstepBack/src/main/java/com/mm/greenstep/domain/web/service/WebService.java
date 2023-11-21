package com.mm.greenstep.domain.web.service;

import com.mm.greenstep.domain.plogging.entity.Trash;
import com.mm.greenstep.domain.plogging.repository.TrashRepository;
import com.nimbusds.jose.shaded.json.JSONArray;
import com.nimbusds.jose.shaded.json.JSONObject;
import com.nimbusds.jose.shaded.json.parser.JSONParser;
import com.nimbusds.jose.shaded.json.parser.ParseException;
import com.opencsv.CSVWriter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WebService {
    private final TrashRepository trashRepository;

    // PARCEL : 지번주소
    // ROAD : 도로명주소
    // BOTH(기본값) : 도로명주소, 지번주소
    @Value("${vworld.apikey}")
    private String apikey;
    private String searchType = "parcel";
    private String epsg = "epsg:4326";

    public ByteArrayOutputStream getUploadFile() throws IOException {
        // 메모리 내에 데이터를 저장하는 출력 스트림
        // 바이트 배열로 메모리에 보관
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        // OutputStreamWriter : 바이트 출력 스트림 -> 문자 출력 스트림으로 변환하는 브릿지 역할
        // writer를 통해 baos에 문자데이터를 쓸 수 있음
        // writer는 문자데이터를 받아 UTF-8형식의 바이트로 변환 후 baos에 저장함
        OutputStreamWriter writer = new OutputStreamWriter(baos, StandardCharsets.UTF_8);

        // UTF-8 인코딩 파일의 경우, 파일 시작 부분에 BOM (Byte Order Mark, \uFEFF)을 추가할 수 있습니다. 이는 파일이 UTF-8로 인코딩되었음을 명시
        writer.write("\uFEFF");


        CSVWriter csvWriter = new CSVWriter(writer);
        // 반환 데이터를 CSV형식으로 변환하여 baos에 씀
        csvWriter.writeAll(listTrashString());

        csvWriter.close();
        writer.close();

        return baos;
    }

    public List<String[]> listTrashString(){
        List<Trash> trashList = trashRepository.findAll();
        List<String[]> result = new ArrayList<>();

        String[] trashType = {"can","pet","plastic","glass","etc"};

        result.add(new String[]{"날짜","위도","경도","주소","쓰레기 타입"});
        for(Trash trash : trashList){
            String lat = trash.getLatitude();
            String lon = trash.getLongitude();
            JSONObject address = getAddress(lat, lon);
            if (address != null){
                String[] rowData = new String[5];
                rowData[0] = trash.getPlogging().getCreatedAt().toLocalDate().toString();
                rowData[1] = lat;
                rowData[2] = lon;
                rowData[3] = address.get("text").toString();
                rowData[4] = trashType[trash.getTrashType()];
                result.add(rowData);
            }
        }
        return result;
    }

    public JSONObject getAddress(String lat, String lon){
        String searchPoint = lon + "," + lat;

        StringBuilder sb = new StringBuilder("https://api.vworld.kr/req/address");
        sb.append("?service=address");
        sb.append("&request=getaddress");
        sb.append("&format=json");
        sb.append("&crs=" + epsg);
        sb.append("&key=" + apikey);
        sb.append("&type=" + searchType);
        sb.append("&point=" + searchPoint);

        try{
            JSONParser jspa = new JSONParser();
            JSONObject jsob = (JSONObject) jspa.parse(new BufferedReader(new InputStreamReader(new URL(sb.toString()).openStream(), StandardCharsets.UTF_8)));
            JSONObject jsrs = (JSONObject) jsob.get("response");
            JSONArray jsonArray = (JSONArray) jsrs.get("result");
            return jsonArray != null ? (JSONObject) jsonArray.get(0) : null;

        } catch (IOException | ParseException e) {
            throw new RuntimeException(e);
        }
    }
}
