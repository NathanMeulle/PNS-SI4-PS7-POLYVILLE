FROM maven:3.5-jdk-11 AS builder
WORKDIR /usr/src/app/
COPY ./src ./src
COPY ./mocks ./mocks
COPY ./pom.xml ./

# Create jar file
# -f 			  : to specify the path of the pom
# assembly:single : to load the dependencies
# -DskipTests 	  : skip tests
RUN mvn -f ./pom.xml clean compile assembly:single -DskipTests

COPY ./target/alihm2*-jar-with-dependencies.jar ./alihm2.jar

# Run the Engine Class to generate the json mocks
RUN java -cp ./alihm2.jar fr/unice/polytech/si4/ps7/alihm2/serializer/Engine

COPY ./mocks ./mocks

FROM node:lts-alpine
WORKDIR /usr/src/app/
COPY ./web/package*.json ./
COPY ./web ./

# --from=builder : recover the json generated from the first part
COPY --from=builder usr/src/app/mocks/ ./src/mocks/

RUN npm install

EXPOSE 8080
CMD ["npm", "run", "serve"]