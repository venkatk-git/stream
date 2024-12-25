import Redis from 'ioredis';

/**
 * Initializes a Redis client to interact with the Redis database.
 *
 * This client is used to store and retrieve data from Redis. It provides
 * a connection to the Redis server for performing various Redis operations
 * such as setting, getting, and managing key-value pairs.
 */
const redisClient = new Redis();

export { redisClient };
