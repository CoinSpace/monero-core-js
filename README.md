# Monero Core JS

## Development

```
docker-compose build
docker-compose up -d
docker exec -it monero-core-js_emscripten_1 cp -r /src/build /app
docker exec -it monero-core-js_emscripten_1 ./bin/build-emcpp.sh
```
