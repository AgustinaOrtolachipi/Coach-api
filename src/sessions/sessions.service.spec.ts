import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Session } from './entities/session.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class SessionsService {
  private readonly filePath = join(__dirname, '..', 'data', 'sessions.json');
  private sessions: Session[] = this.loadSessions();
  private idCounter = this.sessions.length ? Math.max(...this.sessions.map(session => session.id)) + 1 : 1;

  private loadSessions(): Session[] {
    if (!fs.existsSync(this.filePath)) {
      fs.mkdirSync(join(__dirname, '..', 'data'), { recursive: true });
      fs.writeFileSync(this.filePath, '[]', 'utf8');
    }
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Session[];
  }

  private saveSessions() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.sessions, null, 2));
  }

  create(createSessionDto: CreateSessionDto): Session {
    if (createSessionDto.price <= 0) {
      throw new BadRequestException('El precio debe ser un número positivo');
    }
    const newSession: Session = {
      id: this.idCounter++,
      ...createSessionDto,
    };
    this.sessions.push(newSession);
    this.saveSessions();
    return newSession;
  }

  findAll(): Session[] {
    return this.sessions;
  }

  findOne(id: number): Session {
    const session = this.sessions.find(session => session.id === id);
    if (!session) {
      throw new NotFoundException(`Session with ID ${id} not found`);
    }
    return session;
  }

  update(id: number, updateSessionDto: UpdateSessionDto): Session {
    if (updateSessionDto.price && updateSessionDto.price <= 0) {
      throw new BadRequestException('El precio debe ser un número positivo');
    }
    const session = this.findOne(id);
    Object.assign(session, updateSessionDto);
    this.saveSessions();
    return session;
  }

  remove(id: number): void {
    const index = this.sessions.findIndex(session => session.id === id);
    if (index === -1) {
      throw new NotFoundException(`Session with ID ${id} not found`);
    }
    this.sessions.splice(index, 1);
    this.saveSessions();
  }
}
