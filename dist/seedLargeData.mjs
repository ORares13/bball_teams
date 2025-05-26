import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();
export var Competition;
(function (Competition) {
    Competition["euroleague"] = "euroleague";
    Competition["eurocup"] = "eurocup";
})(Competition || (Competition = {}));
export var Position;
(function (Position) {
    Position["PG"] = "PG";
    Position["SG"] = "SG";
    Position["SF"] = "SF";
    Position["PF"] = "PF";
    Position["C"] = "C";
})(Position || (Position = {}));
async function createTeams(count = 500) {
    const teams = [];
    for (let i = 0; i < count; i++) {
        teams.push({
            name: faker.company.name(),
            country: faker.address.country(),
            arena: faker.company.name() + ' Arena',
            arenaCapacity: faker.number.int({ min: 5000, max: 20000 }),
            logo: faker.word,
            manager: faker.name.fullName(),
            competition: faker.helpers.arrayElement([
                Competition.euroleague,
                Competition.eurocup,
            ]),
        });
    }
    return prisma.team.createMany({ data: teams });
}
async function createPlayers(batchSize = 10000, totalPlayers = 100000) {
    const teams = await prisma.team.findMany({ select: { id: true } });
    const teamIds = teams.map(t => t.id);
    for (let i = 0; i < totalPlayers; i += batchSize) {
        const playersBatch = [];
        for (let j = 0; j < batchSize && i + j < totalPlayers; j++) {
            playersBatch.push({
                name: faker.name.fullName(),
                position: faker.helpers.arrayElement([
                    Position.PG,
                    Position.SG,
                    Position.SF,
                    Position.PF,
                    Position.C,
                ]),
                age: faker.number.int({ min: 16, max: 40 }),
                teamId: faker.helpers.arrayElement(teamIds),
            });
        }
        await prisma.player.createMany({ data: playersBatch });
        console.log(`Inserted batch: ${i + playersBatch.length} players`);
    }
}
async function main() {
    console.log('Creating teams...');
    await createTeams(500);
    console.log('Creating players...');
    await createPlayers();
    console.log('Done');
}
main()
    .catch(console.error)
    .finally(async () => {
    await prisma.$disconnect();
});
