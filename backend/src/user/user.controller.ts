import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Patch,
    Request,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    public async profile(@Request() request) {
        return await this.userService.findById(request.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    public async update(@Request() request, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.update(request.user.id, updateUserDto)
    }
}
