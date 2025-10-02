# ---- Build Stage ----
FROM node:20-alpine AS build
WORKDIR /app

# package.json, lock 파일 먼저 복사 (캐시 활용)
COPY package*.json ./
RUN npm install --frozen-lockfile

# 소스 복사 및 빌드
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Nginx 기본 설정 제거
RUN rm -rf ./*

# Vue build 결과물 복사
COPY --from=build /app/dist ./

# (옵션) 커스텀 Nginx 설정 파일 넣기
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
