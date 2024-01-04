// Import necessary modules
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// Create an in-memory MongoDB Server
let mongoServer;

beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Database Connection', () => {
    test('should connect to database successfully', async () => {
        const isConnected = mongoose.connection.readyState;
        expect(isConnected).toBe(1);
    });

    test('should fail when wrong connection string is provided', async () => {
        try {
            await mongoose.connect("mongodb://wrongconnection:27017");
        } catch (error) {
            expect(error).toBeDefined();
        }
    });
});
