# 1️⃣ Use Node.js base image for building
FROM node:20-alpine AS builder

# 2️⃣ Set the working directory
WORKDIR /usr/app/apps/client

# 3️⃣ Copy package.json and package-lock.json first
COPY apps/client/package.json ./

RUN npm install -g pnpm@latest-10

# 4️⃣ Install dependencies (will be cached if package.json is unchanged)
RUN pnpm install

# 5️⃣ Copy the entire source code
COPY apps/client .

# 6️⃣ Build the application
RUN pnpm run build

# 7️⃣ Create a new image just for running the built application
FROM node:20-alpine AS runner

# 8️⃣ Set the working directory
WORKDIR /usr/app

# 9️⃣ Copy the `dist` directory from the builder stage
COPY --from=builder /usr/app/apps/client/dist ./dist

# 🔟 Install `serve` to run the frontend
RUN npm install -g serve

# 1️⃣1️⃣ Expose port 3000
EXPOSE 3000

# 1️⃣2️⃣ Run `serve` to serve the built application
CMD ["serve", "-s", "dist"]
