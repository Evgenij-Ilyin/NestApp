import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'Users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    constructor(partial: Partial<User>){
        if (partial) {
            Object.assign(this, partial);
        }
        this.id = uuidv4(); // Generation of UUID when creating a new User
    }
}
