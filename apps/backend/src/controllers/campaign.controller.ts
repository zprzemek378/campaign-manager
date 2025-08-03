import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../lib/prisma";
import { CampaignType } from "shared-types";

export const createCampaign = asyncHandler(
  async (req: Request, res: Response) => {
    const { id, ...campaignData } = req.body as CampaignType;
    const newCampaign = await prisma.campaign.create({
      data: campaignData,
    });
    res.status(201).json(newCampaign);
  }
);

export const getCampaigns = asyncHandler(
  async (_req: Request, res: Response) => {
    const campaigns = await prisma.campaign.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    res.json(campaigns);
  }
);

export const getCampaign = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const campaign = await prisma.campaign.findUnique({
    where: { id },
  });
  if (!campaign) {
    res.status(404);
    throw new Error("Campaign not found");
  }
  res.json(campaign);
});

export const updateCampaign = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates: Partial<CampaignType> = req.body;

    const campaign = await prisma.campaign.update({
      where: { id },
      data: updates,
    });
    res.json(campaign);
  }
);

export const deleteCampaign = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.campaign.delete({
      where: { id },
    });
    res.status(204).send();
  }
);
