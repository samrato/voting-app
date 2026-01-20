const request = require('supertest');
const bcrypt = require('bcryptjs');
jest.setTimeout(120000);
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const voterRoutes = require('../routes/Routes');
const Voter = require('../models/voterModel');
const Election = require('../models/electionModel');
const Candidate = require('../models/candidateModel');
const jwt = require('jsonwebtoken');

let mongoServer;
let app;
let token;
let electionId;
let candidateId;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create({ instance: { startupTimeout: 60000 } });
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    app = express();
    app.use(express.json());
    app.use('/api', voterRoutes);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    // Create a user and an election for testing
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await Voter.create({
        fullName: 'Test User',
        email: 'test@example.com',
        password: hashedPassword,
        isAdmin: true
    });
    token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

    const election = await Election.create({
        title: 'Test Election',
        description: 'Test Election Description'
    });
    electionId = election._id;

    const candidate = await Candidate.create({
        fullName: 'Test Candidate',
        image: 'http://example.com/image.png',
        motto: 'Test Motto',
        election: electionId
    });
    candidateId = candidate._id;
});

afterEach(async () => {
    await Voter.deleteMany({});
    await Election.deleteMany({});
    await Candidate.deleteMany({});
});

describe('Voting System', () => {
    it('should register a new voter', async () => {
        const res = await request(app)
            .post('/api/voters/register')
            .send({
                fullName: 'New Voter',
                email: 'newvoter@example.com',
                password: 'password123',
                password2: 'password123'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toContain('New voter New Voter created');
    });

    it('should login a voter', async () => {
        const res = await request(app)
            .post('/api/voters/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should vote for a candidate', async () => {
        const res = await request(app)
            .patch(`/api/candidates/${candidateId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ selectedElection: electionId });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toContain('Vote Casted successfully');

        const updatedCandidate = await Candidate.findById(candidateId);
        expect(updatedCandidate.voteCount).toBe(1);
    });
});