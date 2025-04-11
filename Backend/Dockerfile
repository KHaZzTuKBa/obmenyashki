FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Копируем ВСЕ файлы решения
COPY *.sln .
COPY API/*.csproj API/
COPY Application/*.csproj Application/
COPY Domain/*.csproj Domain/
COPY Infrastructure/*.csproj Infrastructure/

# Восстановление зависимостей
RUN dotnet restore

# Копируем весь исходный код
COPY . .

# Сборка решения
RUN dotnet build -c Release -o /app/build

# Публикация проекта
RUN dotnet publish API/WebAPI.csproj -c Release -o /app/publish

# Финальный образ
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "WebAPI.dll"]