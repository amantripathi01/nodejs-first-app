const mongoose = require('mongoose');

describe('Database Connection', () => {
    const dbConnection = "mongodb://127.0.0.1:27017";
    const options = {
        dbName: "backend",
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    beforeAll(async () => {
        await mongoose.disconnect();
    });

    test('connects to database successfully', async () => {
        await mongoose.connect(dbConnection, options);
        const dbStatus = mongoose.connection.readyState;
        expect(dbStatus).toBe(1);
    });

    test('throws an error when fails to connect', async () => {
        await mongoose.disconnect();
        try {
            await mongoose.connect('mongodb://invalid.url:27017', options);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
        const dbStatus = mongoose.connection.readyState;
        expect(dbStatus).toBe(0);
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });
});
