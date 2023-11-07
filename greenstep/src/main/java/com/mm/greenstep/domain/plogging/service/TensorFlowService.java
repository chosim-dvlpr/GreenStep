package com.mm.greenstep.domain.plogging.service;

import org.springframework.stereotype.Service;
import org.tensorflow.Graph;
import org.tensorflow.Session;
import org.tensorflow.Tensor;
import org.tensorflow.proto.framework.GraphDef;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Service
public class TensorFlowService {

    public String classifyImage(byte[] imageBytes) throws IOException {
        try (Graph graph = new Graph()) {
            // 모델 경로
            String modelPath = "path/to/model.pb";

            // .pb 파일에서 그래프 로드
            byte[] graphDef = Files.readAllBytes(Paths.get(modelPath));
            graph.importGraphDef(GraphDef.parseFrom(graphDef));

            try (Session session = new Session(graph)) {
                // 이미지 전처리 수행 및 Tensor 생성
                Tensor imageTensor = preprocessImage(imageBytes);

                // 모델 실행 및 결과 가져오기
                List<Tensor> output = session.runner()
                        .feed("input_tensor", imageTensor)
                        .fetch("output_tensor")
                        .run();

                // 결과 처리 및 반환
                Tensor result = output.get(0);
                // 결과를 적절한 타입으로 변환 및 사용
                // 예: result.copyTo(...)
                // 결과 처리 코드 추가
                result.close(); // 사용 후 텐서 자원을 해제합니다.

                // 임시로 결과를 문자열로 반환
                return result.toString();
            }
        }
    }

    private Tensor preprocessImage(byte[] imageBytes) {
        // 이미지 전처리 로직 구현
        // 예: 이미지 리사이즈, 정규화 등
        // ...
        // 이 예제에서는 단순화를 위해 null을 반환합니다.
        return null; // 실제 구현이 필요합니다.
    }
}
