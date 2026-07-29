import { Module } from '@nestjs/common';

import { TeamController } from './controller/team.controller';
import { TeamService } from './services/team.service';

import { TeamRepository } from './repositories/team.repository';
import { TeamMemberController } from './controller/team-member.controller';
import { TeamMemberService } from './services/team-member.service';
import { TeamMemberRepository } from './repositories/team-member.repository';
import { TeamMemberQueryRepository } from './repositories/team-member-query.repository';
import { TeamQueryRepository } from './repositories/team-query.repository';
import { TeamEntity } from './entities/team.entity';
import { TeamMemberEntity } from './entities/team-member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity, TeamMemberEntity])],
  controllers: [TeamController, TeamMemberController],

  providers: [
    TeamService,
    TeamRepository,
    TeamQueryRepository,
    // Team Member
    TeamMemberService,
    TeamMemberRepository,
    TeamMemberQueryRepository,
  ],

  exports: [TeamService, TeamMemberService],
})
export class TeamModule {}
