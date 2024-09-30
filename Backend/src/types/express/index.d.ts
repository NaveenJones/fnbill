// src/types/global.d.ts
import express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        sub: string;
        uid: string;
        email_verified: boolean;
        name: string;
        preferred_username: string;
        given_name: string;
        family_name: string;
        email: string;
      };
    }
  }
}
