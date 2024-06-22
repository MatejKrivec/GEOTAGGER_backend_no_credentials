import { GuessService } from './guess.service';
import { Guess } from '@prisma/client';
import { CreateGuessDto } from './createGuess.dto';
export declare class GuessController {
    private readonly guessService;
    constructor(guessService: GuessService);
    create(data: CreateGuessDto): Promise<Guess>;
    findOne(id: string): Promise<Guess>;
    findByUser(id: string): Promise<Guess[]>;
    findByLocation(id: string): Promise<Guess[]>;
    countGuesses(userId: string, locationId: string): Promise<number>;
    update(id: string, data: {
        guessedLocation?: string;
        distance?: number;
    }): Promise<Guess>;
    remove(id: string): Promise<Guess>;
}
