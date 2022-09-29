import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private repo: Repository<User>
    ) { }

    /**
     * create
     */
    public create(email: string, password: string) {
        const user = this.repo.create({ email, password })
        return this.repo.save(user);
    }

    /**
     * findUser
     */
    find(email: string) {
        return this.repo.find({ where: { email } });
    }

    /**
     * findOne
     */

    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }

    /**
     * findAllUser
     */
    public findAll() {
        return this.repo.find();
    }

    /**
     * updateUser
     */
    public async update(id: number, attrs: Partial<User>) {
        const user = await this.repo.findOneBy({id});
        if (!user) {
            throw new Error('User not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    /**
     * removeUser
     */
    public async remove(id: number) {
        const user = await this.repo.findOneBy({id});
        if (!user) {
            throw new Error('User not found');
        }
        return this.repo.remove(user);
    }
}
