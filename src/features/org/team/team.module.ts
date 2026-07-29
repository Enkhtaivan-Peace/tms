import { TeamMemberService } from './services/team-member.service';

import { TeamMemberRepository } from './repositories/team-member.repository';

import { TeamMemberEntity } from './entities/team-member.entity';
import { TeamController } from './controller/team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamMemberController } from './controller/team-member.controller';
import { TeamEntity } from './entities/team.entity';
import { TeamQueryRepository } from './repositories/team-query.repository';
import { TeamRepository } from './repositories/team.repository';
import { TeamService } from './services/team.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity, TeamMemberEntity])],

  controllers: [TeamController, TeamMemberController],

  providers: [
    TeamService,
    TeamRepository,
    TeamQueryRepository,
    TeamMemberService,
    TeamMemberRepository,
  ],

  exports: [TeamService, TeamMemberService],
})
export class TeamModule {}
