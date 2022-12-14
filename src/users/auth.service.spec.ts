import { Test } from '@nestjs/testing';
import { AuthService } from "./auth.service";
import { User } from './user.entity';
import { UsersService } from "./users.service";

describe('AuthService', () => {
    
    let service: AuthService;

    beforeEach(async () => {
        // Mock UsersService
        const mockUsersService: Partial<UsersService> = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => Promise.resolve({
                id: 1,
                email,
                password
            } as User),
        }

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: mockUsersService
                }
            ]
        }).compile();

        service = module.get(AuthService);

    });

    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    });

    it('creates a new user with salted and hashed password', async () => {
        const user = await service.signup('some@email','somepassword');
        expect(user.password).not.toEqual('somepassword');
        const [salt,hash] = user.password.split('.');
        expect(salt).toBeDefined();  
        expect(hash).toBeDefined(); 
    })
});

