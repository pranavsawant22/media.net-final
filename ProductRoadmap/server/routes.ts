import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCampaignSchema } from "@shared/schema";
import { generateAdCopyWithGemini } from "./gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all campaigns
  app.get("/api/campaigns", async (req, res) => {
    try {
      const campaigns = await storage.getCampaigns();
      res.json(campaigns);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch campaigns" });
    }
  });

  // Create a new campaign
  app.post("/api/campaigns", async (req, res) => {
    try {
      const campaignData = insertCampaignSchema.parse(req.body);
      const campaign = await storage.createCampaign(campaignData);
      res.json(campaign);
    } catch (error) {
      res.status(400).json({ error: "Invalid campaign data" });
    }
  });

  // Get a specific campaign
  app.get("/api/campaigns/:id", async (req, res) => {
    try {
      const campaign = await storage.getCampaign(req.params.id);
      if (!campaign) {
        return res.status(404).json({ error: "Campaign not found" });
      }
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch campaign" });
    }
  });

  // Update campaign status
  app.patch("/api/campaigns/:id", async (req, res) => {
    try {
      const { status } = req.body;
      const campaign = await storage.updateCampaign(req.params.id, { status });
      if (!campaign) {
        return res.status(404).json({ error: "Campaign not found" });
      }
      res.json(campaign);
    } catch (error) {
      res.status(500).json({ error: "Failed to update campaign" });
    }
  });

  // Generate ad copy using Gemini
  app.post("/api/generate-ad-copy-gemini", async (req, res) => {
    try {
      const { productDescription, objective } = req.body;
      
      if (!productDescription) {
        return res.status(400).json({ error: "Product description is required" });
      }

      const adCopies = await generateAdCopyWithGemini(productDescription, objective);
      res.json({ adCopies });
    } catch (error) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: "Failed to generate ad copy" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
