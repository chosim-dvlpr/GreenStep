package com.mm.greenstep.domain.plogging.service;

import com.mm.greenstep.domain.plogging.dto.response.getFestivalResDto;
import com.mm.greenstep.domain.plogging.entity.Festival;
import com.mm.greenstep.domain.plogging.repository.FestivalRepository;
import lombok.RequiredArgsConstructor;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FestivalService {
    private final FestivalRepository festivalRepository;

    // 크롤링 정보 추가갱신 스케쥴러 3일 마다 호출
    @Scheduled(fixedRate = 259200000)
    public void WebCrawler() throws IOException {
        LocalDate localDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");
        String formattedDate = localDate.format(formatter);

        // 개인봉사 페이지
        String url1 =
                "https://www.1365.go.kr/vols/search.do?collection=personalserve&startCount=0&sort=RANK&cateSearch=all&range=A&startDate=1970.01.01&endDate="
                +  formattedDate +
                "&searchField=ALL&reQuery=2&realQuery=%ED%94%8C%EB%A1%9C%EA%B9%85&query=%ED%94%8C%EB%A1%9C%EA%B9%85";

        // 기업, 단체봉사 페이지
        String url2 =
                "https://www.1365.go.kr/vols/search.do?collection=giupandgroupserve&startCount=0&sort=RANK&cateSearch=all&range=A&startDate=1970.01.01&endDate="
                        + formattedDate
                        + "&searchField=ALL&reQuery=2&realQuery=%ED%94%8C%EB%A1%9C%EA%B9%85&query=%ED%94%8C%EB%A1%9C%EA%B9%85";

        Document doc = Jsoup.connect(url1).get();

        // class="tit"인 a 태그 추출
        Elements links = doc.select("a.tit");

        // 각 a 태그에 대해 반복 처리
        for (Element link : links) {
            // a 태그의 href 속성 추출
            String linkHref = "https://www.1365.go.kr/" + link.attr("href");

            // a 태그 내부의 텍스트 추출
            String linkText = link.text();

            Festival festival = Festival.builder()
                    .festivalName(linkText)
                    .festivalUrl(linkHref)
                    .build();

            try {
                // 데이터 저장
                festivalRepository.save(festival);
            } catch (DataIntegrityViolationException e) {
                System.out.println("중복된 데이터라 넘어갑니다.");
            }
        }

        doc = Jsoup.connect(url2).get();

        // class="tit"인 a 태그 추출
        links = doc.select("a.tit");

        for (Element link : links) {
            // a 태그의 href 속성 추출
            String linkHref = "https://www.1365.go.kr/" + link.attr("href");

            // a 태그 내부의 텍스트 추출
            String linkText = link.text();

            Festival festival = Festival.builder()
                    .festivalName(linkText)
                    .festivalUrl(linkHref)
                    .build();

            try {
                // 데이터 저장
                festivalRepository.save(festival);
            } catch (DataIntegrityViolationException e) {
                System.out.println("중복된 데이터라 넘어갑니다.");
            }
        }
    }


    public List<getFestivalResDto> getFestivalInfo() {
        List<Festival> festivalList = festivalRepository.findAll();
        List<getFestivalResDto> festivalDtoList = new ArrayList<>();

        for (Festival f : festivalList) {
            getFestivalResDto dto = getFestivalResDto.builder()
                    .festivalName(f.getFestivalName())
                    .festivalUrl(f.getFestivalUrl())
                    .build();

            festivalDtoList.add(dto);
        }

        return festivalDtoList;
    }
}
