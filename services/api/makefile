GOOS=linux 
GOARCH=386
MAIN=src/main.go
BINARY=bin/main

all: clean build start
dev: 
	go run ${MAIN}
build:
	go build -o ${BINARY} ${MAIN}
clean:
	go clean
	rm -f ${BINARY}
start: 
	${BINARY}
fix:
	go fix ${MAIN}
prod_build: 
	GOOS=${GOOS} GOARCH=${GOARCH} go build -o ${BINARY} ${MAIN}
