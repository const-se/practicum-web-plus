import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class HashService {
    public create(value: string) {
        return bcrypt.hash(value, 10)
    }

    public verify(value: string, hash: string) {
        return bcrypt.compare(value, hash)
    }
}
