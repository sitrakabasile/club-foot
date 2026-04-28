"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const node_process_1 = __importDefault(require("node:process"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log("🌱 Seeding database...");
    // Create default admin
    const adminPassword = await bcryptjs_1.default.hash("admin1234", 12);
    const admin = await prisma.user.upsert({
        where: { email: "admin@clubfoot.com" },
        update: {},
        create: {
            email: "admin@clubfoot.com",
            password: adminPassword,
            role: "ADMIN",
            profile: {
                create: {
                    firstName: "Admin",
                    lastName: "Principal",
                },
            },
        },
    });
    console.log(`✅ Admin created: ${admin.email}`);
    // Create some teams
    const team1 = await prisma.team.upsert({
        where: { id: "senior-a" },
        update: {},
        create: {
            id: "senior-a",
            name: "Équipe Première",
            category: "SENIOR",
        },
    });
    console.log(`✅ Team created: ${team1.name}`);
    // Create a rival team for matches
    const teamRival = await prisma.team.upsert({
        where: { id: "rival-fc" },
        update: {},
        create: {
            id: "rival-fc",
            name: "Rival Stars FC",
            category: "SENIOR",
        },
    });
    console.log(`✅ Rival team created: ${teamRival.name}`);
    // Create players
    const players = [
        { name: "Kylian Mbappé", position: "ST", number: 7, nationality: "France", status: "ACTIVE" },
        { name: "Jude Bellingham", position: "CM", number: 5, nationality: "England", status: "ACTIVE" },
        { name: "Vinícius Júnior", position: "LW", number: 7, nationality: "Brazil", status: "INJURED" },
        { name: "Federico Valverde", position: "CM", number: 15, nationality: "Uruguay", status: "ACTIVE" },
        { name: "Thibaut Courtois", position: "GK", number: 1, nationality: "Belgium", status: "ACTIVE" },
    ];
    for (const p of players) {
        const player = await prisma.player.create({
            data: {
                ...p,
                teamId: team1.id,
                statistics: {
                    create: {
                        goals: Math.floor(Math.random() * 3),
                        assists: Math.floor(Math.random() * 2),
                        minutesPlayed: 90,
                        rating: 7.0 + Math.random() * 3,
                        match: {
                            create: {
                                date: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000), // Random past dates
                                venue: "Stade de l'Élite",
                                competition: "Ligue 1",
                                status: "COMPLETED",
                                scoreHome: 2,
                                scoreAway: 1,
                                homeTeamId: team1.id,
                                awayTeamId: teamRival.id,
                            }
                        }
                    }
                }
            },
        });
        console.log(`✅ Player created: ${player.name}`);
    }
    // Add an upcoming match
    await prisma.match.create({
        data: {
            date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            venue: "Stade de l'Élite",
            competition: "Ligue 1",
            status: "SCHEDULED",
            homeTeamId: team1.id,
            awayTeamId: teamRival.id,
        }
    });
    // Add dummy finances with historical data for the chart
    const categories = ["SPONSORSHIP", "SHOP", "TICKETS", "MEMBERSHIP"];
    const financeData = [];
    // Generate some income for the last 7 days
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        // Random income between 5000 and 15000 per day
        financeData.push({
            label: `Recettes du ${date.toLocaleDateString('fr-FR')}`,
            amount: 5000 + Math.random() * 10000,
            type: "INCOME",
            category: categories[Math.floor(Math.random() * categories.length)],
            date: date
        });
    }
    // Add some big sponsor income
    financeData.push({
        label: "Sponsor Emirates - Versement Trimestriel",
        amount: 150000,
        type: "INCOME",
        category: "SPONSORSHIP",
        date: new Date()
    });
    // Add some expenses (as positive numbers, repo handles the subtraction)
    financeData.push({ label: "Salaires Staff & Joueurs", amount: 85000, type: "EXPENSE", category: "SALARY", date: new Date() }, { label: "Location Stade de l'Élite", amount: 12000, type: "EXPENSE", category: "INFRASTRUCTURE", date: new Date() }, { label: "Déplacement Match Extérieur", amount: 4500, type: "EXPENSE", category: "TRAVEL", date: new Date() });
    for (const f of financeData) {
        await prisma.finance.create({ data: f });
    }
    console.log(`✅ Seeding completed.`);
}
main()
    .catch((e) => {
    console.error(e);
    node_process_1.default.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map