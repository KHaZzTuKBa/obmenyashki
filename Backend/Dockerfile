# Используем официальный образ SDK для сборки
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Копируем файлы проекта и восстанавливаем зависимости
COPY ["YourProject.csproj", "."]
RUN dotnet restore "YourProject.csproj"

# Копируем остальные файлы и собираем проект
COPY . .
RUN dotnet build "YourProject.csproj" -c Release -o /app/build
RUN dotnet publish "YourProject.csproj" -c Release -o /app/publish

# Используем runtime образ для финального контейнера
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

# Указываем порт, который будет использоваться
EXPOSE 80
EXPOSE 443

# Команда запуска приложения
ENTRYPOINT ["dotnet", "YourProject.dll"]