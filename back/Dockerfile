FROM node:14
WORKDIR /app
# Copy package json to the current directory of our image so /app
COPY package.json .
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
            then npm install; \
            else npm install --only=production; \
            fi
#Copy everything in our directory to the main directory of the image
RUN npm install --verbose
COPY . ./
ENV PORT 5000
EXPOSE $PORT