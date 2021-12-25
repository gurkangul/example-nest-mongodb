import { Injectable } from '@nestjs/common';
import { UserModel } from 'tools/models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResourceService } from 'lib/services/resource.service';
import { UserCreateDto, UserLoginDto, UserUpdateDto } from 'tools/dto/user.dto';
import * as jwt from 'jsonwebtoken';
const bcrypt = require('bcrypt');

const saltRounds = 10;
const hashtext = process.env.HASH_SECRET;

@Injectable()
export class UserService extends ResourceService<
  UserModel,
  UserCreateDto,
  UserUpdateDto
> {
  constructor(@InjectModel('User') private userMongo: Model<UserModel>) {
    super(userMongo);
  }

  async convertToHash(value: string) {
    let hashPwd;
    await bcrypt.hash(`${hashtext}${value}`, saltRounds).then((hash) => {
      hashPwd = hash;
    });
    return await hashPwd;
  }

  async compareHashes(password, hashed) {
    const match = await bcrypt.compareSync(`${hashtext}${password}`, hashed);
    return await match;
  }

  async loginUser(user: UserLoginDto): Promise<any> {
    try {
      const existUser = await this.userMongo
        .findOne({
          email: user.email,
        })
        .exec();

      if (existUser) {
        let checkPwd;
        await this.compareHashes(user.password, existUser.password).then(
          (resp) => {
            if (resp) {
              checkPwd = true;
            } else {
              checkPwd = false;
            }
          },
        );

        if (checkPwd) {
          const authJsonWebToken = jwt.sign(
            { user: existUser },
            process.env.JWT_SECRET,
          );
          return await { success: true, value: authJsonWebToken };
        } else {
          return await {
            success: false,
            response: 'user password is incorrect!',
          };
        }
      } else {
        return await { success: false, response: 'user does not exist!' };
      }
    } catch (ex) {
      return await {
        success: false,
        response: 'something went wrong while login process!',
        exception: ex,
      };
    }
  }
}
