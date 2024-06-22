import { PrismaService } from '../PRISMA/prisma.service';
import { Guess } from '@prisma/client';
import { CreateGuessDto } from './createGuess.dto';
export declare class GuessService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateGuessDto): Promise<Guess>;
    findAll(): Promise<Guess[]>;
    findByLocation(id: number): Promise<Guess[]>;
    findByUser(id: number): Promise<Guess[]>;
    findOne(id: number): Promise<Guess>;
    update(id: number, data: {
        guessedLocation?: string;
        distance?: number;
    }): Promise<Guess>;
    remove(id: number): Promise<Guess>;
    countGuesses(userId: number, locationId: number): Promise<number>;
}
