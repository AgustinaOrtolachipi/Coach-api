import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

interface Session {
  id: number;
  title: string;
  description: string;
  duration: number;
  price: number;
}

@Injectable()
export class SessionsService {
  private sessions: Session[] = [];

  create(createSessionDto: CreateSessionDto): Session {
    const newSession: Session = { id: Date.now(), ...createSessionDto };
    this.sessions.push(newSession);
    return newSession;
  }

  findAll(): Session[] {
    return this.sessions;
  }

  findOne(id: number): Session | undefined {
    return this.sessions.find(session => session.id === id);
  }

  update(id: number, updateSessionDto: UpdateSessionDto): Session | undefined {
    const sessionIndex = this.sessions.findIndex(session => session.id === id);
    if (sessionIndex > -1) {
      this.sessions[sessionIndex] = { ...this.sessions[sessionIndex], ...updateSessionDto };
      return this.sessions[sessionIndex];
    }
    return undefined;
  }

  remove(id: number): Session | undefined {
    const sessionIndex = this.sessions.findIndex(session => session.id === id);
    if (sessionIndex > -1) {
      const session = this.sessions[sessionIndex];
      this.sessions.splice(sessionIndex, 1);
      return session;
    }
    return undefined;
  }

  search(title: string): Session[] {
    return this.sessions.filter(session => session.title.includes(title));
  }
}
