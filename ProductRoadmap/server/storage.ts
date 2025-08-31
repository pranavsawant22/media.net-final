import { type User, type InsertUser, type Campaign, type InsertCampaign } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getCampaigns(): Promise<Campaign[]>;
  getCampaign(id: string): Promise<Campaign | undefined>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  updateCampaign(id: string, updates: Partial<InsertCampaign>): Promise<Campaign | undefined>;
  deleteCampaign(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private campaigns: Map<string, Campaign>;

  constructor() {
    this.users = new Map();
    this.campaigns = new Map();
    
    // Add some sample campaigns for demo
    const sampleCampaigns: Campaign[] = [
      {
        id: "AD-2024-001234",
        name: "Organic Soaps Campaign",
        objective: "sales",
        budget: 5000,
        adCopy: "Pamper yourself with nature's best! Our organic soaps are gentle on your skin and kind to the planet. Order yours today! 🛒",
        productDescription: "Handmade organic soaps with natural ingredients",
        imageUrl: null,
        targetLocation: "All India",
        ageFrom: 18,
        ageTo: 65,
        gender: "all",
        status: "active",
        reach: 50000,
        createdAt: new Date("2024-01-15T10:30:00Z"),
      },
      {
        id: "AD-2024-001233",
        name: "Summer Collection",
        objective: "awareness",
        budget: 2500,
        adCopy: "Discover our latest summer collection! Fresh styles for the sunny season.",
        productDescription: "Summer clothing collection",
        imageUrl: null,
        targetLocation: "Mumbai",
        ageFrom: 25,
        ageTo: 45,
        gender: "all",
        status: "active",
        reach: 25000,
        createdAt: new Date("2024-01-10T14:20:00Z"),
      },
      {
        id: "AD-2024-001232",
        name: "Holiday Special",
        objective: "traffic",
        budget: 5000,
        adCopy: "Don't miss our holiday special offers! Visit our website for amazing deals.",
        productDescription: "Holiday promotional offers",
        imageUrl: null,
        targetLocation: "Delhi",
        ageFrom: 18,
        ageTo: 55,
        gender: "all",
        status: "completed",
        reach: 50000,
        createdAt: new Date("2024-01-05T09:15:00Z"),
      },
    ];

    sampleCampaigns.forEach(campaign => {
      this.campaigns.set(campaign.id, campaign);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCampaigns(): Promise<Campaign[]> {
    return Array.from(this.campaigns.values()).sort(
      (a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getCampaign(id: string): Promise<Campaign | undefined> {
    return this.campaigns.get(id);
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const id = `AD-${new Date().getFullYear()}-${Math.floor(Math.random() * 999999).toString().padStart(6, '0')}`;
    const campaign: Campaign = {
      ...insertCampaign,
      id,
      reach: insertCampaign.budget * 10, // Simple formula: reach = budget * 10
      createdAt: new Date(),
      productDescription: insertCampaign.productDescription || null,
      imageUrl: insertCampaign.imageUrl || null,
      status: insertCampaign.status || "active",
    };
    this.campaigns.set(id, campaign);
    return campaign;
  }

  async updateCampaign(id: string, updates: Partial<InsertCampaign>): Promise<Campaign | undefined> {
    const existing = this.campaigns.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...updates };
    this.campaigns.set(id, updated);
    return updated;
  }

  async deleteCampaign(id: string): Promise<boolean> {
    return this.campaigns.delete(id);
  }
}

export const storage = new MemStorage();
