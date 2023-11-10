package com.mm.greenstep.domain.plogging.service;

import com.mm.greenstep.domain.plogging.dto.response.getFestivalResDto;
import com.mm.greenstep.domain.plogging.entity.Festival;
import com.mm.greenstep.domain.plogging.repository.FestivalRepository;
import lombok.RequiredArgsConstructor;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FestivalService {
    private final FestivalRepository festivalRepository;

    // 크롤링 정보 추가갱신 스케쥴러 3일 마다 호출
    public void WebCrawler() throws IOException {
            String url = "https://www.1365.go.kr/vols/search.do?collection=personalserve&startCount=0&sort=RANK&cateSearch=all&range=A&startDate=1970.01.01&endDate=2023.11.10&searchField=ALL&reQuery=2&realQuery=%ED%94%8C%EB%A1%9C%EA%B9%85&query=%ED%94%8C%EB%A1%9C%EA%B9%85";
            Document doc = Jsoup.connect(url).get();

            String title = doc.title(); // 웹 페이지의 타이틀
            Elements links = doc.select("a[href]"); // 모든 하이퍼링크 추출

            // li 태그 추출
            Elements listItems = doc.select("li");

            // 각 li 태그에 대해 반복 처리
            for (Element listItem : listItems) {
                // a 태그의 href 속성 추출
                String linkHref = listItem.select("a").attr("href");

                // a 태그 내부의 텍스트 추출
                String linkText = listItem.select("a").text();

                // 데이터베이스에 저장 (이 부분은 데이터베이스와 연동하여 작성)
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
