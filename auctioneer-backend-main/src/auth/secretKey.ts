import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class Secret {
  constructor(private readonly config: ConfigService) {}
  getSecret() {
    return this.config.get("JWT_SECRET");
  }
}
