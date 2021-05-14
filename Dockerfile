FROM emscripten/emsdk:2.0.20

RUN wget --progress=dot:mega https://boostorg.jfrog.io/artifactory/main/release/1.76.0/source/boost_1_76_0.tar.gz && \
  mkdir -p ./contrib/boost-sdk && \
  tar zxf 'boost_1_76_0.tar.gz' -C './contrib/boost-sdk' --strip-components=1 && \
  rm -f boost_1_76_0.tar.gz

ENV EMSCRIPTEN=/emsdk/upstream/emscripten

COPY ./bin ./bin
COPY ./configs ./configs

RUN ./bin/build-boost-emscripten.sh
