# Use Maven to build the application
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Use OpenJDK slim image for runtime
FROM openjdk:17.0.1-jdk-slim
WORKDIR /app
COPY --from=build /app/target/kahoot-0.0.1-SNAPSHOT.jar kahoot.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "kahoot.jar"]