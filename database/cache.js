import Redis from 'ioredis';

const client = new Redis(6379, "cache");

export default client;
