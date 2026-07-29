import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';

import { Role } from './entities/role.entity';

import { Permission } from './entities/permission.entity';

import { UserRole } from './entities/user-role.entity';

import { RolePermission } from './entities/role-permission.entity';
import { PermissionRepository } from './repositories/permission.repository';
import { RolePermissionRepository } from './repositories/role-permission.repository';
import { RoleRepository } from './repositories/role.repository';
import { UserRoleRepository } from './repositories/user-role.repository';
import { UserRepository } from './repositories/user.repository';
import { AuthService } from './services/auth.service';
import { PermissionsService } from './services/permissions.service';
import { RolesService } from './services/roles.service';
import { UsersService } from './services/users.service';
import { AuthController } from './controllers/auth.controller';
import { PermissionsController } from './controllers/permissions.controller';
import { RolesController } from './controllers/roles.controller';
import { UsersController } from './controllers/users.controller';
import { SessionRepository } from './repositories/session.repository';
import { UserSession } from './entities/user-session.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    TypeOrmModule.forFeature([
      User,
      Role,
      Permission,
      UserRole,
      RolePermission,
      UserSession,
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '15m',
        },
      }),
    }),
  ],
  controllers: [
    AuthController,
    UsersController,
    RolesController,
    PermissionsController,
  ],
  providers: [
    UserRepository,
    RoleRepository,
    PermissionRepository,
    UserRoleRepository,
    RolePermissionRepository,
    AuthService,
    UsersService,
    RolesService,
    PermissionsService,
    SessionRepository,
    JwtStrategy,
  ],
  exports: [AuthService],
})
export class IamModule {}
