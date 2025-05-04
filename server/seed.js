const mongoose = require('mongoose');
const Hackathon = require('./models/hackathon');
const User = require('./models/User');

const sampleHackathons = [
    {
        title: "AI Innovation Challenge",
        description: "Create breakthrough AI solutions for real-world problems",
        startDate: new Date("2025-04-15"),
        endDate: new Date("2025-04-20"),
        bannerImage: "https://placehold.co/600x800",
        prize: "$15,000",
        difficulty: "Advanced",
        majorRule: "All code must be original and created during the hackathon period",
        currParticipantsCount: 342,
        status: "upcoming"
    },
    {
        title: "Sustainable Future Hackathon",
        description: "Develop green tech solutions to combat climate change",
        startDate: new Date("2025-05-01"),
        endDate: new Date("2025-05-05"),
        bannerImage: "https://placehold.co/200x400",
        prize: "$12,000",
        difficulty: "Intermediate",
        majorRule: "Solutions must demonstrate measurable environmental impact",
        currParticipantsCount: 256,
        status: "upcoming"
    },
    {
        title: "Healthcare Innovation Challenge",
        description: "Create solutions to improve patient care and medical outcomes",
        startDate: new Date("2025-04-25"),
        endDate: new Date("2025-04-30"),
        bannerImage: "https://placehold.co/600x600",
        prize: "$20,000",
        difficulty: "Expert",
        majorRule: "All solutions must comply with healthcare privacy standards",
        currParticipantsCount: 189,
        status: "upcoming"
    }
];

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb+srv://admin:pass123@fuse.ihgutie.mongodb.net/?retryWrites=true&w=majority&appName=fuse', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Connected to MongoDB');

        // Clear existing data
        await Hackathon.deleteMany({});
        console.log('Cleared existing hackathons');

        // Create a sample organizer
        const organizer = new User({
            name: "TechGiants Inc.",
            email: "organizer@techgiants.com",
            role: "organizer"
        });
        await organizer.save();
        console.log('Created sample organizer');

        // Add organizer to each hackathon
        const hackathonsWithOrganizer = sampleHackathons.map(hackathon => ({
            ...hackathon,
            organizer: organizer._id
        }));

        // Insert sample data
        await Hackathon.insertMany(hackathonsWithOrganizer);
        console.log('Sample hackathons inserted successfully');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase(); 