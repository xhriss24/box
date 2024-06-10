FROM node:lts-buster

RUN git clone https://github.com/Emperordagoat/asta /root/Emperordagoat 

RUN npm cache clean --force
RUN rm -rf /root/Emperordagoat/node_modules

WORKDIR /root/Emperordagoat

RUN npm install


RUN npm update

EXPOSE 9000

CMD ["npm", "start"]

# Let's use Node.js LTS (Long Term Support) version based on Buster 
