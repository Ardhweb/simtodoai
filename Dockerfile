FROM python:3.13-slim

# Install Node.js & Supervisor
RUN apt-get update && \
    apt-get install -y curl gnupg2 supervisor && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

# Set working directory
WORKDIR /app

# Install Django dependencies
COPY backends/requirements.txt ./backends/requirements.txt
RUN pip install --no-cache-dir -r backends/requirements.txt

# Install Next.js dependencies
COPY frontends/package*.json ./frontends/
RUN cd frontends && npm install

# Copy source code
COPY backends/ ./backends/
COPY frontends/ ./frontends/

# Copy Supervisor configuration
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 8000 3000

CMD ["/usr/bin/supervisord"]
