import { Injectable } from '@nestjs/common';
// For now, it just returns what we have. API might want more data.
// Reusing FindUserByEmail or generic logic.
// But controller used req.user which usually comes from JWT strategy.
// JWT strategy usually validates user exists. 
// So this might seem redundant if we already have the user object, but for clean arch:

export class GetUserProfileUseCase {
  // If we receive the full user object from the guard/decorator, we might not need to query DB.
  // But if we only have ID from JWT, we query.
  // The current controller implementation was: `return req.user;`
  // So it returns whatever Passport sets.
  
  execute(user: any) {
    return user;
  }
}
