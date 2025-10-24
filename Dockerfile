# 1. Gunakan base image Node.js (versi LTS Alpine untuk ukuran kecil)
FROM node:20-alpine

# 2. Tetapkan direktori kerja di dalam container
WORKDIR /app

# 3. Salin file package.json dan package-lock.json
COPY package.json package-lock.json ./

# 4. Instal semua dependencies (npm install)
RUN npm install

# 5. Salin sisa kode proyek ke dalam container
COPY . .

# 6. Ekspos port default Vite (5173)
EXPOSE 5173

# 7. Perintah default untuk menjalankan dev server
CMD ["npm", "run", "dev"]